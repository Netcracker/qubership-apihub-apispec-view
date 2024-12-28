export namespace AddNewPetToPetstore {
  export const BEFORE: any = {
    openapi: '3.0.2',
    servers: [
      {
        url: '/v3',
      },
    ],
    paths: {
      '/pet': {
        post: {
          tags: ['pet'],
          summary: 'Add a new pet to the store',
          description: 'Add a new pet to the store',
          operationId: 'addPet',
          responses: {
            '200': {
              description: 'REMOVED Successful operation Response Description',
              content: {
                'application/xml': {
                  schema: {
                    $ref: '#/components/schemas/Pet',
                  },
                },
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Pet',
                  },
                },
              },
            },
            '405': {
              description: 'Invalid input',
            },
          },
          security: [
            {
              petstore_auth: ['write:pets', 'read:pets'],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Pet',
                },
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Pet',
                },
              },
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/Pet',
                },
              },
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        petstore_auth: {
          type: 'oauth2',
          flows: {
            implicit: {
              authorizationUrl: 'https://petstore.swagger.io/oauth/authorize',
              scopes: {
                'write:pets': 'modify pets in your account',
                'read:pets': 'read your pets',
              },
            },
          },
        },
        api_key: {
          type: 'apiKey',
          name: 'api_key',
          in: 'header',
        },
      },
      schemas: {
        Pet: {
          'x-swagger-router-model': 'io.swagger.petstore.model.Pet',
          required: ['name', 'photoUrls'],
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 10,
            },
            name: {
              type: 'string',
              example: 'doggie',
            },
            category: {
              $ref: '#/components/schemas/Category',
            },
            photoUrls: {
              type: 'array',
              xml: {
                wrapped: true,
              },
              items: {
                type: 'string',
                xml: {
                  name: 'photoUrl',
                },
              },
            },
            tags: {
              type: 'array',
              xml: {
                wrapped: true,
              },
              items: {
                $ref: '#/components/schemas/Tag',
                xml: {
                  name: 'tag',
                },
              },
            },
            status: {
              type: 'string',
              description: 'pet status in the store',
              enum: ['available', 'pending', 'sold'],
            },
          },
          xml: {
            name: 'pet',
          },
          type: 'object',
        },
        Category: {
          'x-swagger-router-model': 'io.swagger.petstore.model.Category',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'Dogs',
            },
          },
          xml: {
            name: 'category',
          },
          type: 'object',
        },
        Tag: {
          'x-swagger-router-model': 'io.swagger.petstore.model.Tag',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            name: {
              type: 'string',
            },
          },
          xml: {
            name: 'tag',
          },
          type: 'object',
        },
      },
    },
  };

  export const AFTER: any = {
    openapi: '3.0.2',
    servers: [
      {
        url: '/v3',
      },
    ],
    paths: {
      '/pet': {
        post: {
          tags: ['pet'],
          // it is changed 'summary'
          summary: 'CHANGED Add a new pet to the store',
          // it is changed 'description'
          description: 'CHANGED Add a new pet to the store',
          operationId: 'addPet',
          responses: {
            '200': {
              // there was deleted description here
              content: {
                'application/xml': {
                  schema: {
                    $ref: '#/components/schemas/Pet',
                  },
                },
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Pet',
                  },
                },
              },
            },
            // it is added response code = 404
            '404': {
              description: 'Not found',
            },
            '405': {
              description: 'Invalid input',
            },
          },
          // there was removed 'security' block
          requestBody: {
            // it is added description
            description: 'ADDED Create a new pet in the store Request Body Description',
            // true -> false
            required: false,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Pet',
                },
              },
              // there was deleted 'application/x-www-form-urlencoded' here
              'application/x-www-form-urlencoded': {
                schema: {
                  $ref: '#/components/schemas/Pet',
                },
              },
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        petstore_auth: {
          type: 'oauth2',
          flows: {
            implicit: {
              authorizationUrl: 'https://petstore.swagger.io/oauth/authorize',
              scopes: {
                'write:pets': 'modify pets in your account',
                'read:pets': 'read your pets',
              },
            },
          },
        },
        api_key: {
          type: 'apiKey',
          name: 'api_key',
          in: 'header',
        },
      },
      schemas: {
        Pet: {
          type: 'object',
          // it is 'required' with appended 'category'
          'x-swagger-router-model': 'io.swagger.petstore.model.Pet',
          required: ['name', 'photoUrls', 'category'],
          // it is added 'description'
          description: 'Model of pet',
          properties: {
            id: {
              type: 'integer',
              // it is changed 'format'
              format: 'Int64',
              example: 10,
            },
            name: {
              type: 'string',
              // it is example -> examples, and appended 'kitty'
              examples: ['doggie', 'kitty'],
            },
            category: {
              $ref: '#/components/schemas/Category',
            },
            photoUrls: {
              type: 'array',
              xml: {
                wrapped: true,
              },
              items: {
                type: 'string',
                xml: {
                  name: 'photoUrl',
                },
              },
            },
            tags: {
              type: 'array',
              xml: {
                wrapped: true,
              },
              items: {
                $ref: '#/components/schemas/Tag',
                xml: {
                  name: 'tag',
                },
              },
            },
            status: {
              type: 'string',
              // it is changed 'description'
              description: 'CHANGED pet status in the store',
              enum: ['available', 'pending', 'sold'],
              // it is added 'maxLength'
              maxLength: 49,
            },
          },
          xml: {
            name: 'pet',
          },
        },
        Category: {
          'x-swagger-router-model': 'io.swagger.petstore.model.Category',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'Dogs',
            },
          },
          xml: {
            name: 'category',
          },
          type: 'object',
        },
        Tag: {
          'x-swagger-router-model': 'io.swagger.petstore.model.Tag',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            name: {
              type: 'string',
            },
          },
          xml: {
            name: 'tag',
          },
          type: 'object',
        },
      },
    },
  };
}