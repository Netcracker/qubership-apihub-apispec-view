import { AsyncOperation } from '@stoplight/elements-core/components/Docs/AsyncOperation';
import { IServer } from '@stoplight/elements-core/utils/http-spec/IServer';
import { NodeType } from '@stoplight/types';
import { Location } from 'history';
import { SchemaViewMode } from 'json-schema-viewer';
import * as React from 'react';

import { InlineRefResolverProvider } from '../../context/InlineRefResolver';
import { useParsedData } from '../../hooks/useParsedData';
import { ParsedNode } from '../../types';
import { ReferenceResolver } from '../../utils/ref-resolving/ReferenceResolver';
import { Article } from './Article';
import { HttpOperation } from './HttpOperation';
import { HttpService } from './HttpService';
import { ExportButtonProps } from './HttpService/ExportButton';
import { Model } from './Model';

interface BaseDocsProps {
  /**
   * CSS class to add to the root container.
   */
  className?: string;

  /**
   * URI of the document
   */
  uri?: string;

  /**
   * Some components may depend on some location/URL data.
   */
  location?: Location;

  /**
   * The original title of the node. It serves as a fallback title in case on is not available inside the model.
   */
  nodeTitle?: string;

  /**
   * @deprecated this property is no longer used and will be removed in the next major version
   */
  allowRouting?: boolean;

  /**
   * Export button props
   */
  exportProps?: ExportButtonProps;

  /**
   * Fetch credentials policy for TryIt component
   * For more information: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   * @default "omit"
   */

  tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';

  /**
   * Url of a CORS proxy that will be used to send requests in TryIt.
   * Provided url will be prepended to an URL of an actual request.
   * @default false
   */
  tryItCorsProxy?: string;

  /**
   * Allows to customize the layout of Docs
   */
  layoutOptions?: {
    /**
     * Allows to hide TryIt component
     * @default false
     */
    hideTryIt?: boolean;

    /**
     * Shows only operation document without right column
     * @default false
     */
    hideTryItPanel?: boolean;
    /**
     * If true, the component will hide its title
     * @default false
     */
    noHeading?: boolean;
    /**
     * If true, the component will hide the Powered by Stoplight banner in Docs
     * @default false
     */
    showPoweredByLink?: boolean;
    /**
     * Allows to hide model examples
     * @default false
     */
    hideModelExamples?: boolean;
    /**
     * Allows to hide server information
     * @default false
     */
    hideServerInfo?: boolean;
    /**
     * Allows to hide security information
     * @default false
     */
    hideSecurityInfo?: boolean;

    /**
     * Allows to hide export button
     * @default false
     */
    hideExport?: boolean;

    /**
     * Provide a number to trigger compact mode when the component is within that pixel width,
     * or a boolean to enable or diable compact mode.
     * @default false
     * @example 600
     */
    compact?: number | boolean;

    schemaViewMode?: SchemaViewMode;
  };

  proxyServer?: IServer;

  hideExamples?: boolean;
}

export interface DocsProps extends BaseDocsProps {
  nodeType: NodeType;
  nodeData: unknown;
  useNodeForRefResolving?: boolean;
  refResolver?: ReferenceResolver;
}

export interface DocsComponentProps<T = unknown> extends BaseDocsProps {
  /**
   * The input data for the component to display.
   */
  data: T;
}

export const Docs = React.memo<DocsProps>(
  ({ nodeType, nodeData, useNodeForRefResolving = false, refResolver, ...commonProps }) => {
    const parsedNode = useParsedData(nodeType, nodeData);

    if (!parsedNode) {
      // TODO: maybe report failure
      return null;
    }

    const parsedDocs = <ParsedDocs node={parsedNode} {...commonProps} />;

    if (useNodeForRefResolving) {
      return (
        <InlineRefResolverProvider document={parsedNode.data} resolver={refResolver}>
          {parsedDocs}
        </InlineRefResolverProvider>
      );
    }

    return parsedDocs;
  },
);

export interface ParsedDocsProps extends BaseDocsProps {
  node: ParsedNode;
}

export const ParsedDocs = ({ node, layoutOptions, ...commonProps }: ParsedDocsProps) => {
  const child = React.useMemo(() => {
    switch (node.type) {
      case 'article':
        return <Article data={node.data} layoutOptions={layoutOptions} {...commonProps} />;
      case 'http_operation':
        return <HttpOperation data={node.data} layoutOptions={layoutOptions} {...commonProps} />;
      case 'async_operation':
        return <AsyncOperation data={node.data} layoutOptions={layoutOptions} {...commonProps} />;
      case 'http_service':
        return <HttpService data={node.data} layoutOptions={layoutOptions} {...commonProps} />;
      case 'model':
        return <Model data={node.data} layoutOptions={layoutOptions} {...commonProps} />;
      default:
        return null;
    }
  }, [commonProps, layoutOptions, node.data, node.type]);

  return <SchemaViewModeContext.Provider value={layoutOptions?.schemaViewMode}>{child}</SchemaViewModeContext.Provider>;
};

const SchemaViewModeContext = React.createContext<SchemaViewMode | undefined>(undefined);
SchemaViewModeContext.displayName = 'SchemaViewModeContext';

export const useSchemaViewMode = () => React.useContext(SchemaViewModeContext);

export { DocsSkeleton } from './Skeleton';