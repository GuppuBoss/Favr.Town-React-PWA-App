

# data models: patron

merchant list/lookup follower patrons

merchant to register patron actions (purchase/reward)
and gift favr



## examples

### GET

merchant follower by id



#### example

##### request

```json
{
  "httpMethod": "GET",
  "path": "/patron",
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
    "id": "p_abcdefg"
  }
}
```



##### response

```json
{
  "timeStamp": "1628781805902",
  "item": {
    "email": "newemail@larrosatek.com",
    "favr": 600,
    "favr_hours": 1514,
    "favr_level": 3,
    "favr_life": 100,
    "favr_score": 0,
    "latest_news": 1620413601,
    "login": "patron",
    "patron_details": {
      "details": "click for details",
      "name": "AN, QQ",
      "profilePicture": "https://img.favr.town/app/icon/patron_profilePicture.png"
    },
    "pk": "patron#951c8fa3-e9f6-44aa-aad4-304c0c5256de",
    "rule_rewards": [],
    "sk": "profile",
    "stat_new_conversation": 0,
    "stat_new_news": 0
  },
  "flags": {
    "action_url": "https://dev-app.favr.town/actions?patron_pk=951c8fa3-e9f6-44aa-aad4-304c0c5256de",
    "conversation_url": "https://dev-app.favr.town/conversations?patron_pk=951c8fa3-e9f6-44aa-aad4-304c0c5256de",
    "following": true,
    "suggestion_url": "https://dev-app.favr.town/suggestions?patron_pk=951c8fa3-e9f6-44aa-aad4-304c0c5256de"
  }
}
```


### POST

merchant get (filtered) list of followers



#### example

merchant to get paginated list of all followers, by last active



##### request

```json
{
  "httpMethod": "POST",
  "path": "/patron",
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
      "limit": 1
  }
}
```



##### response

```json
{
  "timeStamp": "1626975555364",
  "items": [
    {
      "active": "recently",
      "details": "sweetie/r/nsweetie@larrosatek.com",
      "email": "sweetie@larrosatek.com",
      "last_active": 1626897669,
      "login": "sweetie",
      "profilePicture": "https://img.favr.town/app/icon/patron_profilePicture.png",
      "url": "https://dev-app.favr.town/patrons/p_ItsR-50-eo"
    }
  ],
  "LastEvaluatedKey": {
    "gsi_2_sk": "1626897669#a9d33326-d084-4e4e-9fa9-25034d13fd1f",
    "sk": "following#c272e5c2-ea69-4605-9489-816624ed731b",
    "gsi_2_pk": "follow#c272e5c2-ea69-4605-9489-816624ed731b",
    "pk": "patron#a9d33326-d084-4e4e-9fa9-25034d13fd1f"
  }
}
```



#### example

merchant to search for follower by email

##### request

```json
{
  "httpMethod": "POST",
  "path": "/patron",
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
    "cellOrEmail": "sweetie@larrosatek.com"
  }
}
```



##### response

```json
{
  "timeStamp": "1626976080386",
  "items": [
    {
      "active": "recently",
      "details": "sweetie/r/nsweetie@larrosatek.com",
      "email": "sweetie@larrosatek.com",
      "last_active": 1626897669,
      "login": "sweetie",
      "profilePicture": "https://img.favr.town/app/icon/patron_profilePicture.png",
      "url": "https://dev-app.favr.town/patrons/p_ItsR-50-eo"
    }
  ]
}
```



#### example

merchant to search for follower by lastName

##### request

```json
{
  "httpMethod": "POST",
  "path": "/patron",
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
    "name": "an"
  }
}
```

or

```json
{
  "httpMethod": "POST",
  "path": "/patron",
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
    "name": "an, "
  }
}
```



##### response

```json
{
  "timeStamp": "1626976339948",
  "items": [
    {
      "active": "a while ago",
      "details": "patron/r/nAn, QQ/r/nnewemail@larrosatek.com",
      "email": "newemail@larrosatek.com",
      "firstName": "QQ",
      "gsi_1_pk": "p_abcdefg",
      "last_active": 1619192857,
      "lastName": "An",
      "login": "patron",
      "profilePicture": "https://img.favr.town/app/icon/patron_profilePicture.png",
      "url": "https://dev-app.favr.town/patrons/p_abcdefg"
    }
  ]
}
```



### PUT

register follower action



#### example

merchant register patron purchase



##### request

```json
{
  "httpMethod": "PUT",
  "path": "/patron",
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
      "patron_id": "p_ItsR-50-eo",
      "action": {
          "type": "purchase"
      }
  }
}
```



##### response

```json
{
  "timeStamp": "1626897669375",
  "message": "purchase registered.",
  "item": {
    "email": "sweetie@larrosatek.com",
    "favr": 500,
    "favr_life": 500,
    "login": "sweetie",
    "patron_details": {},
    "pk": "patron#a9d33326-d084-4e4e-9fa9-25034d13fd1f",
    "rule_rewards": [],
    "sk": "profile"
  },
  "flags": {
    "action_url": "https://dev-app.favr.town/actions?patron_pk=a9d33326-d084-4e4e-9fa9-25034d13fd1f",
    "conversation_url": "https://dev-app.favr.town/conversations?patron_pk=a9d33326-d084-4e4e-9fa9-25034d13fd1f",
    "following": true,
    "suggestion_url": "https://dev-app.favr.town/suggestions?patron_pk=a9d33326-d084-4e4e-9fa9-25034d13fd1f",
    "wipe_query_params": true
  }
}
```





#### example

##### request

```json

```



##### response

```json

```





#### example

##### request

```json

```



##### response

```json

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
                },
                {
                  "type": "string",
                  "pattern": "^location$"
                }
              ]
            },
            "id": {
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
                  "pattern": "^merchant$"
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
            "cellOrEmail": {
              "type": "string",
              "minLength": 2
            },
            "name": {
              "type": "string",
              "minLength": 2
            },
            "type": {
              "oneOf": [
                {
                  "type": "string",
                  "pattern": "^follower$"
                }
              ]
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
            "patron_id": {
              "type": "string"
            },
            "action": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string",
                      "pattern": "^purchase$"
                    }
                  },
                  "required": ["type"]
                },
                {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string",
                      "pattern": "^favr$"
                    },
                    "amount": {
                      "type": "number",
                      "minimum": 0
                    }
                  },
                  "required": ["type", "amount"]
                },
                {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string",
                      "pattern": "^reward$"
                    },
                    "reward_sk": {
                      "type": "string",
                      "minLength": 2
                    }
                  },
                  "required": ["type", "reward_sk"]
                },
                {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string",
                      "pattern": "^coupon$"
                    },
                    "coupon_id": {
                      "type": "number",
                      "minimum": 0
                    }
                  },
                  "required": ["type", "coupon_id"]
                }
              ]
            }
          },
          "required": ["patron_id", "action"]
        }
      },
      "required": ["httpMethod", "params", "body"]
    }
  }
}
```