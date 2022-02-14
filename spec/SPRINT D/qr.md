

# data models: settings

get QR code

- own (patron)
- own merchant (merchant, location)
- reward
- coupon



### POST

#### example

Get own QR code (merchant)



##### request

```json
{
  "httpMethod": "POST",
  "path": "/qr",
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



or



```json
{
  "httpMethod": "POST",
  "path": "/qr",
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
    "type": "self"
  }
}
```



##### response

```json
{
  "timeStamp": "1630350185597",
  "item": {
    "QR": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 37 37\" shape-rendering=\"crispEdges\"><path fill=\"#ffffff\" d=\"M0 0h37v37H0z\"/><path stroke=\"#000000\" d=\"M4 4.5h7m3 0h1m3 0h7m1 0h7M4 5.5h1m5 0h1m2 0h2m2 0h1m1 0h3m4 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h1m2 0h2m1 0h2m4 0h1m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h1m1 0h1m4 0h1m1 0h1m2 0h1m1 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h2m3 0h1m1 0h2m2 0h2m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m2 0h1m1 0h3m1 0h1m4 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h1m1 0h2m1 0h1m1 0h2m2 0h2M4 12.5h1m1 0h5m5 0h1m1 0h2m1 0h1m1 0h1m2 0h5M4 13.5h1m2 0h3m3 0h1m1 0h1m3 0h5m1 0h4m3 0h1M6 14.5h1m1 0h1m1 0h7m2 0h3m3 0h1m1 0h2M6 15.5h1m5 0h1m1 0h3m1 0h2m2 0h2m3 0h1m1 0h1m1 0h1M4 16.5h3m2 0h2m2 0h1m1 0h1m3 0h1m1 0h2m1 0h1m4 0h2M6 17.5h3m2 0h2m2 0h1m1 0h2m1 0h2m1 0h2m1 0h1m1 0h1m3 0h1M4 18.5h5m1 0h1m1 0h2m2 0h4m1 0h1m3 0h1m3 0h2M5 19.5h2m1 0h2m6 0h2m2 0h1m2 0h3m1 0h2m2 0h1M5 20.5h2m2 0h2m7 0h4m2 0h1m2 0h1m1 0h2M4 21.5h4m3 0h1m1 0h2m1 0h1m4 0h4m1 0h3m1 0h1m1 0h1M4 22.5h1m1 0h2m2 0h3m3 0h1m2 0h2m3 0h2m1 0h2m1 0h1M4 23.5h1m3 0h1m2 0h1m2 0h1m1 0h1m1 0h3m4 0h1m1 0h2m2 0h1M4 24.5h1m1 0h1m3 0h2m4 0h1m2 0h4m1 0h5m1 0h3M12 25.5h7m2 0h1m2 0h1m3 0h5M4 26.5h7m5 0h5m2 0h2m1 0h1m1 0h3M4 27.5h1m5 0h1m1 0h2m1 0h3m2 0h1m2 0h2m3 0h1M4 28.5h1m1 0h3m1 0h1m1 0h3m1 0h1m1 0h2m1 0h1m2 0h5m1 0h1M4 29.5h1m1 0h3m1 0h1m1 0h1m2 0h1m1 0h1m2 0h3m1 0h2m3 0h4M4 30.5h1m1 0h3m1 0h1m1 0h1m3 0h2m1 0h2m2 0h1m1 0h7M4 31.5h1m5 0h1m3 0h1m1 0h1m3 0h1m3 0h1m1 0h1m1 0h2m1 0h1M4 32.5h7m1 0h4m1 0h2m1 0h1m2 0h1m1 0h4m1 0h1\"/></svg>\n",
    "url": "https://dev-app.favr.town?m=m_g56aDAS"
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

```

