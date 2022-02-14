

# data models: settings

get settings by type/id



## examples

### GET

get location by zip



#### example

##### request

```json
{
  "httpMethod": "GET",
  "path": "/settings",
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
    "type": "zip",
    "id": "10035"
  },
  "body": {}
}
```



##### response

```json
{
  "timeStamp": "1626551865453",
  "item": {
    "city": "NEW YORK",
    "country": "US",
    "lat": "40.801",
    "long": "-73.937",
    "state": "NY"
  }
}
```



### GET

get data source for the dropdown inputs



#### example

##### request

```json
{
  "httpMethod": "GET",
  "path": "/settings",
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
    "type": "app"
  },
  "body": {}
}
```



##### response

```json
{
  "timeStamp": "1626631132151",
  "item": {
    "source": {
      "help": {
        "view_url": [
          {
            "image": "",
            "text": ""
          }
        ]
      },
      "lane": {
        "ARTS_N_CRAFTS": [
          "CRAFTS",
          "DIY",
          "FINE_ARTS",
          "GALLERY",
          "MUSEUM"
        ],
        "CHILDREN": [
          "ACTIVITY",
          "DAYCARE",
          "LEARNING",
          "SUPPLY",
          "TOY"
        ],
        "DRINK": [
          "BAR",
          "BEER",
          "COFFEE",
          "SPECIALTY_DRINK",
          "TEA",
          "SPIRITS",
          "WINE"
        ],
        "FASHION": [
          "ACCESSORY",
          "APPAREL",
          "BEAUTY",
          "FRAGRANCE",
          "JEWELRY"
        ],
        "FOOD": [
          "BAKERY",
          "CAFÉ",
          "CHEESE",
          "CHOCOLATE",
          "FOOD_TRUCK",
          "GROCERY",
          "ICE_CREAM",
          "SNACKS",
          "SPECIALTY_FOODS",
          "RESTAURANT"
        ],
        "HEALTH_N_WELLNESS": [
          "FITNESS_CENTER",
          "GYM",
          "HEALTH_STORE",
          "WELLNESS_CENTER",
          "YOGA"
        ],
        "HOME": [
          "APPLIANCE",
          "DÉCOR",
          "DINING",
          "ESSENTIALS",
          "FURNITURE",
          "KITCHEN"
        ],
        "LEARNING": [
          "BOOKSTORE",
          "COMICS",
          "LIBRARY",
          "MUSEUM",
          "SCHOOL"
        ],
        "MUSIC_N_DANCE": [
          "DANCE",
          "MUSIC",
          "PERFORMING"
        ],
        "PERSONAL_CARE": [
          "BODY",
          "HAIR",
          "MAKEUP",
          "NAIL",
          "SALON",
          "SKINCARE"
        ],
        "PETS": [
          "DAYCARE",
          "GROOMING",
          "HOTEL",
          "PHARMACY",
          "SUPPLY",
          "TRAINING"
        ],
        "SPORTS_N_LEISURE": [
          "ACTIVITY",
          "GOODS",
          "OUTDOORS",
          "SERVICE",
          "TUTORIAL"
        ]
      }
    }
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
            "type": {
              "type": "string"
            },
            "id": {
              "type": "string"
            }
          },
          "required": ["model", "type"]
        }
      },
      "required": ["httpMethod", "params"]
    }
  }
}
```

