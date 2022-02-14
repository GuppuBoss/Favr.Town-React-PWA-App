

# data models: location

merchant to manage own locations
patron to get list of merchant's locations



## examples

### DELETE

merchant remove own location by id



#### example

##### request

```json
{
  "httpMethod": "DELETE",
  "path": "/location",
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
  "timeStamp": "1626540702680",
  "items": [],
  "flags": {
    "allow_add": true,
    "allow_remove": true
  }
}
```



### PATCH

merchant update own location by id



#### example

##### request

```json
{
  "httpMethod": "PATCH",
  "path": "/location",
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
      "street": "1200 5th Ave"
  }
}
```



##### response

```json
{
  "timeStamp": "1626548957285",
  "items": [
    {
      "about": "urban legend in enterprise architecture",
      "businessName": "LarrosaTek Inc",
      "city": "New York",
      "id": 1617158268,
      "state": "NY",
      "street": "1200 5th Ave",
      "zip": "10035"
    }
  ]
}
```



### POST



#### example

merchant get list of own locations



##### request

```json
{
  "httpMethod": "POST",
  "path": "/location",
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
  "timeStamp": "1626540702680",
  "items": [
    {
      "about": "urban legend in enterprise architecture",
      "businessName": "LarrosaTek Inc",
      "city": "New York",
      "id": 1617158268,
      "state": "NY",
      "street": "5th Ave",
      "zip": "10035"
    }
  ],
  "flags": {
    "allow_add": true,
    "allow_remove": true
  }
}
```



#### example

merchant get specific location by id



##### request

```json
{
  "httpMethod": "POST",
  "path": "/location",
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
  "timeStamp": "1626545084124",
  "item": {
    "about": "urban legend in enterprise architecture",
    "businessName": "LarrosaTek Inc",
    "city": "New York",
    "id": 1617158268,
    "state": "NY",
    "street": "5th Ave",
    "zip": "10035"
  },
  "flags": {
    "allow_remove": true
  }
}
```



#### example

patron get list of specific merchant's locations



##### request

```json
{
  "httpMethod": "POST",
  "path": "/location",
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
{
  "timeStamp": "1626545360266",
  "items": [
    {
      "id": 1617158268,
      "store": "LarrosaTek Inc\n5th Ave\nNew York, NY 10035"
    }
  ]
}
```



### PUT

patron to update preferred location for followed merchant
returns `/merchant GET` result



#### example

##### request

```json
{
  "httpMethod": "PUT",
  "path": "/location",
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
    "merchant_pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
    "id": 1617158268
  }
}
```



##### response

```json
{
  "timeStamp": "1626550866400",
  "message": "preferred location updated!",
  "item": {
    "about": "Little Cupcake Shop is a Gourmet Bakery in New York City. Our products include specialty cupcakes including spicy pumpkin, green tea, and chocolate cupcakes. We have been been around since 1998.",
    "businessName": "Little Cupcake Shop",
    "favr": 600,
    "lanes": [
      "BAKERY/CUPCAKE",
      "BAKERY/BREAD",
      "BAKERY"
    ],
    "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
    "my_store": {
      "id": 1617158268,
      "store": "LarrosaTek Inc\n1200 5th Ave\nNew York, NY 10035"
    },
    "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
    "rule_rewards": [],
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
              "type": "string"
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
            },
            "businessName": {
              "type": "string",
              "minLength": 2
            },
            "street": {
              "type": "string",
              "minLength": 2
            },
            "zip": {
              "type": "string"
            },
            "state": {
              "type": "string",
              "minLength": 2
            },
            "city": {
              "type": "string",
              "minLength": 2
            },
            "about": {
              "type": "string",
              "minLength": 2
            },
            "website": {
              "type": "string",
              "pattern": "^https?://"
            },
            "phone": {
              "type": "string",
              "pattern": "^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$"
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
          "properties": {
            "merchant_pk": {
              "type": "string",
              "pattern": "^merchant#"
            },
            "id": {
              "type": "number"
            }
          }
        }
      },
      "required": ["httpMethod", "params"]
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
              "type": "string",
              "pattern": "^patron$"
            },
            "pk": {
              "type": "string"
            }
          },
          "required": ["model", "requestor", "login", "role"]
        },
        "body": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "merchant_pk": {
              "type": "string",
              "pattern": "^merchant#"
            },
            "id": {
              "type": "number"
            }
          },
          "required": ["merchant_pk", "id"]
        }
      }
    }
  }
}

```

