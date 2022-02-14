

# data models: lane

merchant to manage own lanes



## examples

### DELETE

merchant remove lane/specialty



#### example

##### request

```json
{
  "httpMethod": "DELETE",
  "path": "/lane",
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
      "remove": "BAKERY/DONUT"
  }
}
```



alternatively:

```json
{
  "httpMethod": "DELETE",
  "path": "/lane",
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
      "lane": "BAKERY",
      "specialty": "DONUT"
  }
}
```



##### response

```json
{
  "timeStamp": "1626637807144",
  "item": {
    "lanes": [
      "BAKERY",
      "BAKERY/BREAD",
      "BAKERY/CUPCAKE"
    ]
  },
  "flags": {
    "flag_allow_add": true,
    "flag_allow_remove": true
  }
}
```



### GET

merchant to get lanes
  (lanes are also included with `/profile GET`)



#### example

##### request

```json
{
  "httpMethod": "GET",
  "path": "/lane",
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
  "timeStamp": "1626637807144",
  "item": {
    "lanes": [
      "BAKERY",
      "BAKERY/BREAD",
      "BAKERY/CUPCAKE",
      "BAKERY/DONUT"
    ]
  },
  "flags": {
    "flag_allow_add": true,
    "flag_allow_remove": true
  }
}
```



### PATCH

merchant to add lane/specialty



#### example

##### request

```json
{
  "httpMethod": "PATCH",
  "path": "/lane",
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
      "lane": "BAKERY",
      "specialty": "DONUT"
  }
}
```



##### response

```json
{
  "timeStamp": "1626637807144",
  "item": {
    "lanes": [
      "BAKERY",
      "BAKERY/BREAD",
      "BAKERY/CUPCAKE",
      "BAKERY/DONUT"
    ]
  },
  "flags": {
    "flag_allow_add": true,
    "flag_allow_remove": true
  }
}
```



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
              "type": "string"
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
            "remove": {
              "type": "string",
              "pattern": "^.{2,}$"
            },
            "lane": {
              "type": "string",
              "pattern": "^.{2,}$"
            },
            "specialty": {
              "type": "string",
              "pattern": "^.{2,}$"
            }
          },
          "required": ["lane"]
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
                }
              ]
            }
          },
          "required": ["model", "requestor", "login", "role"]
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
              "type": "string"
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
            "lane": {
              "type": "string",
              "pattern": "^\\S+[a-zA-Z_]{1,30}\\S$"
            },
            "specialty": {
              "type": "string",
              "pattern": "^\\S+[a-zA-Z_]{1,30}\\S$"
            }
          },
          "required": ["lane"]
        }
      },
      "required": ["httpMethod", "params", "body"]
    }
  }
}
```

