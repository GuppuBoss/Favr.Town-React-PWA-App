

# data models: suggestion

patron to submit a suggestion
merchant to review, manage, and respond



## examples

### DELETE

merchant to remove suggestion by pk, sk



#### example

##### request

```json
{
  "httpMethod": "DELETE",
  "path": "/suggestion",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "c272e5c2-ea69-4605-9489-816624ed731b",
        "cognito:username": "merchant",
        "cognito:groups": "merchant"
      }
    }
  },
  "queryStringParameters": {},
  "body": {
    "pk": "patron#f905aa92-025d-4cff-8970-6863771f3af7",
    "sk": "suggestion#1632074232#c272e5c2-ea69-4605-9489-816624ed731b"
  }
}
```



##### response

```json
{
  "timeStamp": "1632077698239",
  "message": "suggestion removed",
  "items": [],	// other suggestions equal to POST result
  "flags": {
    "allow_create": false,
    "allow_like": false,
    "allow_modify": false,
    "allow_remove": false,
    "allow_share": false
  }
}
```



### PATCH

merchant to respond to suggestion by pk, sk



#### example

##### request

```json
{
  "httpMethod": "PATCH",
  "path": "suggestion",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "c272e5c2-ea69-4605-9489-816624ed731b",
        "cognito:username": "merchant",
        "cognito:groups": "merchant"
      }
    }
  },
  "queryStringParameters": {},
  "body": {
    "pk": "patron#f905aa92-025d-4cff-8970-6863771f3af7",
    "sk": "suggestion#1632077812#c272e5c2-ea69-4605-9489-816624ed731b",
    "comment": "winter is coming.."
  }
}
```



##### response

```json
{
  "timeStamp": "1632080499169",
  "item": {
    "cid": "1632077812d6llz4AZs",
    "comment": "winter is coming..",
    "pk": "patron#f905aa92-025d-4cff-8970-6863771f3af7",
    "profile": {
      "login": "patron",
      "url": "https://dev-app.favr.town/p_nkEwrrjJ2m"
    },
    "sk": "suggestion#1632077812#c272e5c2-ea69-4605-9489-816624ed731b",
    "stat_like": 0,
    "stat_new": true,
    "stat_share": 0,
    "stat_view": 0,
    "suggestion": "can you bring back pumpkin spice?"
  },
  "flags": {
    "allow_create": false,
    "allow_like": false,
    "allow_modify": true,
    "allow_remove": true,
    "allow_share": true,
    "flag_created": 1632077812,
    "flag_updated": 1632080499
  }
}
```



### POST

patron or merchant to query suggestions



#### example

merchant to query all suggestions



##### request

```json
{
  "httpMethod": "POST",
  "path": "/suggestion",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "c272e5c2-ea69-4605-9489-816624ed731b",
        "cognito:username": "merchant",
        "cognito:groups": "merchant"
      }
    }
  },
  "queryStringParameters": {},
  "body": {}
}
```



##### response

no items yet

```json
{
  "timeStamp": "1631732289871",
  "items": [],
  "flags": {
    "allow_create": false,
    "allow_like": false,
    "allow_modify": false,
    "allow_remove": false,
    "allow_share": false
  }
}
```



##### response

list of items

```json
{
  "timeStamp": "1632077270353",
  "items": [
    {
      "cid": "16320742324NIcRCwKz",
      "flag_created": 1632074232,
      "flag_updated": 1632074232,
      "pk": "patron#f905aa92-025d-4cff-8970-6863771f3af7",
      "profile": {
        "login": "patron",
        "url": "https://dev-app.favr.town/p_nkEwrrjJ2m"
      },
      "sk": "suggestion#1632077812#c272e5c2-ea69-4605-9489-816624ed731b",
      "stat_like": 0,
      "stat_new": true,
      "stat_share": 0,
      "stat_view": 0,
      "suggestion": "can you bring back pumpkin spice?"
    }
  ],
  "flags": {
    "allow_create": false,
    "allow_like": false,
    "allow_modify": true,
    "allow_remove": true,
    "allow_share": true
  }
}
```



### PUT

patron to submit a suggestion



#### example

##### request

```json
{
  "httpMethod": "PUT",
  "path": "/suggestion",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "f905aa92-025d-4cff-8970-6863771f3af7",
        "cognito:username": "patron",
        "cognito:groups": "patron"
      }
    }
  },
  "queryStringParameters": {},
  "body": {
    "merchant_pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
    "suggestion": "can you bring back pumpkin spice?"
  }
}
```



##### response

```json
{
  "timeStamp": "1632077812659",
  "message": "suggestion sent",
  "items": [
    {
      "cid": "1632077812d6llz4AZs",
      "flag_created": 1632077812,
      "flag_updated": 1632077812,
      "merchant_pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
      "pk": "patron#f905aa92-025d-4cff-8970-6863771f3af7",
      "profile": {
        "login": "patron",
        "url": "https://dev-app.favr.town/p_nkEwrrjJ2m"
      },
      "sk": "suggestion#1632077812#c272e5c2-ea69-4605-9489-816624ed731b",
      "stat_like": 0,
      "stat_new": true,
      "stat_share": 0,
      "stat_view": 0,
      "suggestion": "can you bring back pumpkin spice?"
    }
  ],
  "favr": {
    "favr_following": 100
  },
  "flags": {
    "allow_create": true,
    "allow_like": true,
    "allow_modify": false,
    "allow_remove": false,
    "allow_share": true
  }
}
```



## pagination

Lists are returned paginated as `{ items: [] }`.

If additional pages are available, the result will include "LastEvaluatedKey":
```json

```

If the user scrolls down on the list view, the client should request the next page by calling `/action POST` with `{ body: { limit: number, ExclusiveStartKey: LastEvaluatedKey }}`, and merge the result into the table.



## event definition

```json
{
  "event": {
    "DELETE": {
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
              "type": "string",
              "minLength": 4
            },
            "role": {
              "oneOf": [
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
      "required": ["httpMethod", "params", "body"]
    },
    "PATCH": {
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
              "type": "string",
              "minLength": 4
            },
            "role": {
              "oneOf": [
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
          "additionalProperties": false,
          "properties": {
            "comment": {
              "type": "string",
              "minLength": 2,
              "maxLength": 250
            },
            "pk": {
              "type": "string"
            },
            "sk": {
              "type": "string",
              "pattern": "^suggestion#"
            }
          },
          "required": ["pk", "sk", "comment"]
        }
      },
      "required": ["httpMethod", "params", "body"]
    },
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
              "type": "string",
              "minLength": 4
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
            "id": {
              "type": "string"
            },
            "patron_pk": {
              "type": "string"
            },
            "merchant_pk": {
              "type": "string"
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
              "type": "string",
              "minLength": 4
            },
            "role": {
              "oneOf": [
                {
                  "type": "string",
                  "pattern": "^patron$"
                }
              ]
            }
          },
          "required": ["model", "requestor", "login", "role"]
        },
        "body": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "merchant_pk": {
              "type": "string"
            },
            "suggestion": {
              "type": "string",
              "minLength": 2,
              "maxLength": 250
            }
          },
          "required": ["merchant_pk", "suggestion"]
        }
      },
      "required": ["httpMethod", "params", "body"]
    }
  }
}
```