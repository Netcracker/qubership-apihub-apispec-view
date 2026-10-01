import '../index';

import { apiAuthLocalAfter, apiAuthLocalBefore, simpleOperation, specWithComplexRefs } from '@netcracker/qubership-apihub-apispec-view-samples';
import {
  createLegacyOperationStory,
  legacyStoryArgTypes,
  LegacyStoryArgs,
  legacyStoryParameters,
} from '@stoplight/elements/web-components/__stories__/helpers/legacy-stories-utils';
import { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'operation-view': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const meta: Meta<LegacyStoryArgs> = {
  title: 'Legacy tests/OperationAPI',
  id: 'legacy-tests-operation-api',
  argTypes: legacyStoryArgTypes,
  parameters: legacyStoryParameters,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleOperation: Story = {
  name: 'Simple Operation',
  ...createLegacyOperationStory(simpleOperation),
};

export const SimpleOperationSimpleMode: Story = {
  name: 'Simple Operation (Simple Mode)',
  ...createLegacyOperationStory(simpleOperation, { componentProps: { schemaViewMode: 'simple' } }),
};

export const ApiAuthLocalBefore: Story = {
  name: 'Api Auth Local Before',
  ...createLegacyOperationStory(apiAuthLocalBefore, {
    componentProps: {
      proxyServer: JSON.stringify({ url: 'test-proxy-url', description: 'Custom url' }),
      hideExamples: true,
    },
  }),
};

export const ApiAuthLocalAfter: Story = {
  name: 'Api Auth Local After',
  ...createLegacyOperationStory(apiAuthLocalAfter),
};

export const OperationWithoutHeading: Story = {
  name: 'Operation without Heading',
  ...createLegacyOperationStory(simpleOperation, { componentProps: { noHeading: true } }),
};

export const SpecWithComplexRefs: Story = {
  name: 'Spec with Complex Refs',
  ...createLegacyOperationStory(specWithComplexRefs, { componentProps: { noHeading: true } }),
};

export const OperationWithParametersOneSchemaAnotherContent: Story = {
  name: 'Operation with 2 params. 1st with schema, 2nd with content',
  ...createLegacyOperationStory({
    openapi: '3.0.2',
    paths: {
      '/test': {
        post: {
          summary: 'Test',
          description: 'Description for Test',
          parameters: [
            {
              name: 'simple',
              in: 'query',
              schema: {
                type: 'number',
                description: 'Number param',
              },
            },
            {
              name: 'complex',
              in: 'query',
              content: {
                'application/json': {
                  schema: {
                    type: 'string',
                    description: 'String param',
                  },
                },
              },
            },
          ],
        },
      },
    },
  }),
};

export const RequestBodyNoAdditionalProperties: Story = createLegacyOperationStory({
  openapi: '3.0.2',
  paths: {
    '/test': {
      post: {
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  prop1: { type: 'string' },
                  prop2: { type: 'string' },
                },
                additionalProperties: false,
              },
            },
          },
        },
      },
    },
  },
});
