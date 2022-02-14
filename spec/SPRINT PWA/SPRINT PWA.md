# PWA

Specification
06/20/2021

Status:
**DRAFT**



## Summary

This sprint delivers a working and tested state-of-the-art optimized Progressive Web Application (ReactJS), as described below, to serve a dynamic responsive website, including all project source and build configuration files, 3rd party libraries, assets, and applicable documentation, optimized for current browsers (Chrome, Firefox, Safari), mobile first, with support for current mobile (Android and iOS), tablet, and desktop viewing modes, and following industry best practices.



### Delivery

Deliverable is just a great quality core application and layered architecture structure, webpack build scripts for production and  development configurations, minimal dependencies, easy to extend, simple and clean styling (bootstrap, material UI, some icons), straight  forward.

PWA features are installation prompt, asset caching, but no advanced features like offline use or push notifications.

Design is mobile. On tablet/PC, design is still mobile, simply aligned container center screen.



### Technical Requirements

#### Stack

This site is created as progressive web application (PWA) (ReactJS), with signin/authentication/session management (AWS Amplify/Cognito), and dynamic content provided through a REST API (AWS API Gateway), exposed via a `/{proxy+}` resource for ANY method. 

The project must use only permissively licensed third party components, ideally MIT.


#### PWA

The resulting progressive web application must be optimized (lighthouse, [https://developers.google.com/web/tools/lighthouse](https://developers.google.com/web/tools/lighthouse)) for current browsers on Windows  (Chrome, FireFox), macOS/iOS (Safari), and Android (Chrome).



#### Build

The build must be optimized for size and performance, with minimal dependencies, webpack is preferred.

All fonts and icons (SVG) must be included directly with the build to minimize external traffic, with the backend maintaining appropriate cache-control headers through the build pipeline.



##### Environments

The project must support 2 environments, "production" and "development". 

The project includes a `config.json` file to specify settings for each environment, and the `package.json` must support separate build scripts, e.g. `build:dev` and `build:prod`.



##### Open source/ license report

The data source for the "acknowledgements" modal is created with a build script.

In `package.json`,

.. add the following to "devDependencies":
```
"npm-license-crawler"
```

add the following to "scripts":
```json
"license-list": "npm-license-crawler --exclude .\"/vendor\" --dependencies --onlyDirectDependencies --json .\"/src/licenses.json\"",
"postinstall": "npm run license-list"
```



This will create a `licenses.json` file with all open source licenses used.
The file will look like this:

```json
{
    "@aws-amplify/auth@3.3.0": {
        "licenses": "Apache-2.0",
        "repository": "https://github.com/aws-amplify/amplify-js",
        "licenseUrl": "https://github.com/aws-amplify/amplify-js/raw/master/LICENSE",
        "parents": "app.favr.town"
    }
}
```



##### Installation Prompt

The application must build a PWA meeting Google's specification, and support "add to homescreen". The app should detect whether it's installed, and prompt the user to do so if not (on Windows, iOS/Safari, and Android/Chrome).

`https://{dev-}app.favr.town` is the root of the application.

[https://web.dev/customize-install/](https://web.dev/customize-install/)
[https://developers.google.com/web/ilt/pwa](https://developers.google.com/web/ilt/pwa)
[https://medium.com/@michael.lisboa/a-simple-react-hook-to-prompt-ios-users-to-install-your-wonderful-pwa-4cc06e7f31fa](https://medium.com/@michael.lisboa/a-simple-react-hook-to-prompt-ios-users-to-install-your-wonderful-pwa-4cc06e7f31fa)



##### Offline

The app must be able to open offline without error.
While offline, display "Internet connection required" as message banner.



##### Navigation and Routing

**Routing** is critical.  *Do not* use "hash" routes. The project must implement a simple but solid router that allows for:

- each view can be reached directly (if necessary with a redirect to [/signin](/signin) and back) 
- views can parse and use url and query parameters to update their state when reached
- views can survive a page reload
- standard browser navigation back/forward can be used, in addition to a "back" button/icon

The router must support transitions (see section Style/Transitions).



#### Authentication

All routes are authenticated with AWS Cognito using AWS Amplify in the client.

Example `/src/service/aws-authentication.js`:
```JavaScript
import Auth from '@aws-amplify/auth';

/**
 * @param {string} username
 * @param {string} password
 * @return {Promise<any>}
 */
export function signIn(username, password) {
  return Auth.signIn(username, password);
}

/**
 * @return {Promise<any>}
 */
export function signOut() {
  return Auth.signOut();
}

/**
 * @param {string} username
 * @return {Promise<any>}
 */
export function forgotPassword(username) {
  const login = username.toLowerCase();

  return Auth.forgotPassword(login);
}

/**
 * @param {string} username
 * @param {string} code
 * @param {string} password
 * @return {Promise<void>}
 */
export function forgotPasswordSubmit(username, code, password) {
  const login = username.toLowerCase();

  return Auth.forgotPasswordSubmit(login, code, password);
}

/**
 * @return {Promise<any>}
 */
export function getCurrentAuthenticatedUser() {
  return Auth.currentAuthenticatedUser();
}

/**
 * @return {Promise}
 */
export function getUserSession() {
  return Auth.currentSession();
}

/**
 * @return {Promise<string>}
 */
export function getIdentityJWT() {
  const NO_TOKEN = '';

  return getUserSession()
    .then((session) => {
      if (session && session.idToken && session.idToken.jwtToken) {
        return session.idToken.jwtToken;
      }

      return NO_TOKEN;
    })
    .catch(() => NO_TOKEN);
}
```


##### Session management

Session management and token renewal is critical. 

If necessary (expired, invalid, or missing session), redirect to [/signin](/signin), create/refresh the session, and come back to where the missing/expired session was detected.

Each time the app is opened, even if a valid session exists, the cached user profile must be renewed by calling `/init GET` (see section **"API"**).



#### API

The REST API supports a dynamic [/{model}](/{model}) resource with `ANY` method. 

The API performs event validation for each request based on required model+method, and validates attributes included as query parameters and/or with a request body. 

API calls should be optionally retryable (relevant for later sprints).

API responses *must not be cached in the client* except for `/init GET` which will be refreshed each time the app resumes or the user reaches [/p](/p) or [/m](/m). 



To support a layered architecture approach, create a config file (will be provided outside this specification) and 3 service files in `/src/service`:

**aws-api**

This wraps generic API calls (DELETE, GET, PATCH, POST, PUT) for the AWS SDK, assures authentication, and adds logging and spinner animation.

```JavaScript
import { get } from 'lodash';
import promiseRetry from 'promise-retry';
import { getIdentityJWT } from './awsAuthentication';
import AWSConfig from './awsConfig';
import apiGatewayClient from './awsGatewayClient';


const callApiGateway = apiGatewayClient({
  invokeUrlToken: AWSConfig.invokeUrlToken,
  invokeUrlIAM: AWSConfig.invokeUrlIAM,
});

function callAPI(
  methodName,
  params = {},
  body = {},
  additionalParams = {},
  showErrors = true,
  withoutRetry = true
) {
  const additional = { ...additionalParams };
  const requestInfo = {
    methodName,
    params,
    body,
    additionalParams,
  };

  return promiseRetry(
    (retry) =>
      getIdentityJWT()
        .then((identityJWT) => {
          if (!additional.headers) {
            additional.headers = {};
          }
          if (!additional.queryParams) {
            additional.queryParams = {};
          }
          if (identityJWT) {
            additional.headers.Authorization = identityJWT;
          }

          return callApiGateway[methodName](params, body, additional);
        })
        .then((response) => get(response, 'data', {}))
        .catch((e) => {
          if (withoutRetry) {
            throw e;
          } else {
            retry(e);
          }
        }),
	  {
		retries: 2,
		minTimeout: 200,
		maxTimeout: 800,
	  }
  ).then(
    (value) => value,
    (err) => {
      console.error({
        request: requestInfo,
        error: err,
      });

      if (showErrors) {
		// show errors
      }

      throw get(err, 'data', err);
    }
  );
}

export function GET(model, additional = {}, showErrors, withoutRetry) {
  return callAPI("modelGet", { model }, {}, additional, showErrors, withoutRetry);
}

export function POST(model, body = {}, additional = {}, showErrors, withoutRetry) {
  return callAPI("modelPost", { model }, body, additional, showErrors, withoutRetry);
}

export function PUT(model, body = {}, additional = {}, showErrors, withoutRetry) {
  return callAPI("modelPut", { model }, ...body, additional, showErrors, withoutRetry);
}

export function DELETE(model, body = {}, additional = {}, showErrors, withoutRetry) {
  return callAPI("modelDelete", { model }, body, additional, showErrors, withoutRetry);
}

export function PATCH(model, body = {}, additional = {}, showErrors, withoutRetry) {
  return callAPI("modelPatch", { model }, body, additional, showErrors, withoutRetry);
}

```



**aws-api-calls**

This wraps API calls with simple functions for readability, example:

```JavaScript
import { get } from 'lodash';
import { DELETE, GET, PATCH, POST, PUT } from './aws-api';

export function getZipData(zipCode) {
  const additional = {
    queryParams: { id: 'ZIP', list: zipCode },
  };

  return GET("settings", additional).then((response) => get(response, 'object', {}));
}

export function updateChannel(channelId, body) {
  return PATCH(
    "channel",
    { ...body },
    {
      queryParams: {
        id: channelId,
      },
    }
  ).then((response) => get(response, 'object', {}));
}

```



**aws-gateway-client.js**

This handles the actual request with AWS ApiGateway based on a config file required for "production" and "development" environments.

Example:

```JavaScript
const { apiGateway, uritemplate } = window;

/**
 * @param {Object} configuration
 */
export default function (configuration) {
  const apigClient = {};

  let config = { ...configuration };

  if (config === undefined) {
    config = {
      accessKey: "",
      secretKey: "",
      sessionToken: "",
      region: "",
      apiKey: undefined,
      defaultContentType: "application/json",
      defaultAcceptType: "application/json",
    };
  }
  if (config.accessKey === undefined) {
    config.accessKey = "";
  }
  if (config.secretKey === undefined) {
    config.secretKey = "";
  }
  if (config.apiKey === undefined) {
    config.apiKey = "";
  }
  if (config.sessionToken === undefined) {
    config.sessionToken = "";
  }
  if (config.region === undefined) {
    config.region = "us-east-1";
  }
  // If defaultContentType is not defined then default to application/json
  if (config.defaultContentType === undefined) {
    config.defaultContentType = "application/json";
  }
  // If defaultAcceptType is not defined then default to application/json
  if (config.defaultAcceptType === undefined) {
    config.defaultAcceptType = "application/json";
  }

  const sigV4ClientConfig = {
    accessKey: config.accessKey,
    secretKey: config.secretKey,
    sessionToken: config.sessionToken,
    serviceName: "execute-api",
    region: config.region,
    defaultContentType: config.defaultContentType,
    defaultAcceptType: config.defaultAcceptType,
  };

  let invokeUrl;
  let authType = "NONE";
  if (
    sigV4ClientConfig.accessKey !== undefined &&
    sigV4ClientConfig.accessKey !== "" &&
    sigV4ClientConfig.secretKey !== undefined &&
    sigV4ClientConfig.secretKey !== ""
  ) {
    authType = "AWS_IAM";
    invokeUrl = config.invokeUrlIAM;
  } else {
    invokeUrl = config.invokeUrlToken;
  }

  // eslint-disable-next-line no-useless-escape
  const endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
  sigV4ClientConfig.endpoint = endpoint;

  const pathComponent = invokeUrl.substring(endpoint.length);

  const simpleHttpClientConfig = {
    endpoint,
    defaultContentType: config.defaultContentType,
    defaultAcceptType: config.defaultAcceptType,
  };

  const apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(
    simpleHttpClientConfig,
    sigV4ClientConfig
  );

  apigClient.cOptions = (params, body, additional) => {
    const additionalParams = additional || {};

    apiGateway.core.utils.assertParametersDefined(params, ["model"], ["body"]);

    const optionsRequest = {
      verb: "options".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/c").expand(
          apiGateway.core.utils.parseParametersToObject(params, ["model"])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body,
    };

    return apiGatewayClient.makeRequest(
      cOptionsRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.modelOptions = (params, body, additionalParams) => {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(params, [], ["body"]);

    var modelOptionsRequest = {
      verb: "options".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/{model}").expand(
          apiGateway.core.utils.parseParametersToObject(params, [])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body,
    };

    return apiGatewayClient.makeRequest(
      modelOptionsRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.modelDelete = (params, body, additionalParams) => {
    if (additionalParams === undefined) {
      additionalParams = {};
    }
    apiGateway.core.utils.assertParametersDefined(params, ["model"], ["body"]);
    const modelRequest = {
      verb: "delete".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/{model}").expand(
          apiGateway.core.utils.parseParametersToObject(params, ["model"])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body,
    };
    return apiGatewayClient.makeRequest(
      modelRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.modelGet = (params, body, additionalParams) => {
    if (additionalParams === undefined) {
      additionalParams = {};
    }
    apiGateway.core.utils.assertParametersDefined(params, ["model"], ["body"]);
    const modelRequest = {
      verb: "get".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/{model}").expand(
          apiGateway.core.utils.parseParametersToObject(params, ["model"])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body,
    };
    return apiGatewayClient.makeRequest(
      modelRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.modelPatch = (params, body, additionalParams) => {
    if (additionalParams === undefined) {
      additionalParams = {};
    }
    apiGateway.core.utils.assertParametersDefined(params, ["model"], ["body"]);
    const modelRequest = {
      verb: "patch".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/{model}").expand(
          apiGateway.core.utils.parseParametersToObject(params, ["model"])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body,
    };
    return apiGatewayClient.makeRequest(
      modelRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.modelPost = (params, body, additionalParams) => {
    if (additionalParams === undefined) {
      additionalParams = {};
    }
    apiGateway.core.utils.assertParametersDefined(params, ["model"], ["body"]);
    const modelRequest = {
      verb: "post".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/{model}").expand(
          apiGateway.core.utils.parseParametersToObject(params, ["model"])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body,
    };
    return apiGatewayClient.makeRequest(
      modelRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  apigClient.modelPut = (params, body, additionalParams) => {
    if (additionalParams === undefined) {
      additionalParams = {};
    }
    apiGateway.core.utils.assertParametersDefined(params, ["model"], ["body"]);
    const modelRequest = {
      verb: "put".toUpperCase(),
      path:
        pathComponent +
        uritemplate("/{model}").expand(
          apiGateway.core.utils.parseParametersToObject(params, ["model"])
        ),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body,
    };
    return apiGatewayClient.makeRequest(
      modelRequest,
      authType,
      additionalParams,
      config.apiKey
    );
  };

  return apigClient;
}

```



##### Success handling

A successful API response will return the following standardized success response template:

```JSON
{ statusCode, item, items, LastEvaluatedKey }
```

The API may return one or more of those keys at once, and may return additional keys not listed above..



**item and items**
For most form operations, the API will return `{ item: item_object }` or `{ items: items_array }`. In those cases, the result should be merged into the view.

For lists, if the backend has additional items, pagination is managed using "LastEvaluatedKey".



##### Error handling

There are *expected* errors, where the backend returns an "error" without breaking the app, like "not found" or "expired", if the user tries to access something that is not/no longer available. Those should show as banner or modal without the need to re-render.

There can also be *unexpected* errors, caused by, e.g. bugs, backend issues, frontend issues, or network/infrastructure issues. Those must be handled gracefully with meaningful UI, and must not break the app.



An expected backend error will return the following error response template from the API:

```JSON
{ statusCode, error, errorDetails }
```

However, there can be unexpected backend errors returned from AWS services that can vary in format and are hard to predict. It is best to define the *expected* result for success and error, and handle anything *unexpected* as special error.

If an error occurs show the error message (or, if no message is available, show "something went wrong", and stringify the actual error if any) in a banner or modal center screen that can be closed by tapping it.

Show form validation errors directly underneath the form field that failed validation.

The "statusCode" has no function in this sprint but is included for future reference.



Errors must never break the app and must be handled gracefully, either through a custom class component [https://reactjs.org/docs/error-boundaries.html](https://reactjs.org/docs/error-boundaries.html), or a library implementation, e.g. [https://www.npmjs.com/package/react-error-boundary](https://www.npmjs.com/package/react-error-boundary).



##### Date/time

All dates are managed as epoch seconds (number) and in the client displayed based on local browser time zone settings.




##### Role based access

All routes in this app are authenticated. Additionally, role based access is controlled using AWS Cognito groups (`cognito authorizer.claims["cognito:groups"]`).

For this sprint, roles include "patron", "merchant", and "location". Each authenticated user can me member of one group.

Group membership is relevant for available routes and headers.



#### Style

The website must be mobile first, and render as well on tablet and desktop. The default view mode is portrait. On tablet and desktop the site content should be centered in the browser.

The website should use bootstrap, [material UI](https://github.com/material-components/material-components-web) and Google's [Baloo Chettan 2](https://fonts.google.com/specimen/Baloo+Chettan+2) font family (included as direct dependency, not via CDN).



##### Size and Measurements

Measurement and size of objects specified here are based on an example screen (Google Pixel 3 XL) (1440 x 2960 pixels) and must be scaled to fit the target (mobile) screen.

On tablet/desktop, show the mobile screen in a centered container.
Do no rearrange views based on screen size.



##### Forms and validation

A library may be used for form and validation, e.g. [https://github.com/react-hook-form/react-hook-form](https://github.com/react-hook-form/react-hook-form). There is also a form builder tool: [https://react-hook-form.com/form-builder](https://react-hook-form.com/form-builder).

Invalid input should change the cell's frame color to red, and show a red validation error underneath the cell.

![](https://img.favr.town/spec/invalid_input_example.jpg)



##### Colors

White background, with light/dark-grey to black fonts and icons. Background artwork will be often line-art, primarily grey-scale with some color accents.



##### Transitions

Views should transition so that when going forward, the new view slides in from the right, and when going back, the current view slides away to the right. 

Simple example: [https://codesandbox.io/s/react-router-animation-working-06mrd](https://codesandbox.io/s/react-router-animation-working-06mrd)

Each view will have a line-art header asset, that is also used reversed and compressed in the footer. The asset will vary for each screen based on the continuous line, and the slide animation would create sense of continuity.



##### Style examples

Style examples for text and forms will be provided outside this document.



### Application/Story requirements


**Session management** and token renewal is critical. 

If necessary (expired, invalid, or missing session), the app must redirect to [/signin](/signin), create/refresh the session, and come back to where the missing/expired session was detected.

Each time the app is opened, even if a valid session exists, the cached user profile must be renewed by calling `/init GET`.



**Routing** is critical. Do not use "hash" routes. 

This sprint must implement a simple but solid router that allows for:

- each view can be reached directly (if necessary with a redirect to [/signin](/signin) and back) 
- views can parse and use url and query parameters to update their state when reached
- views can survive a page reload
- standard browser navigation back/forward can be used, in addition to a "back" button/icon

This first sprint also defines styles and CSS, the overall structure and best practices for the project, and prepares the build scripts.



All routes in the application are assumed authenticated. 

Each time a session is established or refresh, call `/init GET` and cache the response item (user profile).



**Asset management** This sprint implements effective asset management/ caching. Backend assets will come with `Cache-Control` headers. Some assets (logo, icons) will be included with the build package. 



#### Standard Header

All views share a standard header and footer with elements based on requestor role.

Background images for each header and footer is a static svg asset associated with the view's url. 

Headers and footers don't move on scroll.



##### neutral header (no role/ before signin)

This header is used for views that may not provide a `/init GET` result.
The header does not move on scroll, and it's height is 20% of the screen with.



![](https://img.favr.town/spec/neutral-header.svg)



Elements:

| id | element | type | source/asset | event |
| ---- | ---- | ---- | ---- | ---- |
| 1 | favr.town logo | image |  | `onClick()` route to [https://favr.town](https://favr.town) |
| 2 | header image | image |  | n/a  |



##### patron header

On [/p](/p), show header A, all other views show header B.
The header does not move on scroll, and it's hight is 20% of the screen with.



![](https://img.favr.town/spec/patron-header.svg)



Elements:

| id | element | type | source/asset | event |
| ---- | ---- | ---- | ---- | ---- |
| 1 | profile | image | API response `item.profilePicture`, or placeholder asset: "" | n/a |
| 2 | question mark icon | button | (see "help content" section) | (see "help content" section)                                 |
| 3 | hamburger icon | button | icon | only visible on [/p](/p)<br /><br />`onClick()` route to [/p/account](/p/account) |
| 3 | back | button | icon | visible on any route except [/p](/p)<br /><br />`onClick()` go back (if there's a back route), otherwise route to: [/p](/p) |
| 4 | favr.town | static string | "favr.town" | `onClick()` route to [https://favr.town](https://favr.town) |
| 5 | favr | number, read-only | API response `favr.favr` | n/a |




##### merchant/location  header

On [/m](/m), show header A, all other views show header B.
The header does not move on scroll, and it's height is 20% of the screen with.



![](https://img.favr.town/spec/merchant-header.svg)



Elements:

| id | element | type | source/asset | event |
| ---- | ---- | ---- | ---- | ---- |
| 1 | favr.town logo | image |  | `onClick()` route to [https://favr.town](https://favr.town) |
| 2 | header image | image |  | n/a  |
| 3 | question mark icon | button | (see "help content" section) | (see "help content" section)                                 |
| 4 | logo | image | API response `item.logo`, or placeholder asset: "" | n/a |
| 5 | hamburger icon | button | icon | only visible on [/m](/m)<br /><br />`onClick()` route to [/m/account](/m/account) |
| 6 | back | button | icon | visible on any route except [/m](/m)<br /><br />`onClick()` go back (if there's a back route), otherwise route to: [/m](/m) |



#### Standard footer

The footer mirrors the header background image, and may have additional elements based on each view. The footer aligned with the bottom of the screen, does not move on scroll, and it's height is 15% of the screen with.

It contains the following elements:

Elements:

| id | element | type | source/asset | details |
| --- | ------ | ---- | ------------ | ------- |
| 1 | footer image | image/included | | |
| 2 | (optional buttons) | | | (view specific) |



The footer may include additional elements based on the view.



## Tasks

This sprint delivers the core application as PWA with installation prompts, user sign-in/sign-out, account management, session management, API integration, routing, basic view templates, and overall architecture to support the remaining user stories.



### Create App Structure

Create core application (PWA) from scratch with latest dependencies, layered architecture, prepare `constants` and `services` folders.

Add router and browser history.



### Create components and services

Add AWS integration (Amplify, API Gateway).

Add other global components and services (logger, spinner, notification/message banner) as needed to support the views/stories in this specification.



### Create routes and views

Create all views as described in the "Routes in this sprint" section with focus on extendibility.



### Optimize Progressive Web App (PWA)

Optimize the progressive web app (LightHouse).



## Routes in this sprint




### [/](/)

This is the root of the application. It has no user interaction and simply routes to the next view based on client-side validation. 

The view shows a circle animation (global spinner component) while the route is determined (see: *when reached*).



*when reached*

Route based on (a) existing session, and (b) existing query parameters

![](https://img.favr.town/spec/architecture-auth_redirects.svg)

(a) Determine if valid session, then redirect based on result. If false, route to [/signin](/signin).
**keep all query parameters**

If true, continue with (b).

(b) Determine if existing query parameters. 

(c) Route based on query parameters if any. 
*Those routes are out of scope for this sprint, just prepare and comment out this logic*.

(d) Route based on `cognito authorizer.claims["cognito:groups"]` to [/p?{params}](/p?{params}) ("patron" role) or [/m?{params}](/m?{params}) ("merchant" and "location" roles). **keep all query parameters**



### [/signin](/signin)

This unauthenticated view consists of a form with validation, a "forgot password" button, a "signup" button, and a "join" button.



*when reached*

Render contend.

**keep all query parameters**




***header***

(neutral header)



***content***

![](https://img.favr.town/spec/signin.svg)

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 0 | background | image |  | n/a |
| 1 | login | text input | query parameter "login", or empty | when changed, validate against `^.{4,}$` |
| 2 | password | text input | empty | when changed, validate against `^.{6,}$`  |
| 3 | forgot password | button | icon, disabled unless "login" validates | open "forgot password" modal |



A library may be used for form and validation, e.g. [https://github.com/react-hook-form/react-hook-form](https://github.com/react-hook-form/react-hook-form). There is also a form builder tool: [https://react-hook-form.com/form-builder](https://react-hook-form.com/form-builder).



***footer***

![](https://img.favr.town/spec/signin-footer.svg)


This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | footer image | image |  | n/a |
| 2 | JOIN | button | disabled unless "login" is empty | route to [https://favr.town/join?{params}](https://favr.town/join?{params}) (production), <br />or<br />[https://dev.favr.town/join?{params}](https://dev.favr.town/join?{params}) (development) |
| 3 | SIGNIN | button | disabled unless both "login" and "password" validate | try to authenticate. <br /><br />If authentication fails, clear "password", and show error.<br />If the authentication succeeds, route to [/p](/p) for patron role, or [/m](/m) for merchant/location role. Keep all query parameters. |



####  "forgot password" modal

![](https://img.favr.town/spec/signin-modal.svg)


This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | back | button | icon | `onClick()` close modal |
| 2 | login or email | text input | query parameter "login", or "login" from view form, or empty | when changed, validate against either `^.{4,}$` (login) or `^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$` (email) |
| 3 | static text | string |  | |
| 4 | request | button | disabled unless "login or email" validates | call `/signup PUT` with `{ body: { email: email, login: login } }` (either login or email based on validation)<br /><br />based on result either show "incorrect login or email" error, or, on success, show the success message and close the modal |



### [/terms](/terms)

*when reached*

Call `/terms GET`.

This will return:
```json
{ item: { service, privacy }}
```




***header***

(patron or merchant header B)



***content***

![](https://img.favr.town/spec/terms.svg)



Elements

| id | element | source | event |
| -- | ------- | ------ | ----- |
| 1  | label | "TERMS OF SERVICE" | |
| 2  | terms of service text rendered honoring line breaks | item.service | |



***footer***

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | footer image | image |  | n/a |



#### support modal

Support request modal that can be opened from various views by clicking a support button in the footer.


![](https://img.favr.town/spec/support.svg)

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | close | button | icon | `onClick()` close the modal |
| 2 | request | multi-line string input | empty | validate as `{ "type": "string", "minLength": 2, "maxLength": 500 }` |
| 3 | contact support | button | disabled unless "request" validates | call `/support PATCH` with `{ body: { message: request, url: this_view_url }}` |

Show the API response success/error, and close the modal when the response banner is clicked.



#### are you sure modal

Flexible "are you sure" modal with a text, "cancel" and "confirm" buttons, that can be used on different views to confirm user actions. 

![](https://img.favr.town/spec/are_you_sure_modal.svg)

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | text | string, multi-line, read-only, optional |  |  |
| 2 | cancel | button |  | `onClick()` return false and close |
| 3 | confirm | button |  | `onClick()` return true and close |

If no "text" is provided, simply show "ARE YOU SURE" with both buttons.



### [/privacy](/privacy)

*when reached*

Call `/terms GET`.

This will return:
```json
{ item: { service, privacy }}
```




***header***

(patron or merchant header B)



***content***

![](https://img.favr.town/spec/privacy.svg)



Elements:

| id   | element | source | event |
| ---- | ------- | ------ | ----- |
| 1 | label | "PRIVACY POLICY" | |
| 2 | privacy text rendered honoring line breaks | item.privacy |



***footer***

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | footer image | image |  | n/a |



### [/confirm](/confirm)

This view allows a user to confirm their account. While all stories are available without confirmation, unless the account is confirmed, [/p/profile](/p/profile) and [/m/profile](/m/profile) must redirect to [/confirm](/confirm).



***header***

(patron or merchant header B)



***content***

![](https://img.favr.town/spec/confirm.svg)

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 0 | background | image |  | n/a |
| 1 | email | string read-only | `item.email` from `/init GET` result | n/a |
| 2 | code | string | from "code" query parameter, or empty | validate as not empty |



***footer***

![](https://img.favr.town/spec/confirm-footer.svg)


This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | new code | button |  | call `/confirm?code=new` GET |
| 2 | confirm | button | disabled unless "code" validates as not empty | call `/confirm?code=code` GET |
| 3 | footer image | image |  | n/a |

Show success or error based on API result.



### [/password](/password)

Allow the user to set a new password.

/m/account)



***header***

(patron or merchant header B)



***content***

![](https://img.favr.town/spec/password.svg)

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 0 | background | image |  | n/a |
| 1 | password | text input | empty | when changed, validate against `^.{6,}$` |
| 2 | update | button | disabled unless "password" validates | `onClick()` call `/confirm PATCH with { body: { password }}` |

Show error or success result, then go back.


***footer***

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | footer image | image |  | n/a |



### [/email](/email)

Allow the user to set a new email (this also resets the confirmation flag in the backend).



***header***

(patron or merchant header B)



***content***

![](https://img.favr.town/spec/email.svg)

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 0 | background | image |  | n/a |
| 1 | email | text input | empty | when changed, validate against `^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$` |
| 2 | request code | button | disabled unless "email" validates | `onClick()` call `/confirm PATCH with { body: { email }}` |
| 3 | warning text | static string |  | n/a |
| 4 | code | string | empty | validate as not empty |
| 5 | confirm | button | disabled unless both "email" and "code" validate | `onClick()` call `/confirm?code=code GET` |

Show error or success result, then go back.

***footer***

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | footer image | image |  | n/a |



### [/p](/p)

This is the authenticated patron's homepage. This sprint will only provide basic features and navigation, with the "stories" sprint completing the view.



*when reached*

Get/update the user's profile by calling `/init GET`. 
This returns `{ item, notifications, flags, favr }`.

Keep as state/cache.



Example result:

```json
{
  "timeStamp": "1620144301814",
  "item": {
    "email": "qqan@outlook.com",
    "favr": 6,
    "favr_hours": 73,
    "favr_level": 2,
    "favr_lifetime_consumption": 120,
    "favr_multi": 1,
    "favr_score": 0,
    "favr_town": 780,
    "firstName": "Lulu",
    "lastName": "An",
    "latest_news": 1619471258,
    "login": "qqanny",
    "pk": "patron#951c8fa3-e9f6-44aa-aad4-304c0c5256de",
    "sk": "profile",
    "zip": "10035"
  },
  "favr": {
    "favr": 6,
    "favr_town": 780
  },
  "flags": {
    "couponbook": true,
    "flag_confirmed": false,
    "flag_new_conversation": true,
    "flag_new_refill": true,
    "flag_personal_update": 1620230701,
    "flag_show_help": true
  },
  "notifications": [
    "favr refilled, with 1 bonus!"
  ]
}
```





***notifications***

`/init GET` result may include a "notifications" array that is used to show banner notifications when the view is reached.

If included and not empty, show items similar to "message" but do not auto-close (only close when clicked).

Show all items at the same time one below the other.



***header***

(patron header A)



***content***

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 0 | background | image |  | n/a |

This view will be extended in a later sprint.



***footer***

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | footer image | image |  | n/a |



### [/p/account](/p/account)

*Instead of [/p/account](/p/account) we can use just [/account](/account) and determine the view content based on  `cognito authorizer.claims["cognito:groups"]`: [/p](/p) (role === "patron"), or [/m](/m) ("merchant" or "location" role)*



Main account view where a "patron" can change password/email, update their profile, or close their account.



***header***

(patron header B)



***content***

![](https://img.favr.town/spec/p_account.svg)

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 0 | background | image |  | n/a |
| 1 | change password | button |  | `onClick()` route to [/password](/password)                  |
| 2 | change email | button |  | `onClick()` route to [/email](/email) |
| 3 | profile | button | currently disabled, will be added in the "stories" sprint | `onClick()` route to [/p/profile](/p/profile) |
| 4 | profile complete | icon | `init.item.flag_profile_complete: boolean`, if true, show green checkmark, else show red cross |  |
| 5 | close account | button |  | `onClick()` show an "are you sure" modal with text "Closing your account is final and cannot be reversed.". If confirmed, call `/confirm DELETE` with `{ body: { message: "closed by user" }}` |
| 6 | terms | string | "(c) 2021, favr.town. terms, privacy, acknowledgements."<br /><br />year must be dynamic based on client browser local date, "terms" links to [/terms](/terms), "privacy" links to [/privacy](/privacy), and "acknowledgements" opens a modal and list direct dependencies with their licenses (see section "Build")<br /><br />align on the bottom above the footer | (redirects) |

***footer***

![](https://img.favr.town/spec/account_footer.svg)

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | footer image | image |  | n/a |
| a | terms | button | icon | `onClick()` route to [/terms](/terms) |
| b | support | button | icon | `onClick()` open the **support modal** |
| c | sign out | button | icon | `onClick()` sign out, then route to [/signin](/signin) |



#### acknowledgements modal

This modal uses data from the `licenses.json` file created during the build (see "Build" section).

![](https://img.favr.town/spec/ack_modal.svg)

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | back | button | icon | `onClick()` close modal |
| 2 | header | string + heart icon | `We <span className="material-icons color-icon--red text-icon">favorite</span> open source` | n/a |
| 3 | list item | panel | (`licenses.json` file) | `onClick()` open `"licenseUrl"` if exists, otherwise open `"repository"` if exists, otherwise do nothing. |



Example modal (from another project, can be modified and integrated):

```JavaScript
import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import licenses from '../../licenses.json';
import './style.css';

function OpenSourcePopup ({status, dispatch}) {
    const handleClosePopup = useCallback(()=>{ 
        dispatch('close');
    }, [ dispatch]);

    const parseSourceName = useCallback((name)=>{
        const splitedName = name.split('@');
        return splitedName[0];
    }, []);

    const clickURL = useCallback((url)=>{ 
        const a = document.createElement('a');
        a.target = '_blank';
        return ()=>{
            a.href= url;
            a.click();
        }
    }, []);

    return <div className={`popup-conatianer ${(status == 'open'?' open':' close')}`}>
        <div className="visual-overlay" onClick={handleClosePopup} />
        <div className="popup-box">
            <div className="popup-header">  
                <button class="mdc-icon-button material-icons" onClick={handleClosePopup}> <div class="mdc-icon-button__ripple" /> close </button>
            </div>
            <div className="popup-content">
                <p className="mdc-typography--headline5 text-align-center uppercase-text"> We <span className="material-icons color-icon--red text-icon">favorite</span> open source </p>
                <ul className="mdc-list">
                    {Object.keys(licenses).map((itemKey) => (<li className="mdc-list-item" key={itemKey}>
                        <span className="mdc-list-item__ripple" />
                        <div className="list-container" onClick={clickURL(licenses[itemKey].repository)}>
                            <p className="mdc-typography--body1"> {parseSourceName(itemKey)} </p>
                            <p className="mdc-typography--body1" style={{marginTop:0}}> {licenses[itemKey].licenses} </p>
                        </div>
                    </li>))}
                </ul>
            </div>
        </div>
    </div>
}

export default OpenSourcePopup;
```

```CSS

.popup-conatianer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: none;
    z-index: 100;
}
.popup-conatianer.open {
    display: block;
}
.popup-conatianer .visual-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(10, 10, 10, 0.3);
    width: 100%;
    height: 100%;
    z-index: 4;
}
.popup-conatianer  .popup-header {
    text-align: right;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
.popup-conatianer .popup-box {
    position: absolute;
    top: 50%;
    max-width: 800px;
    background-color: #ffffff;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    min-width: 250px;
    padding: 0px 15px 15px 25px;
    width: 100%;

}
.popup-content .mdc-list-item, .popup-content .list-container {
    width: 100%;
}
.popup-content .text-icon {
    display: inline-block;
    vertical-align: middle;
}
.color-icon--red {
    color: #993311;
}
.popup-content .mdc-list-item {
    margin-bottom: 15px;
    background-color: #eeeeee;
    text-transform: uppercase;
    padding-top: 10px;
    padding-bottom: 10px;
}
.popup-content .mdc-list-item .mdc-typography--body1 {
    line-height: 1.5;
}

@media screen and (max-width: 768px) {
    .popup-conatianer .popup-box {
        max-width: 95%;
    }
}
```

### [/m](/m)

This is the homepage for authenticated "merchant" or "location". This sprint will only provide basic features and navigation, with the "stories" sprint completing the view.



*when reached*

Get/update the user's profile by calling `/init GET`. 
This returns `{ item, notifications, flags, favr }`.

Keep as state/cache.



`/init GET` result may include a `notifications[]` array of string. If so, show each notification string in a message banner/modal that can be closed






***header***

(merchant header A)




***content***

![](https://img.favr.town/spec/merchant-m.svg)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 0 | background | image |  | n/a |
| 1 | label | static text | "A Favr.Town Must" | n/a |
| 2 | banner | image | | n/a |
| 3 | Business Name | read-only string | `item.businessName` from `/init GET` result | n/a |
| 4 | follower | icon | | n/a |
| 5 | follower_count | number | `item.stat_patron` from `/init GET` result | n/a |



***footer***

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | footer image | image |  | n/a |



### [/m/account](/m/account)

*Instead of [/m/account](/m/account) we can use just [/account](/account) and determine the view content based on  `cognito authorizer.claims["cognito:groups"]`: [/p](/p) (role === "patron"), or [/m](/m) ("merchant" or "location" role)*



Main account view where a "merchant" can change password/email, update their profile, or close their account.

The "location" role has the same view except "locations", "profile", and "close account" buttons are disabled.




***header***

(merchant header B)



***content***

![](https://img.favr.town/spec/m_account.svg)

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 0 | background | image |  | n/a |
| 1 | change password | button |  | `onClick()` route to [/password](/password)                  |
| 2 | change email | button |  | `onClick()` route to [/email](/email) |
| 3 | locations | button | currently disabled, will be added in the "stories" sprint | `onClick()` route to [/locations](/locations) |
| 4 | locations complete | icon | `init.item.flag_locations_complete: boolean`, if true, show green checkmark, else show red cross |  |
| 5 | profile | button | currently disabled, will be added in the "stories" sprint | `onClick()` route to [/m/profile](/m/profile) |
| 6 | profile complete | icon | `init.item.flag_profile_complete: boolean`, if true, show green checkmark, else show red cross |  |
| 7 | close account | button |  | `onClick()` show an "are you sure" modal with text "Closing your account is final and cannot be reversed.". If confirmed, call `/confirm DELETE` with `{ body: { message: "closed by user" }}` |
| 8 | terms | string | "(c) 2021, favr.town. terms, privacy, acknowledgements."<br /><br />year must be dynamic based on client browser local date, "terms" links to [/terms](/terms), "privacy" links to [/privacy](/privacy), and "acknowledgements" opens a modal and list direct dependencies with their licenses (see section "Build")<br /><br />align on the bottom above the footer | (redirects) |



***footer***

![](https://img.favr.town/spec/account_footer.svg)

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | footer image | image |  | n/a |
| a | terms | button | icon | `onClick()` route to [/terms](/terms) |
| b | support | button | icon | `onClick()` open the **support modal** |
| c | sign out | button | icon | `onClick()` sign out, then route to [/signin](/signin) |






## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg). 

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).



root url: `https://img.favr.town/app`

| view url | header | content | footer |
| ---- | ---- | ---- | ---- |
| /signin | /signin-hd.png | /signin-bg.png | /signin-ft.png |
| /terms | /terms-hd.png | /terms-bg.png | /terms-ft.png |
| /privacy | /privacy-hd.png | /privacy-bg.png | /privacy-ft.png |
| /confirm | /confirm-hd.png | /confirm-bg.png | /confirm-ft.png |
| /password | /password-hd.png | /password-bg.png | /password-ft.png |
| /email | /email-hd.png | /email-bg.png | /email-ft.png |
| /p | /p-hd.png | /p-bg.png | /p-ft.png |
| /p/account | /p-account-hd.png | /p-account-bg.png | /p-account-ft.png |
| /m | /m-hd.png | /m-bg.png | /m-ft.png |
| /m/account | /m-account-hd.png | /m-account-bg.png | /m-account-ft.png |



## Icons

Standard bootstrap icons are used with the exception of a few custom icons, mostly in the footer. Assets for custom icons are temporary and will be replaced with final artwork later (svg). 

Icons should be included with the build, and svg-formatted icons should (custom svg: later) be included as code.



| icon | source | view url(s) |
| ---- | ---- | ---- |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |



## Resources and Reference

progressive web app (PWA)

https://chrome-enterprise-workshops.web.app/labs/pwa-workshop/#0
https://www.youtube.com/playlist?list=PLNYkxOF6rcIB2xHBZ7opgc2Mv009X87Hh
https://web.dev/progressive-web-apps/

installation prompt
[https://web.dev/customize-install/](https://web.dev/customize-install/)
[https://developers.google.com/web/ilt/pwa](https://developers.google.com/web/ilt/pwa)
[https://medium.com/@michael.lisboa/a-simple-react-hook-to-prompt-ios-users-to-install-your-wonderful-pwa-4cc06e7f31fa](https://medium.com/@michael.lisboa/a-simple-react-hook-to-prompt-ios-users-to-install-your-wonderful-pwa-4cc06e7f31fa)

form validation
[https://codeburst.io/how-to-use-html5-form-validations-with-react-4052eda9a1d4](https://codeburst.io/how-to-use-html5-form-validations-with-react-4052eda9a1d4)

style
[material UI](https://github.com/material-components/material-components-web)
[Baloo Chettan 2](https://fonts.google.com/specimen/Baloo+Chettan+2)

