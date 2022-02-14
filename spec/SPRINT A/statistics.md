

# data models: statistics

get merchant's statistics



## examples

### GET

get merchant's statistics



#### example

##### request

```json
{
  "httpMethod": "GET",
  "path": "/statistics",
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
  "timeStamp": "1626487652381",
  "item": {
    "conversation": 10,
    "follower": 9,
    "joined": 1609190987,
    "like": 2,
    "news": 7,
    "patron": 9,
    "purchase": 7,
    "reward": 3,
    "suggestion": 13,
    "vote": 3
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

