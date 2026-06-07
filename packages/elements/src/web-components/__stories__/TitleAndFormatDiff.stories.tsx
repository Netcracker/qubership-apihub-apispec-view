import { DiffOperationAPI } from '@stoplight/elements/containers/DiffOperationAPI'
import { getCompareResult } from '@stoplight/elements/web-components/__stories__/helpers/getMergedDocument'
import { stringifyDiffs } from '@stoplight/elements/web-components/__stories__/helpers/stringifyDiffs'
import { Meta, StoryObj } from '@storybook/react/*'
import { aggregatedDiffsMetaKey, diffsMetaKey } from 'diff-block'
import React from 'react'
import '../index'

/**
 * Stories that exercise diffs of the `title` and `format` qualifiers of a JSON schema
 * string type, rendered (in api-doc-viewer) as `string<Title, format>`.
 *
 * - `format` is the JSON schema `format` keyword on a `string` type.
 * - `title` is SYNTHETIC: it comes from the name of the referenced component. A schema
 *   referenced via `$ref: '#/components/schemas/Order'` is rendered with title `Order`.
 *   An inline schema (no `$ref`) has no title.
 *
 * Each case is defined by a before/after `Qualifier` pair. Title changes are produced by
 * pointing before/after at differently-named components whose content is otherwise equal,
 * so that only the synthetic title differs.
 */

type Qualifier = {
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

function caseDocs(
  before: Qualifier,
  after: Qualifier,
  wrapInOneOf: boolean,
): { before: object; after: object } {
  const build = wrapInOneOf ? buildOneOfSchema : buildStringSchema
  const b = build(before)
  const a = build(after)
  return { before: buildDoc(b.schema, b.schemas), after: buildDoc(a.schema, a.schemas) }
}

function StoryComponent({ before, after }: { before: object; after: object }) {
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

const meta: Meta<{ before: object; after: object }> = {
  title: 'web-components/Title & Format Diffs',
}
export default meta

type Story = StoryObj<typeof meta>

// Definition of every case as a before -> after pair of qualifiers.
type CaseDef = { name: string; before: Qualifier; after: Qualifier }

const CASES: Record<string, CaseDef> = {
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

const direct = (id: string): Story => ({
  render: StoryComponent,
  args: caseDocs(CASES[id].before, CASES[id].after, false),
  name: `[${id}] ${CASES[id].name}`,
})

const oneOf = (id: string): Story => ({
  render: StoryComponent,
  args: caseDocs(CASES[id].before, CASES[id].after, true),
  name: `[${id}][oneOf] ${CASES[id].name}`,
})

// --- Direct cases (string type directly on the `value` property) ---

export const A1 = direct('A1')
export const A2 = direct('A2')
export const A3 = direct('A3')

export const B1 = direct('B1')
export const B2 = direct('B2')
export const B3 = direct('B3')

export const C1 = direct('C1')
export const C2 = direct('C2')
export const C3 = direct('C3')

export const D1 = direct('D1')
export const D2 = direct('D2')
export const D3 = direct('D3')

export const E1 = direct('E1')
export const E2 = direct('E2')
export const E3 = direct('E3')

export const F1 = direct('F1')
export const F2 = direct('F2')
export const F3 = direct('F3')
export const F4 = direct('F4')
export const F5 = direct('F5')
export const F6 = direct('F6')
export const F7 = direct('F7')
export const F8 = direct('F8')
export const F9 = direct('F9')

// --- oneOf cases (string type as an option inside a oneOf combiner) ---

export const A1OneOf = oneOf('A1')
export const A2OneOf = oneOf('A2')
export const A3OneOf = oneOf('A3')

export const B1OneOf = oneOf('B1')
export const B2OneOf = oneOf('B2')
export const B3OneOf = oneOf('B3')

export const C1OneOf = oneOf('C1')
export const C2OneOf = oneOf('C2')
export const C3OneOf = oneOf('C3')

export const D1OneOf = oneOf('D1')
export const D2OneOf = oneOf('D2')
export const D3OneOf = oneOf('D3')

export const E1OneOf = oneOf('E1')
export const E2OneOf = oneOf('E2')
export const E3OneOf = oneOf('E3')

export const F1OneOf = oneOf('F1')
export const F2OneOf = oneOf('F2')
export const F3OneOf = oneOf('F3')
export const F4OneOf = oneOf('F4')
export const F5OneOf = oneOf('F5')
export const F6OneOf = oneOf('F6')
export const F7OneOf = oneOf('F7')
export const F8OneOf = oneOf('F8')
export const F9OneOf = oneOf('F9')
