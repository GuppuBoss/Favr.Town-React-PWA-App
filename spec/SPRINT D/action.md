

# data models: action

query or request actions



## examples

### POST

query actions



#### example

patron to query own actions



##### request

```json
{
  "httpMethod": "POST",
  "path": "/action",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "951c8fa3-e9f6-44aa-aad4-304c0c5256de",
        "cognito:username": "patron",
        "cognito:groups": "patron"
      }
    }
  },
  "queryStringParameters": {},
  "body": {}
}
```



##### response

```json
{
  "timeStamp": "1629758963115",
  "items": [
    {
      "text": "sent a suggestion to Little Cupcake Shop",
      "time": 1620406625,
      "type": "suggestion",
      "url": "https://dev-app.favr.town/merchants/m_g56aDAS"
    },
    {
      "text": "started following Little Cupcake Shop",
      "time": 1619192857,
      "type": "follow",
      "url": "https://dev-app.favr.town/merchants/m_g56aDAS"
    }
  ]
}
```



### PUT

patron to share a news item



#### example

##### request

```json

```



##### response

```json

```



## pagination

Lists are returned paginated as `{ items: [] }`.

If additional pages are available, the result will include "LastEvaluatedKey", example ("action" data model):
```json
{
  "timeStamp": "1616350970359",
  "items": [
    {
      "text": "qqanny made a purchase",
      "time": 1613531492,
      "type": "purchase",
      "url": "https://app.favr.town/patrons/p_abcdefg"
    },
    {
      "text": "qqanny started following",
      "time": 1611612137,
      "type": "follow",
      "url": "https://app.favr.town/patrons/p_abcdefg"
    }
  ],
  "LastEvaluatedKey": {
    "gsi_2_sk": "purchase#1613531492#951c8fa3-e9f6-44aa-aad4-304c0c5256de",
    "sk": "action#1613531492#vU-bMae-I",
    "gsi_2_pk": "action#c272e5c2-ea69-4605-9489-816624ed731b",
    "pk": "patron#951c8fa3-e9f6-44aa-aad4-304c0c5256de"
  }
}
```

If the user scrolls down on the list view, the client should request the next page by calling `/action POST` with `{ body: { limit: number, ExclusiveStartKey: LastEvaluatedKey }}`, and merge the result into the table.



## event definition

```json
{
  "event": {
    "POST": {
      "type": "object",
      "properties": {
        "httpMethod": {
          "type": "string"
        },
        "params": {
          "type": "object",
          "properties": {
            "model": {
              "type": "string"
            },
            "requestor": {
              "type": "string"
            },
            "login": {
              "type": "string"
            },
            "role": {
              "oneOf": [
                {
                  "type": "string",
                  "pattern": "^patron$"
                },
                {
                  "type": "string",
                  "pattern": "^merchant$"
                }
              ]
            }
          },
          "required": ["model", "requestor", "login", "role"]
        },
        "body": {
          "type": "object",
          "properties": {
            "patron_pk": {
              "type": "string",
              "minLength": 2
            },
            "merchant_pk": {
              "type": "string",
              "minLength": 2
            },
            "ExclusiveStartKey": {
              "type": "object"
            },
            "limit": {
              "type": "number"
            }
          }
        }
      },
      "required": ["httpMethod", "params", "body"]
    },
    "PUT": {
      "type": "object",
      "properties": {
        "httpMethod": {
          "type": "string"
        },
        "params": {
          "type": "object",
          "properties": {
            "model": {
              "type": "string"
            },
            "requestor": {
              "type": "string"
            },
            "login": {
              "type": "string"
            },
            "role": {
              "oneOf": [
                {
                  "type": "string",
                  "pattern": "^patron$"
                },
                {
                  "type": "string",
                  "pattern": "^merchant$"
                }
              ]
            }
          },
          "required": ["model", "requestor", "login", "role"]
        },
        "body": {
          "oneOf": [
            {
              "type": "object",
              "properties": {
                "like": {
                  "type": "object",
                  "properties": {
                    "pk": {
                      "type": "string"
                    },
                    "sk": {
                      "type": "string"
                    }
                  },
                  "required": ["pk", "sk"]
                }
              },
              "required": ["like"]
            },
            {
              "type": "object",
              "properties": {
                "share": {
                  "type": "object",
                  "properties": {
                    "pk": {
                      "type": "string"
                    },
                    "sk": {
                      "type": "string"
                    },
                    "required": ["pk", "sk"]
                  }
                }
              },
              "required": ["share"]
            },
            {
              "type": "object",
              "properties": {
                "report": {
                  "type": "object",
                  "properties": {
                    "pk": {
                      "type": "string"
                    },
                    "sk": {
                      "type": "string"
                    },
                    "details": {
                      "type": "string",
                      "minLength": 4
                    }
                  },
                  "required": ["pk", "sk", "details"]
                }
              },
              "required": ["report"]
            }
          ]
        }
      },
      "required": ["httpMethod", "params", "body"]
    }
  }
}
```