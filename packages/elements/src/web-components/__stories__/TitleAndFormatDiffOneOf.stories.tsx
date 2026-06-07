import { Meta, StoryObj } from '@storybook/react/*'
import { caseDocs, CASES, StoryComponent } from '@stoplight/elements/web-components/__stories__/helpers/titleAndFormatCases'
import '../index'

const meta: Meta<{ before: object; after: object }> = {
  title: 'Title & Format Diffs/oneOf',
}
export default meta

type Story = StoryObj<typeof meta>

const story = (id: string): Story => ({
  render: StoryComponent,
  args: caseDocs(CASES[id].before, CASES[id].after, true),
  name: `[${id}] ${CASES[id].name}`,
})

export const A1 = story('A1')
export const A2 = story('A2')
export const A3 = story('A3')

export const B1 = story('B1')
export const B2 = story('B2')
export const B3 = story('B3')

export const C1 = story('C1')
export const C2 = story('C2')
export const C3 = story('C3')

export const D1 = story('D1')
export const D2 = story('D2')
export const D3 = story('D3')

export const E1 = story('E1')
export const E2 = story('E2')
export const E3 = story('E3')

export const F1 = story('F1')
export const F2 = story('F2')
export const F3 = story('F3')
export const F4 = story('F4')
export const F5 = story('F5')
export const F6 = story('F6')
export const F7 = story('F7')
export const F8 = story('F8')
export const F9 = story('F9')
