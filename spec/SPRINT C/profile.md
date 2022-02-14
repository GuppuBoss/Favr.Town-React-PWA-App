

# data models: profile

manage profile



## examples

### GET

merchant/patron to get profile



#### example

merchant



##### request

```json
{
  "httpMethod": "GET",
  "path": "/profile",
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
  "timeStamp": "1626465419044",
  "item": {
    "about": "Little Cupcake Shop is a Gourmet Bakery in New York City. Our products include specialty cupcakes including spicy pumpkin, green tea, and chocolate cupcakes. We have been been around since 1998.",
    "businessName": "Little Cupcake Shop",
    "lanes": [
      "BAKERY/CUPCAKE",
      "BAKERY/BREAD",
      "BAKERY"
    ],
    "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png"
  },
  "flags": {
    "flag_allow_add": true,
    "flag_allow_remove": true
  }
}
```



#### example

patron



##### request

```json
{
  "httpMethod": "GET",
  "path": "/profile",
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
  "timeStamp": "1626465324843",
  "item": {
    "email": "newemail@larrosatek.com",
    "favr": 6,
    "favr_hours": 1514,
    "favr_level": 3,
    "favr_lifetime_consumption": 200,
    "favr_multi": 1,
    "favr_score": 0,
    "favr_town": 880,
    "firstName": "QQ",
    "gsi_1_pk": "p_abcdefg",
    "gsi_1_sk": "follow",
    "gsi_2_pk": "find",
    "gsi_2_sk": "AN, QQ",
    "lastName": "An",
    "latest_news": 1620413601,
    "login": "patron",
    "pk": "patron#951c8fa3-e9f6-44aa-aad4-304c0c5256de",
    "sk": "profile",
    "stat_new_action": 0,
    "stat_new_conversation": 0,
    "stat_new_merchant": 0,
    "stat_new_news": 0,
    "stat_new_reward": false,
    "zip": "10035"
  },
  "flags": {}
}
```



### PATCH

merchant/patron update own profile



#### example

merchant update "about" attribute



##### request

```json
{
  "httpMethod": "PATCH",
  "path": "/profile",
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
      "about": "Little Cupcake Shop is a Gourmet Bakery in New York City. Our products include specialty cupcakes including spicy pumpkin, green tea, and chocolate cupcakes. We have been been around since 1998."
  }
}
```



##### response

```json
{
  "timeStamp": "1626715383538",
  "item": {
    "about": "Little Cupcake Shop is a Gourmet Bakery in New York City. Our products include specialty cupcakes including spicy pumpkin, green tea, and chocolate cupcakes. We have been been around since 1998.",
    "businessName": "Little Cupcake Shop",
    "lanes": [
      "BAKERY",
      "BAKERY/BREAD",
      "BAKERY/CUPCAKE"
    ],
    "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png"
  },
  "flags": {
    "flag_allow_add": true,
    "flag_allow_remove": true
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
    "PATCH": {
      "oneOf": [
        {
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
                  "type": "string",
                  "pattern": "^merchant$"
                }
              },
              "required": ["model", "requestor", "login", "role"]
            },
            "body": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "salutation": {
                  "type": "string",
                  "minLength": 2
                },
                "firstName": {
                  "type": "string",
                  "minLength": 2
                },
                "lastName": {
                  "type": "string",
                  "minLength": 2
                },
                "businessName": {
                  "type": "string",
                  "minLength": 2
                },
                "website": {
                  "type": "string",
                  "pattern": "^https?://"
                },
                "about": {
                  "type": "string"
                },
                "lane": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "specialty": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "flag_show_help": {
                  "type": "boolean"
                }
              }
            }
          },
          "required": ["httpMethod", "params", "body"]
        },
        {
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
                  "type": "string",
                  "pattern": "^patron$"
                }
              },
              "required": ["model", "requestor", "login", "role"]
            },
            "body": {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "salutation": {
                  "type": "string",
                  "minLength": 2
                },
                "firstName": {
                  "type": "string"
                },
                "lastName": {
                  "type": "string"
                },
                "cell": {
                  "type": "string"
                },
                "birthday": {
                  "type": "number"
                },
                "accept_gift_birthday": {
                  "type": "boolean"
                },
                "street": {
                  "type": "string"
                },
                "zip": {
                  "type": "string"
                },
                "state": {
                  "type": "string"
                },
                "city": {
                  "type": "string"
                },
                "country": {
                  "type": "string"
                },
                "accept_gift_mailin": {
                  "type": "boolean"
                },
                "flag_show_help": {
                  "type": "boolean"
                }
              }
            }
          },
          "required": ["httpMethod", "params", "body"]
        }
      ]
    }
  }
}
```
