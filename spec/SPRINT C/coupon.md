

# data models: coupon

patron to manage own coupon book



## examples

### DELETE

patron to remove coupon by id from coupon book



#### example

##### request

```json
{
  "httpMethod": "DELETE",
  "path": "/coupon",
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
    "id": 1619472740123
  }
}
```



##### response

```json
// POST result
```



### POST

patron to get own coupon book



#### example

##### request

```json
{
  "httpMethod": "POST",
  "path": "/coupon",
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
  "timeStamp": "1629132342547",
  "items": [
    {
      "flag_allow_redeem": false,
      "flag_allow_remove": true,
      "id": 1619472740123,
      "image": "https://img.favr.town/content/news/nUhRL_HU8.png",
      "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
      "profile": {
        "about": "Little Cupcake Shop is a Gourmet Bakery in New York City. Our products include specialty cupcakes including spicy pumpkin, green tea, and chocolate cupcakes. We have been been around since 1998.",
        "businessName": "Little Cupcake Shop",
        "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
        "url": "https://dev-app.favr.town?m=m_g56aDAS"
      },
      "redeem": "available at our UES and Hell's Kitchen locations",
      "redeem_by": 1627725807,
      "share_url": "https://dev-app.favr.town/news/n_ce8EyKqoiN",
      "sk": "news#1619471258",
      "stat_like": 0,
      "stat_share": 0,
      "text": "Buy 1 get 2 limited event!",
      "type": "coupon",
      "url": "https://littlecupcakeshop.com"
    }
  ],
  "flags": {
    "allow_add": true,
    "allow_remove": true
  }
}
```



### PUT

patron to add coupon by pk, sk to coupon book



#### example

##### request

```json
{
  "httpMethod": "PUT",
  "path": "/coupon",
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
    "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
    "sk": "news#1619471258"
  }
}
```



##### response

```json
// POST result
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
            "id": {
              "type": "number"
            }
          },
          "required": ["id"]
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
              "type": "string"
            },
            "role": {
              "oneOf": [
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
              "type": "string"
            },
            "role": {
              "oneOf": [
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
            "pk": {
              "type": "string",
              "pattern": "^merchant#"
            },
            "sk": {
              "type": "string"
            }
          },
          "required": ["pk", "sk"]
        }
      },
      "required": ["httpMethod", "params", "body"]
    }
  }
}
```