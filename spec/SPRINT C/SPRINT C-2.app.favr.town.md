# FAVR.TOWN

Specification
10/09/2021

Project repository:
[ssh://git-codecommit.us-east-2.amazonaws.com/v1/repos/favr.town.frontend.app](ssh://git-codecommit.us-east-2.amazonaws.com/v1/repos/favr.town.frontend.app)

Status:
**FINAL**



## Summary

This document describes a progressive web application to provide an authenticated website with user stories based on user role.

Roles include "patron", "merchant", and "location" (=restricted merchant).



### Tasks

This sprint extends the existing application with "location" and merchant" user stories. "location" stories are based on "merchant" stories (the views are identical but may have disabled or inactive/hidden elements for the "location" role).



#### General

Point out any bugs/issues/improvements found during review/implementation of this specification.



#### Create/update routes and views

Carefully extend the existing application with the views and functionality described in this document.



#### Optimize Build

- Update dependency versions, PWA configuration, and build scripts as needed
- resolve build warnings/errors (if any)
- resolve console warnings/errors (if any)



### Delivery

This sprint delivers a working and tested state-of-the-art optimized Progressive Web Application (ReactJS), as described below, to serve the dynamic responsive site [https://[dev-]app.favr.town/](https://[dev-]app.favr.town/), including all project source and build configuration files, 3rd party libraries, assets, and applicable documentation, optimized for current browsers (Chrome, Firefox, Safari), mobile first, with support for current mobile (Android and iOS), tablet, and desktop viewing modes, and following industry best practices.



## Routes in this sprint

Routes in this sprint are "merchant stories" and apply to the "merchant" user role.

In this document, the user role(s) each route is available is listed after the colon ":".



### [/p](/p)

This sprint adds merchant lanes and search to the content section, and navigation buttons to the footer for this view.

*when reached*

As defined in a  previous sprint, get the user's profile by calling `/init GET`.  This returns `{ item, notifications, flags, favr }`. Keep as state/cache.
	
This sprint extends to also call `/settings GET` with `queryParams: { type: "app" }`.  

This returns (example): 

```json
{
  "timeStamp": "1619060989562",
  "item": {
    "source": {
      "lane": {
        "BAKERY": [
          "CAKE",
          "CUPCAKE",
          "BREAD"
        ],
        "FOOD": [
          "KOREAN",
          "ETHNIC",
          "DINER"
        ],
        "HAIR": [],
        "SPA": [
          "MASSAGE",
          "STEAM",
          "POOL"
        ]
      }
    }
  }
}
```

Use `Object.keys(item.source.lane)` for the tag-cloud in the view.



***header***

(patron header A)



***content***

The view has a search icon, and a central word-cloud of "lanes".

![](https://img.favr.town/spec/patron-p.svg)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | search | magnifying glass icon (material UI) |  | `onClick()` route to [/search](/search) |
| 2 | lanes | tag-cloud (example: [https://github.com/madox2/react-tagcloud](https://github.com/madox2/react-tagcloud)) of lanes |  | `onClick()` route to [/search?lane=lane](/search?lane=lane) |
| 3 | coupons | icon: material UI content cut with dotted svg line | not visible unless `/init GET` results includes `{ flags.couponbook: true }` | `onClick()` route to [/couponbook](/couponbook) |



***footer***

Add navigation shortcuts to the footer:

![](https://img.favr.town/spec/patron-p-footer.svg)

Elements:

| id   | element       | type   | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | merchants | button | `icon_logo.svg` | route to [/merchants](/merchants) |
| 2 | actions | button | `icon_action.svg` | route to [/actions](/actions) |
| 3 | news | button | `icon_news.svg` | route to [/news](/news) |
| 4 | conversations | button | `icon_message.svg` | route to [/conversations](/m/conversations) |
| 5 | qr | button | `icon_qr.svg` | route to [/qr](/qr) |



***"new" indicators***

Buttons can have a "new" indicator (red dot) based on `/init GET` result "flags" (show if true, hide if undefined/false):

| id   | element       | condition "new" indicator |
| ---- | ------------- | ------------------------- |
| 1    | program       | tbd                       |
| 2    | actions       | `"flag_new_action"`       |
| 3    | news          | `"flag_new_news"`         |
| 4    | conversations | `"flag_new_conversation"` |
| 5    | qr            | n/a                       |



*the SPRINT-B branch includes an example implementation of footer icons with "new" indicators*



*** notifications ***

`/init GET` result may include a "notifications" array of string that is used to show banner notifications when the view is reached.

If included and not empty, show items aligned right (with default padding) about 75$ of the width, with each string in a multi-line read-only string control. 

Show all items at the same time, overlapping, one slightly lower than the other.



![](https://img.favr.town/spec/notification.jpg)



***favr and favr_level***
if included with `/init GET` result, update the view and reflect with a simple CSS animation (flashing or quickly increasing/decreasing the font size for these values on `/p` for a configurable time (e.g. 3 seconds, config constant)).



### [/search](/search)

This view allows the patron to search merchant's by `businessName` or `lane`, and lists result in panels. Patrons can also submit a request to add a business not yet in favr.town.



*when reached*

**if no other query parameters exist**

Set focus to the search string input.



**if query parameters exist**

Search based on parameter:

| parameter | API call |
| ---- | ------------- |
| `lane` | `/merchant POST` with `{ body: { lane: lane } }` |
| `[lane, specialty]` | `/merchant POST` with `{ body: { lane: lane, specialty: specialty } }` |
| `businessName` | `/merchant POST` with `{ body: { businessName: businessName } }` |



**Pagination**

If the user scrolls down, and `LastEvaluatedKey` was present in the result, request the next page by resubmitting the API call and including  `LastEvaluatedKey` as `ExclusiveStartKey` with the request body. Merge the result into the view keeping the previous results.

Pagination can be tested by including { limit: 1 } with POST request body if more than one item exists in the backend.

*If the result list is empty, render as empty list with the following static text in the background: "(search results will appear here)". Make the static text a config constant for each list view.*



***header***

(patron header B)



***content***

![](https://img.favr.town/spec/patron-search.svg)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | Business Name | string | validate to min-length=3 | when changed, after being idle for 1500ms, call `/merchant POST` with `{ body: { businessName: search }}` |
| 2 | add | button |  | `onClick()` route to [/addmerchant](/addmerchant) |
| 3 | logo | image or placeholder | `items[].logo` | `onClick()` route to `items[].url` |
| 4 | businessName | string, read-only | `items[].businessName` | `onClick()` route to `items[].url` |
| 5 | tags | list of strings separated by "," | `items[].tags` | `onClick()` route to `items[].url` |



*There's a view in the "ssr" app illustrating the use of tags (`/m/{id}`).*



***footer***

(no additional elements)



### [/addmerchant](/addmerchant)

This view allows a patron to request favr.town to reach out and ask a merchant to join.

*when reached*

Call `/settings GET` with `queryParams: { type: "app" }`.

This returns (example): 

```json
{
  "timeStamp": "1619060989562",
  "item": {
    "source": {
      "lane": {
        "BAKERY": [
          "CAKE",
          "CUPCAKE",
          "BREAD"
        ],
        "FOOD": [
          "KOREAN",
          "ETHNIC",
          "DINER"
        ],
        "HAIR": [],
        "SPA": [
          "MASSAGE",
          "STEAM",
          "POOL"
        ]
      }
    }
  }
}
```

Use `Object.keys(item.source.lane)`as source for the "Product Lanes" dropdown input.



***header***

(patron header B)



***content***

![](https://img.favr.town/spec/patron-addmerchant.svg)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | Business Name | string, required | validate to min-length=2 |  |
| 2 | Product Lanes | array of string, required | dropdown, multi-select, data source: `/settings GET` with `queryParams: { type: "app" }`, validate to min-length=1 |  |
| 3 | Merchant email | string, required | validate as email, pattern `^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$` |  |
| 4 | Website | string, optional | validate to pattern `^https?://` |  |



***footer***

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | Request | button | existing "icon_upload" asset<br /><br />disabled unless form validates | `onClick()` show "ARE YOU SURE" modal with static config string `"This will send an email to the provided address, telling them about FAVR.TOWN, and giving them the opportunity to join.\r\n\r\nYou'll earn FAVR if they do."`, <br /><br />If confirmed, call `/merchant PUT` with `{ body: { attributes }}`. Show the response message, then go back. |



## Additional changes

This section describes a few small changes to the application outside specific routes.



### CSS: Fix the neutral header

Add a separate css class for the favr.town logo (don't use profileImage) that is shown on the /signin page before a user is authenticated. 



### CSS: Fix authenticated header

Fix the alignment of the profilePicture (patron role) or logo (merchant/location role) to align-left with the same padding as the X icon/ hamburger icon on the right, and adjust (?) icon and favr value position accordingly.



### CSS: Fix standard footer height

The footer needs to support the copyright line only on /p/account and /m/account, but must be lower on all other views (currently there is empty white space underneath the footer image).



### iPhone: Safari signin form keyboard issue

In Safari, when adding the app to the home screen, *the first time after opening the app* and clicking into the "Login" field, the virtual keyboard does not come up.

However, from the second time, the virtual keyboard does show.
Can this be fixed?



## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg). 

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).



root url: `https://img.favr.town/app`

| view url | content |
| ---- | ---- |
| /p | (special body styling) |
| /search | (special body styling) |
| /addmerchant | `/addmerchant-bg.png` |

