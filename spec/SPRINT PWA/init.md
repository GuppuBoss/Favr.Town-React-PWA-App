

# data models: init

get initial session/profile information



## format



.. allows picking up 

```json
{
    pk: string, // `${event.params.role}#${event.params.requestor},
    sk: string	// "profile"
}
```



### indexes

**gsi_1**

.. allows ?



```json
{
  gsi_1_pk: string, // `${patron ? "p_" : "m_"}${short_id}`
	gsi_1_sk: string, // `follow`
}
```



**gsi_2**

.. allows merchant to look up patron by name



```json
{
    gsi_2_pk: string, // `find`
	gsi_2_sk: string, // `${lastName}, ${firstName}`
}
```



**gsi_cell**

.. allows merchant to look up patron by cell



```json
{
    cell: string,
}
```



**gsi_email**

.. allows merchant to look up patron by email



```json
{
    email: string,
}
```



## examples

### GET

Get individual conversation by id.



#### example

patron requestor



##### request

```json
{
  "httpMethod": "GET",
  "path": "/init",
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
  "timeStamp": "1625594126331",
  "item": {
    "email": "patron@larrosatek.com",
    "favr": 6,
    "favr_hours": 1514,
    "favr_level": 3,
    "favr_lifetime_consumption": 200,
    "favr_multi": 1,
    "favr_score": 0,
    "favr_town": 880,
    "firstName": "QQ",
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
  "favr": {
    "favr": 6,
    "favr_town": 880
  },
  "flags": {
    "couponbook": true,
    "flag_confirmed": false,
    "flag_new_news": true,
    "flag_new_refill": true,
    "flag_personal_update": 1625680526,
    "flag_show_help": true
  },
  "notifications": [
    "favr refilled, with 1 bonus!",
    "level up 2>3!"
  ]
}
```



#### example

merchant requestor



##### request

```json
{
  "httpMethod": "GET",
  "path": "/init",
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
  "timeStamp": "1625594231666",
  "item": {
    "about": "Little Cupcake Shop is a Gourmet Bakery in New York City. Our products include specialty cupcakes including spicy pumpkin, green tea, and chocolate cupcakes. We have been been around since 1998.",
    "businessName": "Little Cupcake Shop",
    "email": "merchant@larrosatek.com",
    "lanes": [
      "BAKERY/CUPCAKE",
      "BAKERY/BREAD",
      "BAKERY"
    ],
    "login": "merchant",
    "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
    "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
    "rule_like": 20,
    "rule_min_reward": 0,
    "rule_purchase": 250,
    "rule_response": 50,
    "rule_rewards": [
      {
        "favr": 2000,
        "sk": "WtpxsjTLC",
        "description": "buy one, get one",
        "redeem_by": 1621011905,
        "redeem": "available at all locations except Hell's Kitchen"
      }
    ],
    "rule_suggestion": 50,
    "rule_welcome": 100,
    "sk": "profile",
    "stat_conversation": 10,
    "stat_follower": 9,
    "stat_like": 2,
    "stat_new": true,
    "stat_new_action": 1,
    "stat_new_conversation": 0,
    "stat_new_patron": 1,
    "stat_new_suggestion": 0,
    "stat_news": 7,
    "stat_patron": 9,
    "stat_purchase": 7,
    "stat_reward": 3,
    "stat_suggestion": 13,
    "stat_vote": 3
  },
  "flags": {
    "flag_confirmed": true,
    "flag_new_action": true,
    "flag_new_patron": true,
    "flag_show_help": true
  },
  "notifications": []
}
```



## backend logic

### set last active

### update favr, add notification

### set flags

### set stats