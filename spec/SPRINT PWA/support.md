

# data models: support

request support



## examples

### PUT

request support



#### example

##### request

```json
{
  "httpMethod": "PUT",
  "path": "/support",
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
  "body": {
    "message": "is this thing on?"
  }
}
```



##### response

```json
{
  "timeStamp": "1625947573181",
  "message": "request sent!"
}
```

This also

- sends an email to `"support@favr.town"` with the user's request message (and optional url)



## event definition

```json
{
  "event": {
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
                  "pattern": "^location$"
                },
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
          "additionalProperties": false,
          "properties": {
            "url": {
              "type": "string",
              "pattern": "^https?://"
            },
            "message": {
              "type": "string",
              "minLength": 2,
              "maxLength": 500
            }
          },
          "required": ["message"]
        }
      },
      "required": ["httpMethod", "params", "body"]
    }
  }
}
```