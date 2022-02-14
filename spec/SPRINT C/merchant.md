

# data models: merchant

patron to manage followed merchants



## examples

### DELETE

patron to unfollow a merchant



#### example

##### request

```json
{
  "httpMethod": "DELETE",
  "path": "/merchant",
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
    "merchant_pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b"
  }
}
```



##### response

```json
// GET result
```



### GET

patron to get merchant by id, with option to follow



#### example

##### request

```json
{
  "httpMethod": "GET",
  "path": "/merchant",
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
    "id": "m_g56aDAS"
  },
  "body": {}
}
```



##### response

In this example, the patron is following the merchant

```json
{
  "timeStamp": "1629227569565",
  "item": {
    "about": "Little Cupcake Shop is a Gourmet Bakery in New York City. Our products include specialty cupcakes including spicy pumpkin, green tea, and chocolate cupcakes. We have been been around since 1998.",
    "businessName": "Little Cupcake Shop",
    "favr": 600,
    "lanes": [
      "BAKERY",
      "BAKERY/BREAD",
      "BAKERY/CUPCAKE"
    ],
    "logo": "https://img.favr.town/content/logo/-6AZrBmGK.png",
    "my_store": {
      "id": 1617158268,
      "store": "LarrosaTek Inc\n1200 5th Ave\nNew York, NY 10035"
    },
    "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
    "rule_rewards": [
      {
        "favr": 2000,
        "sk": "WtpxsjTLC",
        "description": "buy one, get one free",
        "redeem_by": 1630434828,
        "redeem": "available at all locations except Hell's Kitchen",
        "percent": 30,
        "url": "https://dev-app.favr.town/qr?merchant_pk=c272e5c2-ea69-4605-9489-816624ed731b&reward=WtpxsjTLC"
      }
    ],
    "share_url": "https://dev-app.favr.town?m=m_g56aDAS",
    "sk": "profile",
    "stat_follower": 9,
    "stat_like": 2,
    "stat_suggestion": 13,
    "stat_vote": 3,
    "tags": [
      "##BAKERY",
      "#BREAD",
      "#CUPCAKE"
    ],
    "url": "https://dev-app.favr.town/merchants/m_g56aDAS",
    "url_action": "https://dev-app.favr.town/action?merchant_pk=c272e5c2-ea69-4605-9489-816624ed731b",
    "url_conversation": "https://dev-app.favr.town/conversation?merchant_pk=c272e5c2-ea69-4605-9489-816624ed731b",
    "url_news": "https://dev-app.favr.town/news?merchant_pk=c272e5c2-ea69-4605-9489-816624ed731b",
    "url_suggest": "https://dev-app.favr.town/suggestions/merchant_pk=c272e5c2-ea69-4605-9489-816624ed731b",
    "url_vote": "https://dev-app.favr.town/surveys/merchant_pk=c272e5c2-ea69-4605-9489-816624ed731b"
  },
  "flags": {
    "following": true
  }
}
```



### POST

patron to lookup merchant by businessName, or by lane, or by lane+specialty



#### example

patron to lookup merchant by businessName

##### request

```json
{
  "httpMethod": "POST",
  "path": "/merchant",
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
    "businessName": "little"
  }
}
```



##### response

```json
{
  "timeStamp": "1629228066170",
  "items": [
    {
      "businessName": "Little Cupcake Shop",
      "logo": "https://img.favr.town/content/logo/-6AZrBmGK.png",
      "tags": [
        "##BAKERY",
        "#BREAD",
        "#CUPCAKE"
      ],
      "url": "https://dev-app.favr.town/merchants/m_g56aDAS"
    }
  ]
}
```



#### example

patron to lookup merchant by lane

##### request

```json
{
  "httpMethod": "POST",
  "path": "/merchant",
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
    "lane": "BAKERY"
  }
}
```



##### response

```json
// POST result
```



#### example

patron to lookup merchant by lane+specialty

##### request

```json
{
  "httpMethod": "POST",
  "path": "/merchant",
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
    "lane": "BAKERY",
    "specialty": "BREAD"
  }
}
```



##### response

```json
// POST result
```



### PUT

patron to request a merchant to be added to favr.town



#### example

##### request

```json
{
  "httpMethod": "PUT",
  "path": "/merchant",
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
    "businessName": "LoveMaze",
    "website": "https://thelovemaze.com",
    "lanes": ["DATING", "EVENTS"],
    "email": "hello@thelovemaze.com"
  }
}
```



##### response

```json
{
  "timeStamp": "1629228950371",
  "message": "request sent!"
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
          },
          "required": ["merchant_pk"]
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
                  "pattern": "^patron$"
                }
              ]
            },
            "id": {
              "type": "string",
              "minLength": 2
            },
            "follow": {
              "type": "string"
            }
          },
          "required": ["model", "requestor", "login", "role", "id"]
        }
      },
      "required": ["httpMethod", "params"]
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
            "type": {
              "oneOf": [
                {
                  "type": "string",
                  "pattern": "^following$"
                }
              ]
            },
            "businessName": {
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
            },
            "ExclusiveStartKey": {
              "type": "object"
            },
            "limit": {
              "type": "number"
            }
          },
          "anyOf": [
            {
              "required": ["type"]
            },
            {
              "required": ["businessName"]
            },
            {
              "required": ["lane"]
            },
            {
              "required": ["lane", "specialty"]
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
            "businessName": {
              "type": "string",
              "pattern": "^.{3,}$"
            },
            "website": {
              "type": "string",
              "pattern": "^https?://"
            },
            "lanes": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "email": {
              "type": "string",
              "pattern": "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"
            }
          },
          "required": ["businessName", "lanes", "email"]
        }
      },
      "required": ["httpMethod", "params", "body"]
    }
  }
}
```