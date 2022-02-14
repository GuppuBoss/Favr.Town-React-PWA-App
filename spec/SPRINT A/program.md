

# data models: program

get merchant's program



## examples

### GET

get merchant's program



#### example

##### request

```json
{
  "httpMethod": "GET",
  "path": "/program",
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
  "timeStamp": "1626539982554",
  "item": {
    "news": {
      "complete": true,
      "updated": 1620413601
    },
    "rewards": {
      "complete": true
    },
    "rules": {
      "complete": true
    },
    "statistics": {
      "count": 0
    },
    "suggestions": {
      "complete": false,
      "new": false
    },
    "survey": {
      "complete": true,
      "new": false,
      "updated": 1620408787
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
    }
  }
}
```

