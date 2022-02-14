

# data models: conversation

allow patron <> merchant conversation

- start conversation
- respond to conversation
- view all own conversations
- view all own conversations with specific recipient



## format



.. allows picking up 

```json
{
    pk: string, // "conversation",
    sk: string	// `${timestamp}${short_id}`
}
```



### indexes

**gsi_1**

.. allows patron to look up all their items



```json
{
    gsi_1_pk: string, // `conversation#${patron_sub}`
	gsi_1_sk: string, // `${timestamp}#${partner_sub}`
}
```



**gsi_2**

.. allows merchant to look up all their items



```json
{
    gsi_2_pk: string, // `conversation#${merchant_sub}`
	gsi_2_sk: string, // `${timestamp}#${partner_sub}`
}
```



**gsi_action**

.. allows patron/merchant to look up all shared items



```json
{
    gsi_action_pk: string, // `conversation#${merchant_sub}#${patron_sub}`,
    gsi_action_sk: string, // `${timestamp}${short_id}`
}
```



## examples

### GET

Get individual conversation by id.

#### example

patron get conversation by id.



##### request

```json
{
  "httpMethod": "GET",
  "path": "/conversation",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "951c8fa3-e9f6-44aa-aad4-304c0c5256de",
        "cognito:username": "qqanny",
        "cognito:groups": "patron"
      }
    }
  },
  "queryStringParameters": {
      "id": "1625588072yGoIWYFHO"
  },
  "body": {}
}
```



##### response

```json
{
  "timeStamp": "1625588124764",
  "item": {
    "conversation": [
      {
        "message": "could you add some spiced milk tea",
        "from": {
          "owner": true,
          "login": "qqanny",
          "url": "https://dev-app.favr.town/patrons/p_abcdefg"
        },
        "time": 1625588072
      }
    ],
    "partner": {
      "businessName": "Little Cupcake Shop",
      "login": "merchant",
      "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
      "owner": false,
      "tags": [
        "##BAKERY",
        "#BREAD",
        "#CUPCAKE"
      ],
      "url": "https://dev-app.favr.town/merchants/m_g56aDAS"
    },
    "partner_new": true,
    "sk": "1625588072yGoIWYFHO",
    "time": 1625588072,
    "topic": "new winter product idea",
    "url": "https://dev-app.favr.town/conversations/1625588072yGoIWYFHO"
  },
  "flags": {
    "flag_created": 1625588072,
    "flag_updated": 1625588072
  }
}
```



### PATCH

Respond to existing conversation.



#### example

merchant to respond to conversation by id



##### request

```json
{
  "httpMethod": "PATCH",
  "path": "/conversation",
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
      "id": "1625588072yGoIWYFHO"
  },
  "body": {
      "message": "sounds like a good idea!"
  }
}
```



##### response

```json
{
  "timeStamp": "1625589177123",
  "message": "message sent!",
  "item": {
    "conversation": [
      {
        "message": "could you add some spiced milk tea",
        "from": {
          "owner": true,
          "login": "qqanny",
          "url": "https://dev-app.favr.town/patrons/p_abcdefg"
        },
        "time": 1625588072
      },
      {
        "message": "sounds like a good idea!",
        "from": {
          "owner": false,
          "businessName": "Little Cupcake Shop",
          "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
          "login": "merchant",
          "url": "https://dev-app.favr.town/merchants/m_g56aDAS",
          "tags": [
            "##BAKERY",
            "#BREAD",
            "#CUPCAKE"
          ]
        },
        "time": 1625589177
      }
    ],
    "owner_new": true,
    "partner": {
      "login": "qqanny",
      "owner": true,
      "url": "https://dev-app.favr.town/patrons/p_abcdefg"
    },
    "partner_new": false,
    "sk": "1625588072yGoIWYFHO",
    "time": 1625589177,
    "topic": "new winter product idea",
    "url": "https://dev-app.favr.town/conversations/1625588072yGoIWYFHO"
  },
  "flags": {
    "flag_created": 1625589177,
    "flag_updated": 1625589177
  }
}
```



### POST

Query all own conversations, or all conversations with a specific recipient.



#### example

merchant query all own conversations



##### request

```json
{
  "httpMethod": "POST",
  "path": "/conversation",
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
  "timeStamp": "1625588700919",
  "items": [
    {
      "conversation": [
        {
          "message": "could you add some spiced milk tea",
          "from": "patron#951c8fa3-e9f6-44aa-aad4-304c0c5256de",
          "time": 1625588072
        }
      ],
      "flag_created": 1625588072,
      "flag_is_new": true,
      "flag_updated": 1625588072,
      "partner": {
        "login": "qqanny",
        "owner": true,
        "url": "https://dev-app.favr.town/patrons/p_abcdefg"
      },
      "partner_new": true,
      "pk": "conversation",
      "sk": "1625588072yGoIWYFHO",
      "time": 1625588072,
      "topic": "new winter product idea",
      "url": "https://dev-app.favr.town/conversations/1625588072yGoIWYFHO"
    }
  ]
}
```



#### example

patron query all own conversations with specific merchant



##### request

```json
{
  "httpMethod": "POST",
  "path": "/conversation",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "951c8fa3-e9f6-44aa-aad4-304c0c5256de",
        "cognito:username": "qqanny",
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
  "timeStamp": "1625588794054",
  "items": [
    {
      "conversation": [
        {
          "message": "could you add some spiced milk tea",
          "from": "patron#951c8fa3-e9f6-44aa-aad4-304c0c5256de",
          "time": 1625588072
        }
      ],
      "flag_created": 1625588072,
      "flag_updated": 1625588072,
      "partner": {
        "businessName": "Little Cupcake Shop",
        "login": "merchant",
        "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
        "owner": false,
        "tags": [
          "##BAKERY",
          "#BREAD",
          "#CUPCAKE"
        ],
        "url": "https://dev-app.favr.town/merchants/m_g56aDAS"
      },
      "partner_new": true,
      "pk": "conversation",
      "sk": "1625588072yGoIWYFHO",
      "time": 1625588072,
      "topic": "new winter product idea",
      "url": "https://dev-app.favr.town/conversations/1625588072yGoIWYFHO"
    }
  ]
}
```



### PUT

Create new conversation with a specific recipient.



#### example

patron starting conversation with merchant.



##### request

```json
{
  "httpMethod": "PUT",
  "path": "/conversation",
  "requestContext": {
    "authorizer": {
      "claims": {
        "sub": "951c8fa3-e9f6-44aa-aad4-304c0c5256de",
        "cognito:username": "qqanny",
        "cognito:groups": "patron"
      }
    }
  },
  "queryStringParameters": {},
  "body": {
      "to": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
      "topic": "new winter product idea",
      "message": "could you add some spiced milk tea"
  }
}
```



##### response

```json
{
  "timeStamp": "1625588072147",
  "message": "message sent!",
  "item": {
    "conversation": [
      {
        "message": "could you add some spiced milk tea",
        "from": {
          "owner": true,
          "login": "qqanny",
          "url": "https://dev-app.favr.town/patrons/p_abcdefg"
        },
        "time": 1625588072
      }
    ],
    "partner": {
      "businessName": "Little Cupcake Shop",
      "login": "merchant",
      "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
      "owner": false,
      "tags": [
        "##BAKERY",
        "#BREAD",
        "#CUPCAKE"
      ],
      "url": "https://dev-app.favr.town/merchants/m_g56aDAS"
    },
    "partner_new": true,
    "sk": "1625588072yGoIWYFHO",
    "time": 1625588072,
    "topic": "new winter product idea",
    "url": "https://dev-app.favr.town/conversations/1625588072yGoIWYFHO"
  },
  "flags": {
    "flag_created": 1625588072,
    "flag_updated": 1625588072
  }
}
```
