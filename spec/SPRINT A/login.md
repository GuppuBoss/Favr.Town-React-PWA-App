

# data models: login

merchant to manage location logins



## examples

### DELETE

merchant remove own location by id
	returns `/location POST with body: { id: id }` result



#### example

##### request

```json
{
  "httpMethod": "DELETE",
  "path": "/login",
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
      "id": 1617158268
  }
}
```



##### response

```json
{
  "timeStamp": "1626626176706",
  "message": "location login updated!",
  "item": {
    "about": "urban legend in enterprise architecture",
    "businessName": "LarrosaTek Inc",
    "city": "New York",
    "id": 1617158268,
    "state": "NY",
    "street": "1200 5th Ave",
    "zip": "10035"
  },
  "flags": {
    "allow_remove": true
  }
}
```



### PATCH

merchant create/update own location by id



#### example

##### request

```json
{
  "httpMethod": "PATCH",
  "path": "/login",
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
      "id": 1617158268,
      "login": "qqloc",
      "email": "qqloc@larrosatek.com",
      "password": "qqloc1"
  }
}
```



##### response

```json
{
  "timeStamp": "1626624803708",
  "message": "location login updated!",
  "item": {
    "about": "urban legend in enterprise architecture",
    "businessName": "LarrosaTek Inc",
    "city": "New York",
    "email": "qqloc@larrosatek.com",
    "id": 1617158268,
    "login": "qqloc",
    "profile": "location#161b2860-c36d-4786-81db-ae3f10320482",
    "state": "NY",
    "street": "1200 5th Ave",
    "zip": "10035"
  },
  "flags": {
    "allow_remove": true
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
            "id": {
              "type": "number"
            }
          },
          "required": ["id"]
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
          "oneOf": [
            {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "id": {
                  "type": "number"
                },
                "login": {
                  "type": "string",
                  "minLength": 4
                },
                "password": {
                  "type": "string",
                  "pattern": "^.{6,}$"
                },
                "email": {
                  "type": "string",
                  "pattern": "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"
                }
              },
              "required": ["id", "login", "password", "email"]
            },
            {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "id": {
                  "type": "number"
                },
                "login": {
                  "type": "string",
                  "minLength": 4
                },
                "password": {
                  "type": "string",
                  "pattern": "^.{6,}$"
                }
              },
              "required": ["id", "login", "password"]
            }
          ]
        }
      },
      "required": ["httpMethod", "params", "body"]
    }
  }
}
```

