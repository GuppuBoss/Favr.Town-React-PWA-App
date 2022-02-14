

# data models: survey

merchant to manage surveys
patron to view and respond



## examples

### DELETE

merchant to remove own survey item by sk



#### example

##### request

```json
{
  "httpMethod": "DELETE",
  "path": "/survey",
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
    "sk": "survey#1620408787"
  }
}
```



##### response

```json
{
  "timeStamp": "1632077698239",
  "message": "survey removed",
  "items": [],	// equal to POST result
  "flags": {}
}
```



### GET

merchant can only get own survey item
patron to get any survey item



#### example

##### request

```json
{
  "httpMethod": "GET",
  "path": "/survey",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "c272e5c2-ea69-4605-9489-816624ed731b",
        "cognito:username": "merchant",
        "cognito:groups": "merchant"
      }
    }
  },
  "queryStringParameters": {
    "id": "s_ElJ8nAx9zk"
  }
}
```



##### response

with images, no draft



```json
{
  "timeStamp": "1632180940891",
  "item": {
    "answer#tchJuLUIy": 1,
    "choices": [
      {
        "image": "https://img.favr.town/content/survey/aG__2GatILN.png",
        "text": "blue pill",
        "id": "tchJuLUIy",
        "answer_percent": 100,
        "answer_count": 1,
        "top": true
      },
      {
        "image": "https://img.favr.town/content/survey/ajv9C3SfPY.png",
        "text": "orange pill",
        "id": "tORlxig4xJ",
        "answer_percent": 0,
        "answer_count": 0
      }
    ],
    "draft": false,
    "end": 1623346178,
    "image": "https://img.favr.town/content/survey/qpX1n0N-MO.png",
    "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
    "profile": {
      "businessName": "Little Cupcake Shop",
      "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
      "url": "https://dev-app.favr.town?m=m_g56aDAS"
    },
    "question": "which one is your favorite?",
    "share_url": "https://dev-app.favr.town?s=s_ElJ8nAx9zk",
    "sk": "survey#1620408787",
    "stat_like": 0,
    "stat_new": false,
    "stat_promoted": 0,
    "stat_response": 1,
    "stat_share": 0,
    "stat_view": 0,
    "url": "https://dev-app.favr.town/surveys/s_ElJ8nAx9zk"
  },
  "flags": {
    "flag_allow_edit": false,
    "flag_allow_response": false,
    "flag_created": 1620408787,
    "flag_show_own_response": false,
    "flag_show_result": true,
    "flag_updated": 1620493843
  }
}
```



##### response

no images, draft



```json
{
  "timeStamp": "1618761073151",
  "item": {
    "choices": [
      {
        "text": "absolutely",
        "id": "CPYVQnqxD1"
      },
      {
        "text": "maybe",
        "id": "_-SQfbgBKM"
      },
      {
        "text": "nah",
        "id": "1J3U1ue8S"
      }
    ],
    "draft": true,
    "end": 1619899200,
    "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
    "profile": {
      "businessName": "Little Cupcake Shop",
      "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
      "tags": ["##BAKERY", "#BREAD", "#CUPCAKE"],
      "url": "https://dev-app.favr.town?m=m_g56aDAS"
    },
    "question": "how do you order your food?",
    "share_url": "https://dev-app.favr.town?s=s_eA5r70irwS",
    "sk": "survey#1618693620",
    "stat_like": 0,
    "stat_new": false,
    "stat_promoted": 0,
    "stat_response": 0,
    "stat_share": 0,
    "stat_view": 0,
    "url": "https://dev-app.favr.town/surveys/s_eA5r70irwS"
  },
  "flags": {
    "flag_allow_edit": true,
    "flag_allow_response": false,
    "flag_created": 1618693620,
    "flag_show_own_response": false,
    "flag_show_result": false,
    "flag_updated": 1618761073
  }
}
```



### PATCH

merchant to create/update own survey by sk



#### example

##### request

```json
{
  "httpMethod": "PATCH",
  "path": "/survey",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "c272e5c2-ea69-4605-9489-816624ed731b",
        "cognito:username": "merchant",
        "cognito:groups": "merchant"
      }
    }
  },
  "queryStringParameters": {
    "sk": "survey#1620408787"
  },
  "body": {
    "end": 1634773000
  }
}
```



##### response

```json
// same as GET
```



### POST

merchant/patron to query surveys



#### example

merchant to query own surveys

##### request

```json
{
  "httpMethod": "POST",
  "path": "/survey",
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

```json
{
  "timeStamp": "1632181566901",
  "items": [
    {
      "answer#tchJuLUIy": 1,
      "choices": [
        {
          "image": "https://img.favr.town/content/survey/ajv9C3SfPY.png",
          "text": "orange pill",
          "id": "tORlxig4xJ"
        },
        {
          "image": "https://img.favr.town/content/survey/aG__2GatILN.png",
          "text": "blue pill",
          "id": "tchJuLUIy"
        }
      ],
      "draft": false,
      "end": 1634773000,
      "flag_created": 1620408787,
      "flag_like": false,
      "flag_share": true,
      "flag_updated": 1632181394,
      "image": "https://img.favr.town/content/survey/qpX1n0N-MO.png",
      "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
      "profile": {
        "businessName": "Little Cupcake Shop",
        "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
        "url": "https://dev-app.favr.town?m=m_g56aDAS"
      },
      "question": "which one is your favorite?",
      "share_url": "https://dev-app.favr.town?s=s_ElJ8nAx9zk",
      "sk": "survey#1620408787",
      "stat_like": 0,
      "stat_new": false,
      "stat_promoted": 1,
      "stat_response": 1,
      "stat_share": 0,
      "stat_view": 0,
      "url": "https://dev-app.favr.town/surveys/s_ElJ8nAx9zk"
    },
    {
      "choices": [
        {
          "text": "absolutely",
          "id": "CPYVQnqxD1"
        },
        {
          "text": "maybe",
          "id": "_-SQfbgBKM"
        },
        {
          "text": "nah",
          "id": "1J3U1ue8S"
        }
      ],
      "draft": true,
      "end": 1619899200,
      "flag_created": 1618693620,
      "flag_remove": true,
      "flag_updated": 1618788824,
      "image": "https://img.favr.town/content/survey/qPvd8myZGy.png",
      "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
      "profile": {
        "businessName": "Little Cupcake Shop",
        "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
        "url": "https://dev-app.favr.town?m=m_g56aDAS"
      },
      "question": "how do you order your food?",
      "share_url": "https://dev-app.favr.town?s=s_eA5r70irwS",
      "sk": "survey#1618693620",
      "stat_like": 0,
      "stat_new": false,
      "stat_promoted": 0,
      "stat_response": 0,
      "stat_share": 0,
      "stat_view": 0,
      "url": "https://dev-app.favr.town/surveys/s_eA5r70irwS"
    }
  ],
  "flags": {
    "allow_create": true
  }
}
```



### PUT

patron to respond to survey



#### example

##### request

```json
{
  "httpMethod": "PUT",
  "path": "/survey",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "f905aa92-025d-4cff-8970-6863771f3af7",
        "cognito:username": "patron",
        "cognito:groups": "patron"
      }
    }
  },
  "queryStringParameters": {
    "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
    "sk": "survey#1620408787"
  },
  "body": {
    "answer_id": "tchJuLUIy"
  }
}
```



##### response

```json
{
  "timeStamp": "1632182450121",
  "message": "vote counted",
  "item": {
    "answer#tchJuLUIy": 2,
    "choices": [
      {
        "image": "https://img.favr.town/content/survey/aG__2GatILN.png",
        "text": "blue pill",
        "id": "tchJuLUIy",
        "answer_percent": 100,
        "answer_count": 2,
        "answer_own": true,
        "top": true
      },
      {
        "image": "https://img.favr.town/content/survey/ajv9C3SfPY.png",
        "text": "orange pill",
        "id": "tORlxig4xJ",
        "answer_percent": 0,
        "answer_count": 0
      }
    ],
    "draft": false,
    "end": 1634773000,
    "image": "https://img.favr.town/content/survey/qpX1n0N-MO.png",
    "own_response": "tchJuLUIy",
    "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
    "profile": {
      "businessName": "Little Cupcake Shop",
      "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
      "url": "https://dev-app.favr.town?m=m_g56aDAS"
    },
    "question": "which one is your favorite?",
    "share_url": "https://dev-app.favr.town?s=s_ElJ8nAx9zk",
    "sk": "survey#1620408787",
    "stat_like": 0,
    "stat_new": false,
    "stat_promoted": 1,
    "stat_response": 2,
    "stat_share": 0,
    "stat_view": 0,
    "url": "https://dev-app.favr.town/surveys/s_ElJ8nAx9zk"
  },
  "favr": {
    "favr": 0,
    "favr_town": 100,
    "favr_following": 150
  },
  "flags": {
    "flag_allow_edit": false,
    "flag_allow_response": false,
    "flag_created": 1620408787,
    "flag_show_own_response": true,
    "flag_show_result": true,
    "flag_updated": 1632181394
  }
}
```



## pagination

Lists are returned paginated as `{ items: [] }`.

If additional pages are available, the result will include "LastEvaluatedKey":
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
            "sk": {
              "type": "string",
              "pattern": "^survey#"
            }
          },
          "required": ["sk"]
        }
      },
      "required": ["httpMethod", "params", "body"]
    },
    "GET": {
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
                  "pattern": "^merchant$"
                },
                {
                  "type": "string",
                  "pattern": "^patron$"
                }
              ]
            },
            "id": {
              "type": "string",
              "minLength": 2
            }
          },
          "required": ["model", "requestor", "login", "role", "id"]
        }
      },
      "required": ["httpMethod", "params"]
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
            },
            "sk": {
              "type": "string",
              "pattern": "^survey#"
            }
          },
          "required": ["model", "requestor", "login", "role"]
        },
        "body": {
          "type": "object",
          "properties": {
            "question": {
              "type": "string"
            },
            "image": {
              "type": ["string", "null"],
              "minLength": 2
            },
            "end": {
              "type": "number"
            },
            "rule_response": {
              "type": "number"
            },
            "choices": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "text": {
                    "type": "string"
                  },
                  "image": {
                    "type": ["string", "null"],
                    "minLength": 2
                  }
                }
              }
            },
            "draft": {
              "type": "boolean"
            }
          }
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
                  "pattern": "^merchant$"
                },
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
          "properties": {
            "merchant_pk": {
              "type": "string",
              "pattern": "^merchant#"
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
            },
            "pk": {
              "type": "string",
              "pattern": "^merchant#"
            },
            "sk": {
              "type": "string",
              "pattern": "^survey#"
            }
          },
          "required": ["model", "requestor", "login", "role", "pk", "sk"]
        },
        "body": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "answer_id": {
              "type": "string"
            }
          },
          "required": ["answer_id"]
        }
      },
      "required": ["httpMethod", "params", "body"]
    }
  }
}
```

If the user scrolls down on the list view, the client should request the next page by calling `/action POST` with `{ body: { limit: number, ExclusiveStartKey: LastEvaluatedKey }}`, and merge the result into the table.



## event definition

```json

```