import type {
  Oas2HttpOperationTransformer,
  Oas2HttpServiceTransformer,
  Oas3HttpOperationTransformer,
  Oas3HttpServiceTransformer,
} from '@netcracker/qubership-apihub-http-spec/oas';
import { transformOas2Operation, transformOas2Service } from '@netcracker/qubership-apihub-http-spec/oas2';
import { transformOas3Operation, transformOas3Service } from '@netcracker/qubership-apihub-http-spec/oas3';
import { transformOas3WithMetaOperation, transformOas3WithMetaService } from '@netcracker/qubership-apihub-http-spec/oas3WithMeta';
import { encodePointerFragment, pointerToPath } from '@stoplight/json';
import { IHttpService, NodeType } from '@stoplight/types';
import { selfDiffMetaKey } from 'diff-block';
import { get, isObject, last } from 'lodash';
import { OpenAPIObject } from 'openapi3-ts';
import { Spec } from 'swagger-schema-official';

import { oas2SourceMap } from './oas2';
import { oas3SourceMap } from './oas3';
import { ISourceNodeMap, NodeTypes, ServiceChildNode, ServiceNode } from './types';

const isOas2 = (parsed: unknown): parsed is Spec =>
  isObject(parsed) &&
  'swagger' in parsed &&
  Number.parseInt(String((parsed as Partial<{ swagger: unknown }>).swagger)) === 2;

const isOas3 = (parsed: unknown): parsed is OpenAPIObject =>
  isObject(parsed) &&
  'openapi' in parsed &&
  Number.parseFloat(String((parsed as Partial<{ openapi: unknown }>).openapi)) >= 3;

const isOas31 = (parsed: unknown): parsed is OpenAPIObject =>
  isObject(parsed) &&
  'openapi' in parsed &&
  Number.parseFloat(String((parsed as Partial<{ openapi: unknown }>).openapi)) === 3.1;

export function transformOasToServiceNode(apiDescriptionDocument: unknown) {
  const transformService = transformOas3Service;
  const transformOperation = transformOas3Operation;
  if (isOas31(apiDescriptionDocument)) {
    return computeServiceNode(
      { ...apiDescriptionDocument, jsonSchemaDialect: 'http://json-schema.org/draft-07/schema#' },
      oas3SourceMap,
      transformService,
      transformOperation,
      null
    );
  }
  if (isOas3(apiDescriptionDocument)) {
    return computeServiceNode(apiDescriptionDocument, oas3SourceMap, transformService, transformOperation, null);
  } else if (isOas2(apiDescriptionDocument)) {
    return computeServiceNode(apiDescriptionDocument, oas2SourceMap, transformOas2Service, transformOas2Operation, null);
  }

  return null;
}

export function transformOasToServiceNodeWithDiffMeta(apiDescriptionDocument: unknown, diffMetaKey: symbol) {
  const transformService = transformOas3WithMetaService;
  const transformOperation = transformOas3WithMetaOperation;
  if (isOas31(apiDescriptionDocument)) {
    return computeServiceNode(
      { ...apiDescriptionDocument, jsonSchemaDialect: 'http://json-schema.org/draft-07/schema#' },
      oas3SourceMap,
      transformService,
      transformOperation,
      diffMetaKey,
    );
  }
  if (isOas3(apiDescriptionDocument)) {
    return computeServiceNode(apiDescriptionDocument, oas3SourceMap, transformService, transformOperation, diffMetaKey);
  } else if (isOas2(apiDescriptionDocument)) {
    return computeServiceNode(apiDescriptionDocument, oas2SourceMap, transformOas2Service, transformOas2Operation, diffMetaKey);
  }

  return null;
}

function computeServiceNode(
  document: Spec | OpenAPIObject,
  map: ISourceNodeMap[],
  transformService: Oas2HttpServiceTransformer | Oas3HttpServiceTransformer,
  transformOperation: Oas2HttpOperationTransformer | Oas3HttpOperationTransformer,
  diffMetaKey: symbol | null
) {
  const serviceDocument = transformService({
    document,
    keepProperties: diffMetaKey ? [diffMetaKey.toString()] : undefined,
  }) as IHttpService;
  const serviceNode: ServiceNode = {
    type: NodeType.HttpService,
    uri: '/',
    name: serviceDocument.name,
    data: serviceDocument,
    tags: serviceDocument.tags?.map(tag => tag.name) || [],
    children: computeChildNodes(document, document, diffMetaKey, map, transformOperation),
  };

  return serviceNode;
}

function computeChildNodes(
  document: Spec | OpenAPIObject,
  data: unknown,
  diffMetaKey: symbol | null,
  map: ISourceNodeMap[],
  transformer: Oas2HttpOperationTransformer | Oas3HttpOperationTransformer,
  parentUri: string = '',
) {
  const nodes: ServiceChildNode[] = [];

  if (!isObject(data)) {
    return nodes;
  }

  for (const key of Object.keys(data)) {
    const sanitizedKey = encodePointerFragment(key);
    const match = findMapMatch(sanitizedKey, map);
    if (match) {
      const uri = `${parentUri}/${sanitizedKey}`;

      const jsonPath = pointerToPath(`#${uri}`);
      if (match.type === NodeTypes.Operation && jsonPath.length === 3) {
        const path = String(jsonPath[1]);
        const method = String(jsonPath[2]);
        const operationDocument = transformer({
          document,
          path,
          method,
          keepProperties: diffMetaKey ? [diffMetaKey.toString()] : undefined,
        });

        const pathMeta = diffMetaKey ? (document.paths as any)?.[diffMetaKey]?.[path] : undefined;
        const meta = pathMeta && {
          [selfDiffMetaKey]: pathMeta,
        };
        nodes.push({
          type: NodeType.HttpOperation,
          uri: uri,
          data: operationDocument,
          name: operationDocument.summary || operationDocument.iid || operationDocument.path,
          tags: operationDocument.tags?.map(tag => tag.name) || [],
          ...meta,
        });
      } else if (match.type === NodeTypes.Model) {
        const schemaDocument = get(document, jsonPath);
        const schemaName = schemaDocument.title || last(uri.split('/')) || '';
        const schemas = !isOas2(document) ? document?.components?.schemas : document.schemes;
        const schemaElementMeta = diffMetaKey ? schemas?.[diffMetaKey]?.[schemaName] : undefined;
        const meta = schemaElementMeta && {
          [selfDiffMetaKey]: schemaElementMeta,
        };

        nodes.push({
          type: NodeType.Model,
          uri: uri,
          data: schemaDocument,
          name: schemaName,
          tags: schemaDocument['x-tags'] || [],
          ...meta,
        });
      }

      if (match.children) {
        nodes.push(...computeChildNodes(document, data[key], diffMetaKey, match.children, transformer, uri));
      }
    }
  }

  return nodes;
}

function findMapMatch(key: string | number, map: ISourceNodeMap[]): ISourceNodeMap | void {
  if (typeof key === 'number') {
    return;
  }
  const escapedKey = key.replace(/\*\*/g, '\\*\\*');
  for (const entry of map) {
    if (!!entry.match?.match(escapedKey) || (entry.notMatch !== void 0 && !entry.notMatch.match(escapedKey))) {
      return entry;
    }
  }
}

export function isJson(value: string) {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
}
