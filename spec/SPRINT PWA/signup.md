

# data models: signup

- check businessName/login/email availability
- handle forgot password



## examples

### POST

check businessName/login/email availability



#### example

Merchant to check availability of `businessName`



##### request

```json
{
  "httpMethod": "POST",
  "path": "/signup",
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
    "businessName": "favr.town"
  }
}
```



##### response

(provided name is available)

```json
{
  "timeStamp": "1625935136345",
  "item": {
    "businessName": true
  }
}
```



(provided name is not available)

```json
{
  "timeStamp": "1625935136345",
  "item": {
    "businessName": false
  }
}
```



#### example

Patron to check availability of `login` and `email`



##### request

```json
{
  "httpMethod": "POST",
  "path": "/signup",
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
    "login": "cupcake",
    "email": "patron@larrosatek.com"
  }
}
```



##### response

(email is not available, login is available)

```json
{
  "timeStamp": "1625935497572",
  "item": {
    "email": false,
    "login": true
  }
}
```



### PUT

handle forgot password



#### example

Call "forgot password" with patron's email



##### request

```json
{
  "httpMethod": "PUT",
  "path": "/signup",
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
    "email": "patron@larrosatek.com"
  }
}
```



##### response

```json
{
  "timeStamp":"1625935834245",
  "message":"temporary password sent!"
}
```



This also

- sets a new password for the account
- sends an email with the password to the provided address




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
            }
          },
          "required": ["model"]
        },
        "body": {
          "type": "object",
          "properties": {
            "businessName": {
              "type": "string",
              "pattern": "^.{4,}$"
            },
            "login": {
              "type": "string",
              "pattern": "^.{4,}$"
            },
            "email": {
              "type": "string",
              "pattern": "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"
            }
          },
          "anyOf": [
            {
              "required": ["login"]
            },
            {
              "required": ["email"]
            },
            {
              "required": ["businessName"]
            }
          ]
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
            }
          },
          "required": ["model"]
        },
        "body": {
          "oneOf": [
            {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "login": {
                  "type": "string",
                  "pattern": "^.{4,}$"
                }
              },
              "required": ["login"]
            },
            {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "email": {
                  "type": "string",
                  "pattern": "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"
                }
              },
              "required": ["email"]
            }
          ]
        }
      },
      "required": ["httpMethod", "params", "body"]
    }
  }
}

```

