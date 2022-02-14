

# data models: image

manage images



## examples

### DELETE

remove image (logo, album, profile, etc.)



#### example

merchant delete own logo



##### request

```json
{
  "httpMethod": "DELETE",
  "path": "/image",
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
    "url": "https://img.favr.town/content/logo/WFo4DCS4b.png"
  }
}
```



##### response

```json
{
  "timeStamp": "1626801171694",
  "item": {
    "flag_updated": 1626801171
  }
}
```



### PATCH

add image (logo, album, profile, etc.)



#### example

merchant add logo



##### request

```json
{
  "httpMethod": "PATCH",
  "path": "/image",
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
    "image": "PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDQ3IDEwNDciPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojMTYwMjAyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDoyM3B4O2ZpbGwtcnVsZTpldmVub2RkO308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xNTEzLjA2LDEwNzEuMTNjMS42MS00MC4yLDgtMjMxLTM1LTMyNy4yMi04LTE3LjktMjIuNTEtNDkuMTgtNTIuNC01Ny43Mi0yOS40My04LjQxLTU3LjIsOS45My02MS41MiwxMi44MS0xLjgzLDEuMjEtMzYuODgsMjUuMjctMzkuNzYsNjIuNjEtMy40NCw0NC41NCw0My4yOSw1OC44Nyw4Ny44NiwxMzguMjgsMjAuODgsMzcuMiwzMC41MSw2OC4wOSw0MC43NCwxMDEsMTQuMjIsNDUuNzcsMzEuMzYsMTAwLjM1LDI5LjUyLDE2Ny4yNS0uNTUsMTkuNzgtNC41LDEwNC4xNi01MS43MSwxODAuNTQtODIuMiwxMzMtMjYzLjM5LDE4OS43My00MDUuMjEsMTQzLjQ5LTE3Ljc4LTUuNzktMTQ5LjM5LTQ4LjY3LTE5NS44OC0xNjYtMi45MS03LjM0LTQuNjUtMTIuODEtNi0xNy0yNy4zMi04Ni45Mi0xNi4zLTE3MC4zMS0xNi4zLTE3MC4zMSw0LTMxLjUzLDEyLjMtOTcuNTgsNTcuNDItMTU3LjY5LDY4LjYzLTkxLjQ0LDE4MS41MS0xMTQuNjksMjU5LjQtMTMwLjczQzEyMjYuOTEsODI5LjM5LDEyOTQsODQwLjQ0LDEyOTUuODEsODI2YzIuMTEtMTYuMzktODIuODEtNDQtMTU1LjI0LTUzLjExLTI5LjMtMy42Ni03My41OS05LTEyOC42OCwyLjA1LTcwLjgxLDE0LjI0LTExMy44MSw0NS45NS0xMTguNDYsMzguODEtNS03LjY1LDMwLjM1LTUwLDc3LjYxLTc1LjU4LDEzMC41Ny03MC42OSwyODMuNTYsMjMuNjIsMzAwLjI2LTkuMTksMTEtMjEuNTktNDItODguNDEtMTE0LjM5LTExNi4wNi05My4zMi0zNS42NC0xNjUuNDcsMTUuMzUtMjA0LjQ3LTMwLjY2LTE5LjI1LTIyLjcxLTI1LjktNjMuNTEtOS4xMi04My44NiwxMS45NC0xNC40NywzNS0xNy43Miw1Mi4wOC0xMC45LDIzLjM3LDkuMzIsMzYuNzcsMzguMDgsMzUuNzMsNjAuODgtMi4zMSw1MC4yMy03My42Nyw1My41MS0xNDQuNjYsMTM0LjY0LTQ3LjI1LDU0LTgzLjE0LDEyOS43MS02MC4zNywxNjIuMTcsMTAuNzEsMTUuMjgsMzEuNjUsMTYuODUsMzMuODksMzMuMDYsMi40MSwxNy40OS0xOS42OCwzMy4xNi0zMi4xLDQ0LjA3LTY2LjQ4LDU4LjM4LTMzLjgyLDEzOS4yLTg3Ljc2LDE3OC42Ny0zNSwyNS42LTkxLjc2LDIzLjc2LTEyMC4wNi00LTQzLjgtNDMuMDctOS4yNi0xMjcuNTktMzIuMTEtMTM2LTI5LjI2LTEwLjc1LTEyMiwxMTkuNjQtOTEuNTksMTYzLjI2LDE0LjYzLDIxLDQ1LDMuNTgsNzUuNjQsMjkuOSwyOSwyNSwxNy40Myw1NC4zMiw0My42MSwxMTUuMTMsNy40LDE3LjE3LDI1LjM5LDU5LDYwLjY0LDg5Ljg3LDQ4LDQyLjEsMTA5LjM2LDQ3LjExLDE0NC4xLDQ2LjUzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDc4Ljg0IC00NzIuNikiLz48L3N2Zz4=",
    "type": "logo"
  }
}
```



##### response

```json
{
  "timeStamp": "1626801483384",
  "item": {
    "flag_updated": 1626801483,
    "logo": "https://img.favr.town/content/logo/-6AZrBmGK.png"
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
            "url": {
              "type": "string"
            }
          },
          "required": ["url"]
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
            "image": {
              "type": "string"
            },
            "image_text": {
              "type": "string"
            },
            "type": {
              "oneOf": [
                {
                  "type": "string",
                  "pattern": "^logo$"
                },
                {
                  "type": "string",
                  "pattern": "^album$"
                },
                {
                  "type": "string",
                  "pattern": "^profile$"
                },
                {
                  "type": "string",
                  "pattern": "^reward$"
                },
                {
                  "type": "string",
                  "pattern": "^news$"
                },
                {
                  "type": "string",
                  "pattern": "^survey$"
                }
              ]
            }
          },
          "required": ["image", "type"]
        }
      },
      "required": ["httpMethod", "params", "body"]
    }
  }
}
```

