import { DiffOperationAPI } from '@stoplight/elements/containers/DiffOperationAPI'
import { getCompareResult } from '@stoplight/elements/web-components/__stories__/helpers/getMergedDocument'
import { stringifyDiffs } from '@stoplight/elements/web-components/__stories__/helpers/stringifyDiffs'
import { aggregatedDiffsMetaKey, diffsMetaKey } from 'diff-block'
import React from 'react'

/**
 * Shared fixtures/helpers for the "Title & Format Diffs" stories.
 *
 * They exercise diffs of the `title` and `format` qualifiers of a JSON schema string type,
 * rendered as `string<Title, format>`.
 *
 * - `format` is the JSON schema `format` keyword on a `string` type.
 * - `title` is SYNTHETIC: it comes from the name of the referenced component. A schema
 *   referenced via `$ref: '#/components/schemas/Order'` is rendered with title `Order`.
 *   An inline schema (no `$ref`) has no title.
 *
 * Title changes are produced by pointing before/after at differently-named components whose
 * content is otherwise equal, so that only the synthetic title differs.
 */

export type Qualifier = {
  // when set, the string type is placed in components under this name and referenced via $ref,
  // which makes it render with this (synthetic) title
  title?: string
  // JSON schema `format` keyword on the string type
  format?: string
}

// stable sibling used to make a real oneOf combiner around the string-under-test
const ONE_OF_SIBLING = { type: 'integer' }

function buildStringSchema(spec: Qualifier): { schema: any; schemas: Record<string, any> } {
  const stringType = { type: 'string', ...(spec.format ? { format: spec.format } : {}) }
  if (spec.title) {
    return {
      schema: { $ref: `#/components/schemas/${spec.title}` },
      schemas: { [spec.title]: stringType },
    }
  }
  return { schema: stringType, schemas: {} }
}

function buildOneOfSchema(spec: Qualifier): { schema: any; schemas: Record<string, any> } {
  const { schema, schemas } = buildStringSchema(spec)
  return { schema: { oneOf: [schema, ONE_OF_SIBLING] }, schemas }
}

function buildDoc(valueSchema: any, schemas: Record<string, any>): object {
  return {
    openapi: '3.0.0',
    info: { title: 'Title & Format Diffs', version: '1.0.0' },
    paths: {
      '/test': {
        post: {
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { value: valueSchema },
                },
              },
            },
          },
          responses: { '200': { description: 'OK' } },
        },
      },
    },
    ...(Object.keys(schemas).length ? { components: { schemas } } : {}),
  }
}

export function caseDocs(
  before: Qualifier,
  after: Qualifier,
  wrapInOneOf: boolean,
): { before: object; after: object } {
  const build = wrapInOneOf ? buildOneOfSchema : buildStringSchema
  const b = build(before)
  const a = build(after)
  return { before: buildDoc(b.schema, b.schemas), after: buildDoc(a.schema, a.schemas) }
}

export function StoryComponent({ before, after }: { before: object; after: object }) {
  const { diffs, merged } = getCompareResult(before, after)
  console.log(stringifyDiffs(diffs))
  return (
    <DiffOperationAPI
      mergedDocument={merged}
      filters={[]}
      diffsMetaKey={diffsMetaKey}
      aggregatedDiffsMetaKey={aggregatedDiffsMetaKey}
    />
  )
}

export type CaseDef = { name: string; before: Qualifier; after: Qualifier }

// Every case as a before -> after pair of qualifiers.
export const CASES: Record<string, CaseDef> = {
  // A - Baselines (no diff), to show the combined rendering
  A1: { name: 'Baseline — title only (unchanged)', before: { title: 'Order' }, after: { title: 'Order' } },
  A2: { name: 'Baseline — format only (unchanged)', before: { format: 'date-time' }, after: { format: 'date-time' } },
  A3: { name: 'Baseline — title + format (unchanged)', before: { title: 'Order', format: 'date-time' }, after: { title: 'Order', format: 'date-time' } },

  // B - Format changes, no title
  B1: { name: 'Format added (no title)', before: {}, after: { format: 'date-time' } },
  B2: { name: 'Format removed (no title)', before: { format: 'date-time' }, after: {} },
  B3: { name: 'Format replaced (no title)', before: { format: 'date-time' }, after: { format: 'date' } },

  // C - Format changes, title present & unchanged (previously broken)
  C1: { name: 'Format added (title unchanged)', before: { title: 'Order' }, after: { title: 'Order', format: 'date-time' } },
  C2: { name: 'Format removed (title unchanged)', before: { title: 'Order', format: 'date-time' }, after: { title: 'Order' } },
  C3: { name: 'Format replaced (title unchanged)', before: { title: 'Order', format: 'date-time' }, after: { title: 'Order', format: 'date' } },

  // D - Title changes, no format
  D1: { name: 'Title added (no format)', before: {}, after: { title: 'Order' } },
  D2: { name: 'Title removed (no format)', before: { title: 'Order' }, after: {} },
  D3: { name: 'Title replaced (no format)', before: { title: 'Order' }, after: { title: 'Invoice' } },

  // E - Title changes, format present & unchanged
  E1: { name: 'Title added (format unchanged)', before: { format: 'date-time' }, after: { title: 'Order', format: 'date-time' } },
  E2: { name: 'Title removed (format unchanged)', before: { title: 'Order', format: 'date-time' }, after: { format: 'date-time' } },
  E3: { name: 'Title replaced (format unchanged)', before: { title: 'Order', format: 'date-time' }, after: { title: 'Invoice', format: 'date-time' } },

  // F - Both change at once
  F1: { name: 'Both added', before: {}, after: { title: 'Order', format: 'date-time' } },
  F2: { name: 'Both removed', before: { title: 'Order', format: 'date-time' }, after: {} },
  F3: { name: 'Both replaced', before: { title: 'Order', format: 'date-time' }, after: { title: 'Invoice', format: 'date' } },
  F4: { name: 'Title added + format removed', before: { format: 'date-time' }, after: { title: 'Order' } },
  F5: { name: 'Title removed + format added', before: { title: 'Order' }, after: { format: 'date-time' } },
  F6: { name: 'Title added + format replaced', before: { format: 'date-time' }, after: { title: 'Order', format: 'date' } },
  F7: { name: 'Title removed + format replaced', before: { title: 'Order', format: 'date-time' }, after: { format: 'date' } },
  F8: { name: 'Title replaced + format added', before: { title: 'Order' }, after: { title: 'Invoice', format: 'date-time' } },
  F9: { name: 'Title replaced + format removed', before: { title: 'Order', format: 'date-time' }, after: { title: 'Invoice' } },
}
