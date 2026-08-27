import '../index';

import { apiAuthLocalAfter, apiAuthLocalBefore, simpleOperation, specWithComplexRefs } from '@netcracker/qubership-apihub-apispec-view-samples';
import { OperationAPIImpl } from "@stoplight/elements/containers/OperationAPI";
import { getMergedDocument } from "@stoplight/elements/web-components/__stories__/helpers/getMergedDocument";
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'operation-view': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const Template = (props: any) => <OperationAPIImpl {...props} proxyServer={JSON.stringify(props.proxyServer)} />;

export default {
  title: 'web-components/OperationAPI',
  argTypes: {
    operation: {
      control: 'text',
    },
    layout: {
      control: { type: 'inline-radio', options: ['sidebar', 'stacked', 'partial'] },
      defaultValue: 'sidebar',
    },
    router: {
      control: { type: 'inline-radio', options: ['history', 'memory', 'hash', 'static'] },
      defaultValue: 'history',
    },
    selectedNodeUri: { control: 'text', defaultValue: '/' },
    searchPhrase: { control: 'text' },
    schemaViewMode: {
      control: { type: 'inline-radio', options: ['simple', 'detailed'] },
      defaultValue: undefined,
    },
  },
};

export const SimpleOperation: any = Template.bind({});
SimpleOperation.args = {
  mergedDocument: getMergedDocument(simpleOperation, undefined),
};
SimpleOperation.storyName = 'Simple Operation';

export const SimpleOperationSimpleMode: any = Template.bind({});
SimpleOperationSimpleMode.args = {
  mergedDocument: getMergedDocument(simpleOperation, undefined),
  schemaViewMode: 'simple',
};
SimpleOperationSimpleMode.storyName = 'Simple Operation (Simple Mode)';

export const ApiAuthLocalBefore: any = Template.bind({});
ApiAuthLocalBefore.args = {
  mergedDocument: getMergedDocument(apiAuthLocalBefore, undefined),
  proxyServer: { url: 'test-proxy-url', description: 'Custom url' },
  hideExamples: true,
};
ApiAuthLocalBefore.storyName = 'Api Auth Local Before';

export const ApiAuthLocalAfter: any = Template.bind({});
ApiAuthLocalAfter.args = {
  mergedDocument: getMergedDocument(apiAuthLocalAfter, undefined),
};
ApiAuthLocalAfter.storyName = 'Api Auth Local After';

export const OperationWithoutHeading: any = Template.bind({});
OperationWithoutHeading.args = {
  mergedDocument: getMergedDocument(simpleOperation, undefined),
  noHeading: true,
};
OperationWithoutHeading.storyName = 'Operation without Heading';

export const SpecWithComplexRefs: any = Template.bind({});
SpecWithComplexRefs.args = {
  mergedDocument: getMergedDocument(specWithComplexRefs, undefined),
  noHeading: true,
};
SpecWithComplexRefs.storyName = 'Spec with Complex Refs';

export const OperationWithParametersOneSchemaAnotherContent: any = Template.bind({});
OperationWithParametersOneSchemaAnotherContent.args = {
  mergedDocument: getMergedDocument({
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
  }, undefined),
};
OperationWithParametersOneSchemaAnotherContent.storyName = 'Operation with 2 params. 1st with schema, 2nd with content';

export const RequestBodyNoAdditionalProperties: any = Template.bind({});
RequestBodyNoAdditionalProperties.args = {
  mergedDocument: getMergedDocument(
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
    undefined
  )
}

export const BugCycleRef: any = Template.bind({});
BugCycleRef.args = {
  mergedDocument: getMergedDocument(
    {
      "openapi": "3.0.1",
      "info": {
        "title": "Order API"
      },
      "paths": {
        "/api/v2/ticketManagenet/ticketOrder/{id}/orderItem": {
          "post": {
            "tags": [
              "Order Items"
            ],
            "operationId": "addOrderItemToTicketOrder_v2",
            "x-vendors": [
              "Dich"
            ],
            "summary": "Add Order Item to Ticket Order v2",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {
                  "type": "string",
                  "format": "ID"
                },
                "description": "Specifies the location id."
              },
              {
                "$ref": "#/components/parameters/x-request-id"
              },
              {
                "$ref": "#/components/parameters/-fields"
              },
              {
                "$ref": "#/components/parameters/fields"
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/JsonOffering"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "201": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/TicketOrder"
                    }
                  }
                }
              },
              "400": {
                "$ref": "#/components/responses/error_400"
              }
            }
          }
        }
      },
      "components": {
        "parameters": {
          "x-request-id": {
            "in": "header",
            "name": "X-Request-ID",
            "description": "Request identifier to be transferred in HTTP header for any operations",
            "schema": {
              "type": "string",
              "format": "uuid"
            },
            "required": false
          },
          "-fields": {
            "name": "-fields",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          "fields": {
            "name": "fields",
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        },
        "schemas": {
          "JsonOffering": {
            "title": "JsonOffering",
            "x-v-entity": "JsonOffering",
            "type": "object",
            "required": [
              "id"
            ],
            "properties": {
              "id": {
                "type": "string",
                "example": "24385678947"
              },
              "deliveryOffering": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/JsonOffering"
                  },
                  {
                    "type": "object",
                    "description": "only Id and Char should be used for the delivery offerings"
                  }
                ]
              },
              "billingAccountId": {
                "type": "string",
                "example": "24385678939"
              },
              "offerings": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/JsonOffering"
                }
              },
              "deliveryMethodItemId": {
                "type": "string",
                "example": "24385678959"
              }
            }
          },
          "User": {
            "title": "User",
            "x-v-entity": "User",
            "required": [
              "type"
            ],
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "description": "Specifies whether it is a user or a user group.",
                "enum": [
                  "User",
                  "Group"
                ],
                "example": "User"
              }
            }
          },
          "LOOKRef": {
            "title": "LOOKRef",
            "x-v-entity": "LOOKRef",
            "type": "object",
            "required": [
              "id"
            ],
            "properties": {
              "id": {
                "type": "string",
                "example": "3164288454180077266"
              }
            }
          },
          "TicketOrderRef": {
            "title": "TicketOrderRef",
            "x-v-entity": "TicketOrderRef",
            "required": [
              "id",
              "name",
              "sequenceNo"
            ],
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "example": "5163923668650112100"
              },
              "type": {
                "type": "string",
                "enum": [
                  "Basic",
                  "Activation Template"
                ],
                "example": "Basic"
              },
              "name": {
                "type": "string",
                "description": "Name of Ticket Order",
                "example": "Ticket Order #0000000100"
              },
              "assignedTo": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/User"
                  },
                  {
                    "type": "object",
                    "description": "The responsible CSR user or user group assigned to the ticket order."
                  }
                ]
              },
              "salesTeam": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/LOOKRef"
                  },
                  {
                    "type": "object",
                    "description": "The responsible Sales Team assigned to the ticket order."
                  }
                ]
              }
            }
          },
          "Currency": {
            "title": "Currency",
            "x-v-entity": "Currency",
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              }
            }
          },
          "MonetaryValue": {
            "title": "MonetaryValue",
            "x-v-entity": "MonetaryValue",
            "type": "object",
            "required": [
              "value"
            ],
            "properties": {
              "value": {
                "type": "string",
                "description": "Numeric value of money amount.",
                "example": "0.0"
              },
              "currency": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/Currency"
                  },
                  {
                    "type": "object",
                    "description": "Currency in which the value is nominated."
                  }
                ]
              }
            }
          },
          "PriceComponentSpecification": {
            "title": "PriceComponentSpecification",
            "x-v-entity": "PriceComponentSpecification",
            "required": [
              "id"
            ],
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "example": "1995881928"
              },
              "name": {
                "type": "string"
              }
            }
          },
          "DiscountDetails": {
            "title": "DiscountDetails",
            "x-v-entity": "DiscountDetails",
            "type": "object",
            "properties": {
              "taxAmount": {
                "type": "number",
                "description": "Sum of all taxes applied to the particular discount/price alteration"
              }
            }
          },
          "PriceDetails": {
            "title": "PriceDetails",
            "x-v-entity": "PriceDetails",
            "type": "object",
            "properties": {
              "priceType": {
                "type": "string",
                "description": "Type of the price",
                "enum": [
                  "OneTime",
                  "Recurrent",
                  "Upfront",
                  "UpfrontAccountTotal",
                  "OneTimeAmountTotal"
                ]
              },
              "priceSpec": {
                "$ref": "#/components/schemas/PriceComponentSpecification"
              },
              "manuallyEntered": {
                "type": "boolean",
                "description": "True if the price has been overridden. Available for item prices only.",
                "example": true
              },
              "currency": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/Currency"
                  },
                  {
                    "type": "object",
                    "description": "The currency of payment (the same for the whole installment plan)."
                  }
                ]
              },
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/PriceDetails"
                },
                "description": "Specifies the list of sub-items (PriceDetails entities) below this entity. Price per unit PriceDetails entities (price type is empty) are presented as sub-items for Price per quantity PriceDetails entities (Onetime and Recurrent price types)."
              },
              "discounts": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/DiscountDetails"
                },
                "description": "Specifies the list of DiscountDetails entities. Available for item prices only (both per quantity and per unit)."
              }
            }
          },
          "AbstractProductPrice": {
            "title": "AbstractProductPrice",
            "x-v-entity": "ItemPrice",
            "type": "object",
            "properties": {
              "recurrentTotal": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/MonetaryValue"
                  },
                  {
                    "type": "object",
                    "description": "Recurrent total price without tax."
                  }
                ]
              },
              "recurrentDiscount": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/MonetaryValue"
                  },
                  {
                    "type": "object",
                    "description": "Recurrent total discount without tax."
                  }
                ]
              },
              "recurrentTax": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/MonetaryValue"
                  },
                  {
                    "type": "object",
                    "description": "Recurrent total tax discounted."
                  }
                ]
              },
              "recurrentTotalWithTax": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/MonetaryValue"
                  },
                  {
                    "type": "object",
                    "description": "Recurrent total price with tax."
                  }
                ]
              },
              "recurrentTotalDiscountWithTax": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/MonetaryValue"
                  },
                  {
                    "type": "object",
                    "description": "Recurrent Total discount with tax."
                  }
                ]
              },
              "recurrentTotalWithTaxDiscounted": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/MonetaryValue"
                  },
                  {
                    "type": "object",
                    "description": "Recurrent total price with tax discounted."
                  }
                ]
              },
              "detailedPrices": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/PriceDetails"
                },
                "minItems": 1,
                "description": "Any other prices assigned to Ticket Order/Customer Product/Order Item (e. g. Upfront Fee etc.) specified by their Price Type within the Price Details resource model."
              }
            }
          },
          "TicketOrderPrice": {
            "title": "TicketOrderPrice",
            "x-v-entity": "ItemPrice",
            "allOf": [
              {
                "$ref": "#/components/schemas/AbstractProductPrice"
              },
              {
                "type": "object",
                "properties": {
                  "oneTimeDiscount": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/MonetaryValue"
                      },
                      {
                        "type": "object",
                        "description": "One Time total discount."
                      }
                    ]
                  },
                  "oneTimeTotalWithTax": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/MonetaryValue"
                      },
                      {
                        "type": "object",
                        "description": "One Time total discount with tax."
                      }
                    ]
                  },
                  "oneTimeTotalWithTaxDiscounted": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/MonetaryValue"
                      },
                      {
                        "type": "object",
                        "description": "One Time total price with tax discounted."
                      }
                    ]
                  },
                  "oneTimeTotalDiscountWithTax": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/MonetaryValue"
                      },
                      {
                        "type": "object",
                        "description": "One Time total discount with tax."
                      }
                    ]
                  },
                  "oneTimeTotal": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/MonetaryValue"
                      },
                      {
                        "type": "object",
                        "description": "One Time total price."
                      }
                    ]
                  },
                  "oneTimeTax": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/MonetaryValue"
                      },
                      {
                        "type": "object",
                        "description": "One Time Total tax discounted."
                      }
                    ]
                  }
                }
              }
            ]
          },
          "UpfrontFeePerBillingAccount": {
            "title": "UpfrontFeePerBillingAccount",
            "x-v-entity": "UpfrontFeePerBillingAccount",
            "type": "object",
            "required": [
              "billingAccountId",
              "targetOrderItems",
              "status",
              "requiredAmount"
            ],
            "properties": {
              "status": {
                "type": "string",
                "description": "Specifies payment status of this Upfront Fee.",
                "enum": [
                  "Paid",
                  "Unpaid"
                ],
                "example": "Paid"
              },
              "requiredAmount": {
                "allOf": [
                  {
                    "type": "object"
                  },
                  {
                    "$ref": "#/components/schemas/PriceDetails"
                  }
                ]
              },
              "accountBalance": {
                "allOf": [
                  {
                    "type": "object"
                  },
                  {
                    "$ref": "#/components/schemas/MonetaryValue"
                  }
                ]
              },
              "paymentAmount": {
                "allOf": [
                  {
                    "type": "object"
                  },
                  {
                    "$ref": "#/components/schemas/MonetaryValue"
                  }
                ]
              }
            }
          },
          "CharacteristicValue": {
            "title": "CharacteristicValue",
            "x-v-entity": "CharacteristicValue",
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "example": "3141592653591393200"
              },
              "value": {
                "type": "string"
              },
              "originalValue": {
                "type": "string"
              }
            }
          },
          "Characteristic": {
            "title": "Characteristic",
            "x-v-entity": "Characteristic",
            "type": "object",
            "required": [
              "id",
              "name",
              "originalName",
              "values"
            ],
            "properties": {
              "id": {
                "type": "string",
                "example": "3141592653591393108"
              },
              "name": {
                "type": "string",
                "description": "A localized name of the Characteristic.",
                "example": "Väri"
              },
              "originalName": {
                "type": "string",
                "description": "The original name of the Characteristic.",
                "example": "Color"
              },
              "values": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/CharacteristicValue"
                },
                "description": "One or more values selected for this Characteristic from the whole spectrum of its allowed values."
              }
            }
          },
          "TicketOrderReduced": {
            "title": "TicketOrderReduced",
            "x-v-entity": "TicketOrder",
            "allOf": [
              {
                "$ref": "#/components/schemas/TicketOrderRef"
              },
              {
                "type": "object",
                "required": [
                  "distributionChannel",
                  "status"
                ],
                "properties": {
                  "customerId": {
                    "type": "string",
                    "example": "9158265220413086674"
                  },
                  "status": {
                    "type": "string",
                    "description": "Status of the ticket order",
                    "example": "Completed"
                  },
                  "billingStatus": {
                    "type": "string",
                    "enum": [
                      "Ready for Bill Generation",
                      "Billed",
                      "Payment Done"
                    ],
                    "example": "Payment Done"
                  },
                  "price": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/TicketOrderPrice"
                      },
                      {
                        "type": "object",
                        "description": "Sales order price"
                      }
                    ]
                  },
                  "upfrontPaymentTotals": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/UpfrontFeePerBillingAccount"
                    },
                    "minItems": 1,
                    "description": "A collection of Upfront Payment Fees for every Billing Account under this Ticket Order (if any)."
                  },
                  "specifiedChars": {
                    "type": "array",
                    "description": "Detailed representation of specified Ticket Order characteristics along with their values.",
                    "items": {
                      "$ref": "#/components/schemas/Characteristic"
                    }
                  },
                  "requestedByIndividual": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/LOOKRef"
                      },
                      {
                        "type": "object"
                      }
                    ],
                    "description": "Id and name of individual who created the Ticket Order object in the system."
                  }
                }
              }
            ]
          },
          "OrderItemPrice": {
            "title": "OrderItemPrice",
            "x-v-entity": "ItemPrice",
            "x-v-implementationDetails": "The data is provided by ROE:\n  - downPayment\n  - installmentNextPayment",
            "allOf": [
              {
                "$ref": "#/components/schemas/AbstractProductPrice"
              },
              {
                "type": "object",
                "properties": {
                  "oneTimeTotal": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/MonetaryValue"
                      },
                      {
                        "type": "object",
                        "description": "One Time total price without tax."
                      }
                    ]
                  },
                  "oneTimeDiscount": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/MonetaryValue"
                      },
                      {
                        "type": "object",
                        "description": "One Time total discount without tax."
                      }
                    ]
                  },
                  "oneTimeTax": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/MonetaryValue"
                      },
                      {
                        "type": "object",
                        "description": "One Time total tax discounted."
                      }
                    ]
                  },
                  "oneTimeTotalWithTax": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/MonetaryValue"
                      },
                      {
                        "type": "object",
                        "description": "One Time total price with tax."
                      }
                    ]
                  },
                  "oneTimeTotalDiscountWithTax": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/MonetaryValue"
                      },
                      {
                        "type": "object",
                        "description": "One Time Total discount with tax."
                      }
                    ]
                  },
                  "oneTimeTotalWithTaxDiscounted": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/MonetaryValue"
                      },
                      {
                        "type": "object",
                        "description": "One Time total price with tax discounted."
                      }
                    ]
                  },
                  "downPayment": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PriceDetails"
                      },
                      {
                        "type": "object",
                        "description": "Price details for the down payment amount of the related installment plan (if any). Note - The Down Payment Amount and Number Of Installments parameters are already included into the CustomerProduct.chars."
                      }
                    ]
                  },
                  "installmentNextPayment": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PriceDetails"
                      },
                      {
                        "type": "object",
                        "description": "Price details for the next scheduled installment payment of the related installment plan (if any)."
                      }
                    ]
                  }
                }
              }
            ]
          },
          "ClubEntityRef": {
            "title": "ClubEntityRef",
            "x-v-entity": "ClubEntityRef",
            "required": [
              "id"
            ],
            "type": "object",
            "description": "This object provides a basic representation of the referred entity",
            "properties": {
              "id": {
                "type": "string",
                "example": "9142904280213931089"
              },
              "type": {
                "type": "string",
                "enum": [
                  "Equipment Offering",
                  "One-Time Service",
                  "Technical One-Time Service"
                ],
                "description": "The type of the product offering."
              }
            }
          },
          "PuctClubRef": {
            "title": "PuctClubRef",
            "x-v-entity": "ClubEntityRef",
            "allOf": [
              {
                "$ref": "#/components/schemas/ClubEntityRef"
              }
            ]
          },
          "OrderItem": {
            "title": "OrderItem",
            "x-v-entity": "OrderItem",
            "required": [
              "id",
              "parentId",
              "offer",
              "action"
            ],
            "type": "object",
            "properties": {
              "action": {
                "type": "string",
                "description": "The action of the order item. For example, Add, Disconnect, and other actions."
              },
              "amount": {
                "type": "integer",
                "description": "The amount of Order Items to be duplicated out of current OI",
                "example": 100
              },
              "prices": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/OrderItemPrice"
                  },
                  {
                    "type": "object",
                    "description": "The prices of the order item such as money and loyalty points."
                  }
                ]
              },
              "typeOfSelling": {
                "type": "string",
                "description": "The TypeOfSelling object. Possible values are MONEY and LOYALTY.",
                "enum": [
                  "MONEY",
                  "PARTIALLY",
                  "LOYALTY"
                ],
                "example": "MONEY"
              },
              "orderItems": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/OrderItem"
                },
                "description": "Child order items."
              },
              "id": {
                "type": "string",
                "example": "9142904280213931089"
              },
              "offer": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/PuctClubRef"
                  },
                  {
                    "type": "object",
                    "description": "Reduce version of Offering for current order item.\n"
                  }
                ]
              },
              "specifiedChars": {
                "type": "array",
                "description": "Detailed representation of Customer Product characteristics along with their selected values.",
                "items": {
                  "$ref": "#/components/schemas/Characteristic"
                }
              }
            }
          },
          "ClBundleRef": {
            "title": "ClBundleRef",
            "x-v-entity": "ClubEntityRef",
            "allOf": [
              {
                "$ref": "#/components/schemas/ClubEntityRef"
              }
            ]
          },
          "BundleItem": {
            "title": "BundleItem",
            "x-v-entity": "BundleItem",
            "type": "object",
            "required": [
              "id",
              "pocBundle"
            ],
            "properties": {
              "action": {
                "type": "string",
                "description": "The action of the bundle item. For example, Add, Modify, Remove, Suspend, Resume, Cancel or \"-\"."
              },
              "prices": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/PriceDetails"
                },
                "description": "Price details for this bundle item."
              },
              "pocBundle": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ClBundleRef"
                  },
                  {
                    "type": "object",
                    "description": "The basic representation of the related marketing bundle."
                  }
                ]
              },
              "pairedBundleItem": {
                "$ref": "#/components/schemas/BundleItem"
              }
            }
          },
          "DiscountRef": {
            "title": "DiscountRef",
            "x-v-entity": "DiscountRef",
            "allOf": [
              {
                "$ref": "#/components/schemas/ClubEntityRef"
              }
            ]
          },
          "DiscountItem": {
            "title": "DiscountItem",
            "x-v-entity": "DiscountItem",
            "required": [
              "id",
              "targetOrderItems"
            ],
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "example": "9129182954913332555"
              },
              "discountId": {
                "type": "string"
              },
              "discount": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/DiscountRef"
                  },
                  {
                    "type": "object",
                    "description": "Specifies related Club Discount reference."
                  }
                ]
              }
            }
          },
          "TicketOrder": {
            "title": "TicketOrder",
            "x-v-entity": "TicketOrder",
            "allOf": [
              {
                "$ref": "#/components/schemas/TicketOrderReduced"
              },
              {
                "type": "object",
                "properties": {
                  "orderItems": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/OrderItem"
                    },
                    "description": "An array of order item objects."
                  },
                  "bundleItems": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/BundleItem"
                      },
                      {
                        "type": "object",
                        "description": "An array of bundle item objects related to this ticket order (if any)."
                      }
                    ]
                  },
                  "discountItems": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/DiscountItem"
                    },
                    "description": "An array of discount items of the ticket order."
                  },
                  "version": {
                    "type": "string",
                    "description": "Version of Ticket Order."
                  }
                }
              }
            ]
          }
        },
        "responses": {
          "error_400": {
            "description": "The server cannot or will not process the request due to an\napparent client error (e.g., malformed request syntax, size too large,\ninvalid request message framing, or deceptive request routing)",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    undefined
  )
}
