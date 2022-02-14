

# data models: rule

manage merchant's rules



## examples

### GET

get merchant's rules



#### example

##### request

```json
{
  "httpMethod": "GET",
  "path": "/rule",
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
  "timeStamp": "1626489278778",
  "item": {
    "rule_like": 20,
    "rule_purchase": 250,
    "rule_welcome": 100
  },
  "flags": {
    "flag_defaults": {
      "rule_birthday": {
        "default": 100,
        "source": [
          0,
          10,
          20,
          50,
          100,
          250,
          500,
          1000
        ]
      },
      "rule_like": {
        "default": 10,
        "source": [
          0,
          10,
          20,
          50,
          100
        ]
      },
      "rule_purchase": {
        "default": 10,
        "source": [
          0,
          10,
          50,
          100,
          250,
          500,
          1000
        ]
      },
      "rule_share": {
        "default": 10,
        "source": [
          0,
          10,
          20,
          50,
          100
        ]
      },
      "rule_suggest": {
        "default": 10,
        "source": [
          0,
          10,
          20,
          50,
          100,
          250
        ]
      },
      "rule_vote": {
        "default": 10,
        "source": [
          0,
          10,
          20,
          50,
          100,
          250,
          500,
          1000
        ]
      },
      "rule_welcome": {
        "default": 100,
        "source": [
          0,
          10,
          50,
          100,
          250,
          1000
        ]
      }
    }
  }
}
```



### PATCH

update merchant's "rule_purchase" value



#### example

##### request

```json
{
  "httpMethod": "PATCH",
  "path": "/rule",
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
      "rule_purchase": 500
  }
}
```



##### response

```json
{
  "timeStamp": "1626538465752",
  "item": {
    "rule_like": 20,
    "rule_purchase": 500,
    "rule_welcome": 100
  },
  "flags": {
    "flag_confirmed": true,
    "flag_created": 1609190987,
    "flag_defaults": {
      "rule_birthday": {
        "default": 100,
        "source": [
          0,
          10,
          20,
          50,
          100,
          250,
          500,
          1000
        ]
      },
      "rule_like": {
        "default": 10,
        "source": [
          0,
          10,
          20,
          50,
          100
        ]
      },
      "rule_purchase": {
        "default": 10,
        "source": [
          0,
          10,
          50,
          100,
          250,
          500,
          1000
        ]
      },
      "rule_share": {
        "default": 10,
        "source": [
          0,
          10,
          20,
          50,
          100
        ]
      },
      "rule_suggest": {
        "default": 10,
        "source": [
          0,
          10,
          20,
          50,
          100,
          250
        ]
      },
      "rule_vote": {
        "default": 10,
        "source": [
          0,
          10,
          20,
          50,
          100,
          250,
          500,
          1000
        ]
      },
      "rule_welcome": {
        "default": 100,
        "source": [
          0,
          10,
          50,
          100,
          250,
          1000
        ]
      }
    }
  }
}
```



## event definition

```json
{
  "event": {
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
            }
          },
          "required": ["model", "requestor", "login", "role"]
        },
        "body": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "rule_welcome": {
              "type": "number",
              "minimum": 0
            },
            "rule_purchase": {
              "type": "number",
              "minimum": 0
            },
            "rule_sharing": {
              "type": "number",
              "minimum": 0
            },
            "rule_suggestion": {
              "type": "number",
              "minimum": 0
            },
            "rule_vote": {
              "type": "number",
              "minimum": 0
            },
            "rule_response": {
              "type": "number",
              "minimum": 0
            },
            "rule_birthday": {
              "type": "number",
              "minimum": 0
            }
          }
        }
      },
      "required": ["httpMethod", "params", "body"]
    }
  }
}
```

