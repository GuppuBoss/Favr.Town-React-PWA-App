

# data models: news

merchant: manage and query news items
patron: query items, clip coupons



## examples

### DELETE

merchant to remove own new item by sk



#### example

##### request

```json
{
  "httpMethod": "DELETE",
  "path": "/news",
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
    "sk": "news#1618700809"
  }
}
```



##### response

```json
// returns POST, plus message
```



### PATCH

merchant to create/update own news item (or coupon)



#### example

merchant to update existing item by sk

##### request

```json
{
  "httpMethod": "PATCH",
  "path": "/news",
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
    "sk": "news#1619471258"
  },
  "body": {
    "redeem_by": 1633017600
  }
}
```



##### response

```json
{
  "timeStamp": "1631204423902",
  "item": {
    "image": "https://img.favr.town/content/news/nUhRL_HU8.png",
    "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
    "profile": {
      "about": "Little Cupcake Shop is a Gourmet Bakery in New York City. Our products include specialty cupcakes including spicy pumpkin, green tea, and chocolate cupcakes. We have been been around since 1998.",
      "businessName": "Little Cupcake Shop",
      "gsi_1_pk": "m_g56aDAS",
      "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
      "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
      "sk": "profile",
      "url": "https://dev-app.favr.town?m=m_g56aDAS"
    },
    "redeem": "available at our UES and Hell's Kitchen locations",
    "redeem_by": 1633017600,
    "share_url": "https://dev-app.favr.town/news/n_ce8EyKqoiN",
    "sk": "news#1619471258",
    "stat_like": 0,
    "stat_share": 0,
    "text": "Buy 1 get 2 limited event!",
    "type": "coupon",
    "url": "https://littlecupcakeshop.com"
  },
  "flags": {
    "allow_add": true,
    "allow_modify": true,
    "allow_remove": true,
    "allow_share": true,
    "flag_updated": 1631204424
  }
}
```



### POST

query news items



#### example

patron to query news items (any)



##### request

```json
{
  "httpMethod": "POST",
  "path": "/news",
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
  "body": {  }
}
```



##### response

```json
{
  "timeStamp": "1631133203529",
  "items": [
    {
      "flag_created": 1618700809,
      "flag_updated": 1618700809,
      "parent": {
        "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
        "sk": "survey#1618693620"
      },
      "parent_url": "https://dev-app.favr.town/surveys/s_eA5r70irwS",
      "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
      "profile": {
        "about": "Little Cupcake Shop is a Gourmet Bakery in New York City. Our products include specialty cupcakes including spicy pumpkin, green tea, and chocolate cupcakes. We have been been around since 1998.",
        "businessName": "Little Cupcake Shop",
        "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
        "url": "https://dev-app.favr.town/merchants/m_g56aDAS"
      },
      "sk": "news#1618700809",
      "stat_like": 0,
      "stat_share": 0,
      "text": "Little Cupcake Shop just posted a survey"
    },
    {
      "flag_allow_clip": true,
      "flag_clipped": false,
      "flag_updated": 1619471258,
      "image": "https://img.favr.town/content/news/nUhRL_HU8.png",
      "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
      "profile": {
        "about": "Little Cupcake Shop is a Gourmet Bakery in New York City. Our products include specialty cupcakes including spicy pumpkin, green tea, and chocolate cupcakes. We have been been around since 1998.",
        "businessName": "Little Cupcake Shop",
        "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
        "url": "https://dev-app.favr.town/merchants/m_g56aDAS"
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
    "allow_add": false,
    "allow_modify": false,
    "allow_remove": false,
    "allow_share": true
  }
}
```



### PUT

patron to clip coupon from news item



this model works like POST and also accepts `ExclusiveStartKey` and `limit` attributes. it returns POST result with additional message.



#### example

patron to clip coupon from news item with pk, sk



##### request

```json
{
  "httpMethod": "PUT",
  "path": "/news",
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
// returns POST, plus message
```



## pagination

Lists are returned paginated as `{ items: [] }`.

If additional pages are available, the result will include "LastEvaluatedKey":
```json
{
  "timeStamp": "1631132469996",
  "items": [
    { ... }
  ],
  "LastEvaluatedKey": {
    "gsi_2_sk": "news#1618700809#c272e5c2-ea69-4605-9489-816624ed731b",
    "sk": "news#1618700809",
    "gsi_2_pk": "news",
    "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b"
  },
  "flags": { ... }
}
```

If the user scrolls down on the list view, the client should request the next page by calling `/action POST` with `{ body: { limit: number, ExclusiveStartKey: LastEvaluatedKey }}`, and merge the result into the table.



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
              "type": "string",
              "pattern": "^news#"
            }
          },
          "required": ["sk"]
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
            },
            "sk": {
              "type": "string",
              "pattern": "^news#"
            }
          },
          "required": ["model", "requestor", "login", "role"]
        },
        "body": {
          "type": "object",
          "properties": {
            "text": {
              "type": "string",
              "minLength": 2
            },
            "type": {
              "oneOf": [
                {
                  "type": "string",
                  "pattern": "^news$"
                },
                {
                  "type": "string",
                  "pattern": "^coupon$"
                }
              ]
            },
            "url": {
              "type": "string",
              "pattern": "^https?://"
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
                },
                {
                  "type": "string",
                  "pattern": "^patron$"
                },
                {
                  "type": "string",
                  "pattern": "^location$"
                }
              ]
            }
          },
          "required": ["model", "requestor", "login", "role"]
        },
        "body": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "minLength": 2
            },
            "merchant_pk": {
              "type": "string",
              "minLength": 2
            },
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
            },
            "ExclusiveStartKey": {
              "type": "object"
            },
            "limit": {
              "type": "number"
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