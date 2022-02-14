

# data models: terms

get terms of service and privacy policy



## examples

### GET

get terms of service and privacy policy



#### example

The GET request returns both documents, `"privacy"`, and `"terms"`.



##### request

```json
{
  "httpMethod": "GET",
  "path": "/terms",
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
  "timeStamp": "1625934646636",
  "item": {
    "privacy": "Privacy Policy\r\n\r\nLast revised on October 30, 2019\r\n\r\nfavr.town Inc (\"favr.town,\" \"we,\" \"our,\" or \"us\") respects the privacy of its users (\"you,\" \"your,\" or \"User\") and hereby discloses our privacy practices. We encourage you to read this Privacy Policy carefully when using our applications or services or transacting business with us.",
    "service": "Terms of Service\r\n\r\nLast revised on October 30, 2019\r\n\r\nWelcome to favr.town, a platform designed to facilitate the seeking, formation, and maintenance of long term happy relationships through its web applications (the \"Applications\"), which is located at www.thefavr.town.com (the \"Site\") and operated by favr.town Inc, a Delaware corporation (\"favr.town\" or \"The Company\" or \"we\" or \"us\" or \"our\")."
  }
}
```
