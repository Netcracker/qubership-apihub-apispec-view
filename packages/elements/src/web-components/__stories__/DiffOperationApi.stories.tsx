import renameMediaTypeAndADeeperChangeInRequestBodyAfter from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-and-a-deeper-change-in-request-body/after.yaml'
import renameMediaTypeAndADeeperChangeInRequestBodyBefore from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-and-a-deeper-change-in-request-body/before.yaml'
import renameMediaTypeAndADeeperChangeInResponseAfter from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-and-a-deeper-change-in-response/after.yaml'
import renameMediaTypeAndADeeperChangeInResponseBefore from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-and-a-deeper-change-in-response/before.yaml'
import renameMediaTypeInRequestBodyAfter from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-in-request-body/after.yaml'
import renameMediaTypeInRequestBodyBefore from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-in-request-body/before.yaml'
import renameMediaTypeInResponseAfter from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-in-response/after.yaml'
import renameMediaTypeInResponseBefore from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-in-response/before.yaml'
import { AddNewPetToPetstore } from '@netcracker/qubership-apihub-apispec-view-samples/operations-new-samples/addNewPetToPetstore'
import { AddNewPetToPetstoreCircular } from '@netcracker/qubership-apihub-apispec-view-samples/operations-new-samples/addNewPetToPetstoreCircular'
import {
  AddNewPetToPetstoreNullableProp
} from '@netcracker/qubership-apihub-apispec-view-samples/operations-new-samples/addNewPetToPetstoreNullableProp'
import { ChangedParametersDeprecated } from '@netcracker/qubership-apihub-apispec-view-samples/operations-new-samples/changedParametersDeprecated'
import { ChangedParametersRequired, } from '@netcracker/qubership-apihub-apispec-view-samples/operations-new-samples/changedParametersRequired'
import { DeprecatedOperations } from '@netcracker/qubership-apihub-apispec-view-samples/operations-new-samples/deprecatedOperations'
import {
  WhollyChangedRequestBodyOrResponse,
} from '@netcracker/qubership-apihub-apispec-view-samples/operations-new-samples/operationsForWhollyChangedRequestBodyOrResponse'
// import renameMediaTypeAndADeeperChangeInPathItemParameterBefore from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-and-a-deeper-change-in-path-item-parameter/before.yaml'
// import renameMediaTypeAndADeeperChangeInPathItemParameterAfter from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-and-a-deeper-change-in-path-item-parameter/after.yaml'
// import renameMediaTypeAndADeeperChangeInOperationParameterBefore from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-and-a-deeper-change-in-operation-parameter/before.yaml'
// import renameMediaTypeAndADeeperChangeInOperationParameterAfter from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-and-a-deeper-change-in-operation-parameter/after.yaml'
// import renameMediaTypeAndADeeperChangeInResponseHeaderBefore from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-and-a-deeper-change-in-response-header/before.yaml'
// import renameMediaTypeAndADeeperChangeInResponseHeaderAfter from '@netcracker/qubership-apihub-apispec-view-samples/media-type-samples/rename-media-type-and-a-deeper-change-in-response-header/after.yaml'

import { COMPARE_DISPLAY_MODE } from '@stoplight/elements'
import {
  createLegacyDiffOperationStory,
  legacyDiffStoryArgTypes,
  LegacyDiffStoryArgs,
  legacyDiffStoryParameters,
} from '@stoplight/elements/web-components/__stories__/helpers/legacy-stories-utils'
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import '../index'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'diff-operation-view': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const meta: Meta<LegacyDiffStoryArgs> = {
  title: 'Legacy tests/DiffOperationAPI',
  id: 'legacy-tests-diff-operation-api',
  argTypes: legacyDiffStoryArgTypes,
  parameters: legacyDiffStoryParameters,
}

export default meta
type Story = StoryObj<typeof meta>

export const AddNewPetToPetstoreStory: Story = {
  name: '[post] Add new pet to Petstore',
  ...createLegacyDiffOperationStory(
    AddNewPetToPetstore.BEFORE,
    AddNewPetToPetstore.AFTER,
    { componentProps: { displayMode: COMPARE_DISPLAY_MODE } },
  ),
}

export const AddNewPetToPetstoreStoryCircular: Story = {
  name: '[post] Add new pet to Petstore (Circular)',
  ...createLegacyDiffOperationStory(
    AddNewPetToPetstoreCircular.BEFORE,
    AddNewPetToPetstoreCircular.AFTER,
    { componentProps: { displayMode: COMPARE_DISPLAY_MODE } },
  ),
}

// Uncomment when logic for wholly added/removed will be ready
// export const AddNewPetToPetstoreStoryWhollyAdded: Story = {
//   name: '[post] Add new pet to Petstore (Wholly ADDED)',
//   ...createLegacyDiffOperationStory(
//     AddNewPetToPetstoreWhollyMoved.BEFORE,
//     AddNewPetToPetstoreWhollyMoved.AFTER,
//     { componentProps: { displayMode: COMPARE_DISPLAY_MODE } },
//   ),
// }
//
// export const AddNewPetToPetstoreStoryWhollyRemoved: Story = {
//   name: '[post] Add new pet to Petstore (Wholly REMOVED)',
//   ...createLegacyDiffOperationStory(
//     AddNewPetToPetstoreWhollyMoved.AFTER,
//     AddNewPetToPetstoreWhollyMoved.BEFORE,
//     { componentProps: { displayMode: COMPARE_DISPLAY_MODE } },
//   ),
// }

export const AddNewPetToPetstoreNullablePropStory: Story = {
  name: '[post] Add new pet to Petstore (Nullable Prop)',
  ...createLegacyDiffOperationStory(
    AddNewPetToPetstoreNullableProp.BEFORE,
    AddNewPetToPetstoreNullableProp.AFTER,
  ),
}

export const RemoveWholeResponseCode: Story = {
  name: '[Response] Removed whole RESPONSE code',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON_RESPONSE_301_XML,
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON,
  ),
}

export const RemoveWholeResponseMediaType: Story = {
  name: '[Response] Removed whole RESPONSE media type',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON_RESPONSE_301_XML_JSON,
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON_RESPONSE_301_XML,
  ),
}

export const RemoveSchemaFromResponseMediaType: Story = {
  name: '[Response] Removed schema from RESPONSE media type',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON_RESPONSE_301_XML_JSON,
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON_RESPONSE_301_XML_EMPTY_JSON,
  ),
}

export const RemoveResponseHeaders: Story = {
  name: '[Response] Removed ALL response HEADERS',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON_RESPONSE_301_2_HEADERS,
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON,
  ),
}

export const Remove1ResponseHeader: Story = {
  name: '[Response] Removed 1 response HEADER',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON_RESPONSE_301_2_HEADERS,
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON_RESPONSE_301_1_HEADER,
  ),
}

export const AddResponseHeaders: Story = {
  name: '[Response] Added ALL response HEADERS',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON,
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON_RESPONSE_301_2_HEADERS,
  ),
}

export const Add1ResponseHeader: Story = {
  name: '[Response] Added 1 response HEADER',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON_RESPONSE_301_1_HEADER,
    WhollyChangedRequestBodyOrResponse.HAS_RESPONSE_200_JSON_RESPONSE_301_2_HEADERS,
  ),
}

export const RemoveWholeRequestBody: Story = {
  name: '[Request] Removed whole REQUEST BODY',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.HAS_REQUEST_BODY_JSON_XML,
    WhollyChangedRequestBodyOrResponse.EMPTY_OPERATION,
  ),
}

export const AddWholeRequestBody: Story = {
  name: '[Request] Added whole REQUEST BODY',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.EMPTY_OPERATION,
    WhollyChangedRequestBodyOrResponse.HAS_REQUEST_BODY_JSON_XML,
  ),
}

export const RemoveWholeRequestBodyMediaType: Story = {
  name: '[Request] Removed whole REQUEST BODY media type',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.HAS_REQUEST_BODY_JSON_XML,
    WhollyChangedRequestBodyOrResponse.HAS_REQUEST_BODY_XML,
  ),
}

export const AddWholeRequestBodyMediaType: Story = {
  name: '[Request] Added whole REQUEST BODY media type',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.HAS_REQUEST_BODY_XML,
    WhollyChangedRequestBodyOrResponse.HAS_REQUEST_BODY_JSON_XML,
  ),
}

export const RemoveSchemaFromRequestBodyMediaType: Story = {
  name: '[Request] Removed schema from REQUEST BODY media type',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.HAS_REQUEST_BODY_JSON_XML,
    WhollyChangedRequestBodyOrResponse.HAS_REQUEST_BODY_XML_EMPTY_JSON,
  ),
}

export const Removed1RequestHeader: Story = {
  name: '[Request] Removed 1 request HEADER',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.HAS_REQUEST_3_HEADERS_RESPONSE_200_JSON_RESPONSE_HEADERS,
    WhollyChangedRequestBodyOrResponse.HAS_REQUEST_2_HEADERS_RESPONSE_200_JSON_RESPONSE_HEADERS,
  ),
}

export const Added1RequestHeader: Story = {
  name: '[Request] Added 1 request HEADER',
  ...createLegacyDiffOperationStory(
    WhollyChangedRequestBodyOrResponse.HAS_REQUEST_2_HEADERS_RESPONSE_200_JSON_RESPONSE_HEADERS,
    WhollyChangedRequestBodyOrResponse.HAS_REQUEST_3_HEADERS_RESPONSE_200_JSON_RESPONSE_HEADERS,
  ),
}

export const DeprecatedOperation: Story = {
  name: '[Operation] NOT deprecated -> Deprecated',
  ...createLegacyDiffOperationStory(
    DeprecatedOperations.WITHOUT_DEPRECATION,
    DeprecatedOperations.WITH_DEPRECATION,
  ),
}

export const UnDeprecatedOperation: Story = {
  name: '[Operation] Deprecated -> NOT deprecated',
  ...createLegacyDiffOperationStory(
    DeprecatedOperations.WITH_DEPRECATION,
    DeprecatedOperations.WITHOUT_DEPRECATION,
  ),
}

export const ChangedParametersRequiredStory: Story = {
  name: '[Operation] Changed "required" flags in parameters',
  ...createLegacyDiffOperationStory(
    ChangedParametersRequired.BEFORE,
    ChangedParametersRequired.AFTER,
  ),
}

export const ChangedParametersDeprecatedStory: Story = {
  name: '[Operation] Changed "deprecated" flags in parameters',
  ...createLegacyDiffOperationStory(
    ChangedParametersDeprecated.BEFORE,
    ChangedParametersDeprecated.AFTER,
  ),
}

export const RequestBodyNoAdditionalPropertiesNotChanged: Story = createLegacyDiffOperationStory(
  {
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
                  additionalProperties: false
                }
              }
            }
          }
        }
      }
    }
  },
  {
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
                  additionalProperties: false
                }
              }
            }
          }
        }
      }
    }
  },
)

export const OneOfChanges: Story = {
  name: '[oneOf] Changes in oneOf',
  ...createLegacyDiffOperationStory(
    {
      openapi: '3.0.0',
      paths: {
        '/test': {
          post: {
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      prop1: {
                        description: 'Added oneOf item',
                        oneOf: [
                          { type: 'string' },
                          { type: 'number' },
                        ]
                      },
                      prop2: {
                        description: 'Removed oneOf item',
                        oneOf: [
                          { type: 'string' },
                          { type: 'number' },
                          { type: 'boolean' },
                        ]
                      },
                      prop3: {
                        description: 'Changed primitive type in oneOf item',
                        oneOf: [
                          { type: 'string' },
                          { type: 'number' },
                        ]
                      },
                      prop4: {
                        description: 'Changed objective type in oneOf item',
                        oneOf: [
                          { type: 'string' },
                          {
                            type: 'object',
                            properties: {
                              test: { type: 'boolean' },
                            }
                          },
                        ]
                      },
                      prop5: {
                        description: 'Changed iterable type in oneOf item',
                        oneOf: [
                          { type: 'string' },
                          {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                test: { type: 'boolean' },
                              }
                            }
                          },
                        ]
                      },
                      prop6: {
                        description: 'Replaced objective type in oneOf item',
                        oneOf: [
                          { type: 'string' },
                          {
                            type: 'object',
                            properties: {
                              test: { type: 'boolean' },
                            }
                          },
                        ]
                      },
                      prop7: {
                        description: 'Replaced iterable type in oneOf item',
                        oneOf: [
                          { type: 'string' },
                          {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                test: { type: 'boolean' },
                              }
                            }
                          },
                        ]
                      },
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      openapi: '3.0.0',
      paths: {
        '/test': {
          post: {
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      prop1: {
                        description: 'Added oneOf item',
                        oneOf: [
                          { type: 'string' },
                          { type: 'number' },
                          { type: 'boolean' },
                        ]
                      },
                      prop2: {
                        description: 'Removed oneOf item',
                        oneOf: [
                          { type: 'string' },
                          { type: 'number' },
                        ]
                      },
                      prop3: {
                        description: 'Changed primitive type in oneOf item',
                        oneOf: [
                          { type: 'string' },
                          { type: 'integer' },
                        ]
                      },
                      prop4: {
                        description: 'Changed objective type in oneOf item',
                        oneOf: [
                          { type: 'string' },
                          {
                            type: 'object',
                            properties: {
                              test: { type: 'boolean' },
                              newProp: { type: 'string' },
                            }
                          },
                        ]
                      },
                      prop5: {
                        description: 'Changed iterable type in oneOf item',
                        oneOf: [
                          { type: 'string' },
                          {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                test: { type: 'boolean' },
                                newProp: { type: 'string' },
                              }
                            }
                          },
                        ]
                      },
                      prop6: {
                        description: 'Replaced objective type in oneOf item',
                        oneOf: [
                          { type: 'string' },
                          { type: 'number' },
                        ]
                      },
                      prop7: {
                        description: 'Replaced iterable type in oneOf item',
                        oneOf: [
                          { type: 'string' },
                          { type: 'number' },
                        ]
                      },
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
  ),
}

const KEEP_PROPS_INTEGER_TYPE = {
  type: 'integer',
  description: 'Integer type',
  minimum: 5,
  exclusiveMinimum: true,
  multipleOf: 5,
}
const KEEP_PROPS_STRING_TYPE = {
  type: 'string',
  description: 'String type',
  minLength: 1,
  maxLength: 150,
  pattern: '^a-zA-Z$'
}

export const IntegerToString: Story = createLegacyDiffOperationStory(
  {
    openapi: '3.0.0',
    paths: {
      '/test': {
        post: {
          requestBody: {
            content: {
              'application/json': {
                schema: KEEP_PROPS_INTEGER_TYPE
              }
            }
          }
        }
      }
    }
  },
  {
    openapi: '3.0.0',
    paths: {
      '/test': {
        post: {
          requestBody: {
            content: {
              'application/json': {
                schema: KEEP_PROPS_STRING_TYPE
              }
            }
          }
        }
      }
    }
  },
)

export const StringToInteger: Story = createLegacyDiffOperationStory(
  {
    openapi: '3.0.0',
    paths: {
      '/test': {
        post: {
          requestBody: {
            content: {
              'application/json': {
                schema: KEEP_PROPS_STRING_TYPE
              }
            }
          }
        }
      }
    }
  },
  {
    openapi: '3.0.0',
    paths: {
      '/test': {
        post: {
          requestBody: {
            content: {
              'application/json': {
                schema: KEEP_PROPS_INTEGER_TYPE
              }
            }
          }
        }
      }
    }
  },
)

export const ChangePathParamName: Story = {
  name: '[path] Changed path param name',
  ...createLegacyDiffOperationStory(
    {
      openapi: '3.0.0',
      paths: {
        '/test/{id}': {
          get: {
            summary: 'Get test by id',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'string',
                  description: 'Id of the test',
                }
              }
            ]
          }
        }
      }
    },
    {
      openapi: '3.0.0',
      paths: {
        '/test/{key}': {
          get: {
            summary: 'Get test by key',
            parameters: [
              {
                name: 'key',
                in: 'path',
                required: true,
                schema: {
                  type: 'string',
                  description: 'Key of the test',
                }
              }
            ]
          }
        }
      }
    },
  ),
}

const EMPTY_FILTERS = { filters: [] }

export const RenameMediaTypeAndADeeperChangeInResponse: Story = {
  name: '[Response] Rename media type and a deeper change in response',
  ...createLegacyDiffOperationStory(
    renameMediaTypeAndADeeperChangeInResponseBefore,
    renameMediaTypeAndADeeperChangeInResponseAfter,
    { componentProps: EMPTY_FILTERS },
  ),
}

// todo should be shown
export const RenameMediaTypeInResponse: Story = {
  name: '[Response] Rename media type in response',
  ...createLegacyDiffOperationStory(
    renameMediaTypeInResponseBefore,
    renameMediaTypeInResponseAfter,
    { componentProps: EMPTY_FILTERS },
  ),
}

export const RenameMediaTypeAndADeeperChangeInRequestBody: Story = {
  name: '[Request] Rename media type and a deeper change in request body',
  ...createLegacyDiffOperationStory(
    renameMediaTypeAndADeeperChangeInRequestBodyBefore,
    renameMediaTypeAndADeeperChangeInRequestBodyAfter,
    { componentProps: EMPTY_FILTERS },
  ),
}

// todo should be shown
export const RenameMediaTypeInRequestBody: Story = {
  name: '[Request] Rename media type in request body',
  ...createLegacyDiffOperationStory(
    renameMediaTypeInRequestBodyBefore,
    renameMediaTypeInRequestBodyAfter,
    { componentProps: EMPTY_FILTERS },
  ),
}

const beforeBugCrashInfiniteAdditionalPropsInDiffs = {
  "openapi": "3.0.1",
  "paths": {
    "/path1": {
      "get": {
        "operationId": "myId",
        "responses": {
          "200": {
            "description": "lorem ipsum",
            "content": {
              "text/plain": {}
            }
          }
        }
      }
    }
  },
  "components": {}
}
const afterBugCrashInfiniteAdditionalPropsInDiffs = {
  "openapi": "3.0.1",
  "paths": {
    "/path1": {
      "get": {
        "operationId": "myId",
        "responses": {
          "200": {
            "description": "lorem ipsum",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {}
}

// Root cause: incorrect behavior of "isDiffMetaRecord" which produces infinite loop in "combineDiffMetas"
export const BugCrashInfiniteAdditionalPropsInDiffs: Story = {
  name: '[Bug] Crash Infinite Additional Props In Diffs',
  ...createLegacyDiffOperationStory(
    beforeBugCrashInfiniteAdditionalPropsInDiffs,
    afterBugCrashInfiniteAdditionalPropsInDiffs,
    { componentProps: EMPTY_FILTERS },
  ),
}
