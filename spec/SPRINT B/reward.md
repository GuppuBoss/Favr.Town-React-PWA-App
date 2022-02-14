

# data models: reward







## examples

### DELETE

merchant to remove reward by sk



#### example

##### request

```json
{
  "httpMethod": "GET",
  "path": "/reward",
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
    "sk": "WtpxsjTLC"
  }      
}
```



##### response

```json
// POST response plus { message: "reward removed" }
```



### GET

patron or merchant to get specific reward item



#### example

merchant to get own reward item by sk



##### request

```json
{
  "httpMethod": "GET",
  "path": "/reward",
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
      "sk": "WtpxsjTLC"
  }
}
```



##### response

```json
{
  "timeStamp": "1628821526900",
  "item": {
    "description": "buy one, get one",
    "favr": 2000,
    "redeem": "available at all locations except Hell's Kitchen",
    "redeem_by": 1621011905,
    "sk": "WtpxsjTLC"
  }
}
```



#### example

patron to get reward item by sk from merchant by pk



##### request

```json
{
  "httpMethod": "GET",
  "path": "/reward",
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
      "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
      "sk": "WtpxsjTLC"
  }
}
```



##### response

```json
{
  "timeStamp": "1628821526900",
  "item": {
    "description": "buy one, get one",
    "favr": 2000,
    "redeem": "available at all locations except Hell's Kitchen",
    "redeem_by": 1621011905,
    "sk": "WtpxsjTLC"
  }
}
```



### PATCH

merchant to create new or update existing reward



#### example

update existing reward by sk
(to create new, simply submit without sk)



##### request

```json
{
  "httpMethod": "PATCH",
  "path": "/reward",
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
      "sk": "WtpxsjTLC"
  },
  "body": {
    "description": "buy one, get one free",
    "favr": 2000,
    "redeem": "available at all locations except Hell's Kitchen",
    "redeem_by": 1630434828
  }
}
```



##### response

```json
// POST response

{
  "timeStamp": "1628879672589",
  "items": [
    {
      "description": "buy one, get one free",
      "favr": 2000,
      "flag_updated": 1628879673,
      "redeem": "available at all locations except Hell's Kitchen",
      "redeem_by": 1630434828,
      "sk": "WtpxsjTLC"
    }
  ],
  "flags": {
    "allow_add": true,
    "allow_remove": true
  }
}
```



### POST

merchant to list all own rewards



#### example

merchant to list all own rewards



##### request

```json
{
  "httpMethod": "POST",
  "path": "/reward",
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
  "timeStamp": "1628822685991",
  "items": [
    {
      "description": "buy one, get one",
      "favr": 2000,
      "redeem": "available at all locations except Hell's Kitchen",
      "redeem_by": 1621011905,
      "sk": "WtpxsjTLC"
    }
  ],
  "flags": {
    "allow_add": true,
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
          "properties": {
            "sk": {
              "type": "string"
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
            },
            "pk": {
              "type": "string",
              "pattern": "^merchant#"
            },
            "sk": {
              "type": "string"
            }
          },
          "required": ["model", "requestor", "login", "role", "sk"]
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
              "type": "string"
            }
          },
          "required": ["model", "requestor", "login", "role"]
        },
        "body": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "description": {
              "type": "string"
            },
            "favr": {
              "type": "number"
            },
            "redeem": {
              "type": "string"
            },
            "redeem_by": {
              "type": "number"
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
                }
              ]
            }
          },
          "required": ["model", "requestor", "login", "role"]
        },
        "body": {
          "type": "object",
          "properties": {
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
    }
  }
}
```