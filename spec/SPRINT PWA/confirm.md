

# data models: confirm



DELETE

   close an account



GET

   confirm using confirmation code
   or if code==="new" create new confirmation code



PATCH

   set password or set email (also resets confirmation)



## examples



### DELETE

#### example

patron to close own account



##### request

```json
{
  "httpMethod": "DELETE",
  "path": "/confirm",
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
  "timeStamp":"1625935834245",
  "message":"account closed."
}
```



### GET

#### example

patron to confirm own account using (valid and unexpired) confirmation code `"JZEcqK8NS"`



##### request

```json
{
  "httpMethod": "GET",
  "path": "/confirm",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "951c8fa3-e9f6-44aa-aad4-304c0c5256de",
        "cognito:username": "patron",
        "cognito:groups": "patron"
      }
    }
  },
  "queryStringParameters": {
      "code": "JZEcqK8NS"
  }
}
```



##### response

```json
{
  "timeStamp": "1625939946285",
  "message": "account confirmed!"
}
```

This also

- sets the requestor account to `{ flag_confirmed: true }`



#### example

patron to request new  confirmation code



##### request

```json
{
  "httpMethod": "GET",
  "path": "/confirm",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "951c8fa3-e9f6-44aa-aad4-304c0c5256de",
        "cognito:username": "patron",
        "cognito:groups": "patron"
      }
    }
  },
  "queryStringParameters": {
      "code": "new"
  }
}
```



##### response

```json
{
  "timeStamp": "1625939637981",
  "message": "confirmation code requested"
}
```



This also

- sets the requestor account to `{ flag_confirmed: false }`
- sends an email to the requestor with the new code



### PATCH

#### example

patron set new password



##### request

```json
{
  "httpMethod": "PATCH",
  "path": "/confirm",
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
      "password": "MyNewOne"
  }
}
```



##### response

```json
{
  "timeStamp": "1625940665324",
  "message": "password updated."
}
```



#### example

patron set new email



##### request

```json
{
  "httpMethod": "PATCH",
  "path": "/confirm",
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
      "email": "newemail@larrosatek.com"
  }
}
```



##### response

```json
{
  "timeStamp": "1625940711297",
  "message": "email updated."
}
```

This also

- sets the requestor account to `{ flag_confirmed: false }`
- sends an email with a new confirmation code to the requestor



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
                },
                {
                  "type": "string",
                  "pattern": "^patron$"
                }
              ]
            }
          },
          "required": ["model", "requestor", "login", "role"]
        }
      },
      "required": ["httpMethod", "params"]
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
            "code": {
              "type": "string"
            }
          },
          "required": ["model", "requestor", "login", "role", "code"]
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
            "email": {
              "type": "string",
              "pattern": "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"
            },
            "password": {
              "type": "string",
              "pattern": "^.{6,}$"
            }
          },
          "oneOf": [
            {
              "required": ["email"]
            },
            {
              "required": ["password"]
            }
          ]
        }
      },
      "required": ["httpMethod", "params", "body"]
    }
  }
}
```

