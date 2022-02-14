# FAVR.TOWN

Specification
08/27/2021

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



### [/p/profile](/p/profile)

*Instead of [/p/profile](/p/profile) we can use just [/profile](/profile) and determine the view content based on  `cognito authorizer.claims["cognito:groups"]`: [/p](/p) (role === "patron"), or [/m](/m) ("merchant" or "location" role)*

This view is for the patron to manage their personal information and profile picture.

There's no dedicated update or save button, instead, each time an input element is updated and loses focus, if the form validates, the client should call `/profile PATCH` with `{ body: attributes }` (include only changed attributes including empty/undefined) to update the backend asynchronously. 

*Images are an exception:* image (`item.profilePicture`) assets in this view are uploaded by calling `/image PATCH`, and removed by calling `/image DELETE`, however, the form's data model includes their public url instead. This should be a reusable component.

Ideally, the update does not block the client and remains transparent unless the backend returns an error.

*when reached*

This data is part of the cached `/init GET` result, however, to have the most current data, call `/profile GET` and populate the form with the result.

*also merge updates into the cached `/init GET` result*



`/init GET` result may include a `notifications[]` array of string. If so, show each notification string in a message banner/modal that can be closed



***header***

(patron header B)



***content***


![](https://img.favr.town/spec/p-profile.svg)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | profile picture | image | `item.profilePicture` if exist, otherwise placeholder | `onClick()` open "new profile picture" modal |
| 2 | Salutation | dropdown, string, required, source: ["Mr.", "Ms.", "Mrs."] | `item.salutation` | |
| 3 | First Name | string, optional | `item.firstName` |  |
| 4 | Last Name | string, optional | `item.lastName` |  |
| 5 | Phone number | string, optional | `item.cell` | masked input for US phone number, must result in format `+1 (999) 999-9999` to validate, then store as string. We can use [https://www.npmjs.com/package/react-intl-tel-input](https://www.npmjs.com/package/react-intl-tel-input) as inspiration but limit to US phone numbers only. **always minimize dependencies and package size** |
| 6 | accept birthday gift | toggle | `item.accept_gift_birthday` | when changed, show/hide `["birthday"]` |
| 7 | Birthday | date picker, optional unless `item.accept_gift_birthday` | `item.birthday` | when changed, convert to 12pm local time, then store as epoch/seconds number |
| 8 | accept mail-in rewards | toggle | `item.accept_gift_mailin` | when changed, show/hide `["street", "zip", "state", "city"]` |
| 9 | Street | string, optional unless `item.accept_gift_mailin` |  |  |
| 10 | Zip |  | string, optional unless `item.accept_gift_mailin` | (special handling see below) |
| 11 | State | string, force uppercase,  optional unless `item.accept_gift_mailin` |  |  |
| 12 | City | string, force uppercase, optional unless `item.accept_gift_mailin` |  |  |



*Special handling for "zip"*

When "zip" us updated and loses focus, call `/settings GET` with `queryParams: { type: "zip", id: (provided "zip" value as string)}`. 

If successful, the API will return the following (example request with `id: "10035"`):

```json
{
  "timeStamp": "1616204615055",
  "item": {
    "city": "NEW YORK",
    "country": "US",
    "lat": "40.801",
    "long": "-73.937",
    "state": "NY"
  }
}
```

Merge "city" and "state" into the form.

If "zip" is not found, the API will respond with `{ item: {}}`. 



There's no dedicated update or save button, instead, each time an input element is updated and loses focus, if the form validates, the client should call `/profile PATCH` with `{ body: attributes }` (include only changed attributes including empty/undefined)  to update the backend asynchronously. 

Only include the changed attributes with the request, and merge the result item back into the form. 


***footer***

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | footer image | image |  | n/a |



#### "new profile picture" modal

The modal allows the user the (a) remove an existing image, or (b) upload a new image.

![](https://img.favr.town/spec/news-image-modal.svg)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | back | button | icon | `onClick()` close the modal |
| 2 | image | cropper control | `item.profilePicture` |  |
| 3 | delete | button | disabled unless `item.profilePicture` |  |
| 4 | upload | button | disabled unless the cropper control has a new image | `onClick` call `/image PATCH` with `{ body: { image: image, type: "profile" }}` (include as png/base64 string (don't include encoding information, e.g. `data:image/png;base64,`, just the image string). This will return the uploaded image url - close the modal and show image in form. |


Use [https://www.npmjs.com/package/react-cropper](https://www.npmjs.com/package/react-cropper) or similar, and convert images based on "type":

"profile": resize (zoom) to fit 600x600



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
| 0 | background | image |  | n/a |
| 1 | search | magnifying glass icon (svg) |  | `onClick()` route to [/search](/search) |
| 2 | lanes | tag-cloud (example: [https://github.com/madox2/react-tagcloud](https://github.com/madox2/react-tagcloud)) of lanes |  | `onClick()` route to [/search?lane=lane](/search?lane=lane) |
| 3 | coupons | icon: scissors (svg) with svg line (see /couponbook) | not visible unless `/init GET` results includes `{ flags.couponbook: true }` | `onClick()` route to [/couponbook](/couponbook) |



***footer***

Add navigation shortcuts:

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



***notifications***

`/init GET` result may include a "notifications" array that is used to show banner notifications when the view is reached.

If included and not empty, show items similar to "message" but do not auto-close (only close when clicked).

Show all items at the same time one below the other.



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



***footer***

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | footer image | image |  | n/a |



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
| 1 | Request | button | disabled unless form validates | `onClick()` show "ARE YOU SURE" modal with static config string `"This will send an email to the provided address, telling them about FAVR.TOWN, and giving them the opportunity to join.\r\n\r\nYou'll earn FAVR if they do."`, <br /><br />If confirmed, call `/merchant PUT` with `{ body: { attributes }}`. Show the response message, then go back. |



### [/merchants](/merchants)

This view lists all merchants followed by a patron, and their reward status.

*when reached*

Call `/merchant POST` with `{ body: { type: "following"}}`.



If the list is empty, show static config string "(followed merchants will appear here)".



**Pagination**

If the user scrolls down, and `LastEvaluatedKey` was present in the result, request the next page by resubmitting the API call and including  `LastEvaluatedKey` as `ExclusiveStartKey` with the request body. Merge the result into the view keeping the previous results.

Pagination can be tested by including { limit: 1 } with POST request body if more than one item exists in the backend.

*If the result list is empty, render as empty list with the following static text in the background: "(search results will appear here)". Make the static text a config constant for each list view.*



***header***

(patron header B)



***content***

List of panels. Each panel represents a followed merchant item.

![](https://img.favr.town/spec/patron-merchants.svg)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | reward status | use `icon_logo.svg` as icon, plus a (partial) svg circle representing percent complete | `items[].reward_percent` |  |
| 2 | logo | image | `items[].logo` |  |
| 3 | businessName | string, multi-line, read-only | `items[].businessName` |  |
| 4 | tags | list of string separated by ","<br /><br />if an item starts with "##", replace "##" with "#", and format differently from other items (emphasize).<br /><br />(lanes start with "##", specialties start with "#") | `items[].tags` |  |

If a panel is clicked, route to `items[].url`.



***footer***

(no additional elements)



### [/merchants/{id}](/merchants/{id})

Merchant details.

*when reached*

***if no other query parameters exist except "id"***

Load requested patron by id by calling `/merchant GET` with query/path parameter `{ id: id }`.



***if other query parameters exist except "id"***

Other query parameters, if present, must be included, to orchestrate actions. Those could come from a QR code scan and the result would depend on backend validation.



**follow=true**

If present, add to the API call `/merchant GET` as query/path parameter `{ id: id, follow: "true" }`. Notice here "true" is type "string".



***header***

(patron header B)



***content***



![](https://img.favr.town/spec/patron-merchant-id.svg)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | logo | image | `item.logo` |  |
| 2 | businessName | string, multi-line, read-only | `item.businessName` |  |
| 3 | tags | list of string separated by "," | `items.tags` |  |
| 4 | about | single line string, shorten, and add ".." at the end | `item.about` | `onClick()` expand form to show 4 complete as multi-line string, also show 10-11 |
| 5 | followers | number | `item.stat_follower` |  |
| 6 | favr | number | `item.favr` |  |
| 7 | side-scrollable (if length > 4) list of reward status | icon, circle representing percent complete<br /><br />use `icon_logo.svg` as icon, plus a (partial) svg circle representing percent complete | `item.rule_rewards[].percent`<br /><br />use `icon_logo.svg` as icon, plus a (partial) svg circle | `onClick()` open the selected reward as "reward details" modal |
| 8 | vote | button |  | `onClick()` route to `item.url_vote` |
| 9 | suggest | button |  | `onClick()` route to `item.url_suggest` |
| 10 | album | side-scrollable list of images (if any), or hidden | `item.album[]` | hidden unless user clicks 4 to expand the about section, and `item.album.length` |
| 11 | my store | multi-line string | `item.my_store` if exist, or placeholder | `onClick()` open "select my store" modal |



***footer***

![](https://img.favr.town/spec/patron-merchant-id-footer.svg)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | follow/unfollow | icon | if `flags.following: true`, show a broken heart icon, otherwise a heart icon<br /><br />`icon_unfollow.svg` | `onClick()`, if `flags.following: true`, "unfollow" by calling `/merchant DELETE` with `{ body: { merchant_pk: item.pk }}`, otherwise "follow" by calling `/merchant GET` with queryParams `{ id: id, follow: "true" }`. |
| 2 | action | icon | `icon_action.svg` | `onClick()` route to `item.url_action` |
| 3 | news | icon | `icon_news.svg` | `onClick()` route to `item.url_news` |
| 4 | conversation | icon | `icon_message.svg` | `onClick()` route to `item.url_conversation` |
| 5 | share | icon | `icon_share.svg` | `onClick()`, call `/action PUT` with `{ body: { share: { pk: item.pk, sk: item.sk}}}`. <br /><br />This will return { item: { url }}. <br /><br />Copy `item.url` into clipboard, and show "url copied" message |

Calling `/merchant GET` or `/merchant DELETE` will return an updated `/merchant GET` result - merge into the view.



#### "reward details" modal

Modal to display (read-only) selected reward details (`item.rule_rewards[]`), and allow a patron to redeem the reward with the merchant.

```json
	(...)
	
    "rule_rewards": [
      {
        "favr": 2000,
        "sk": "WtpxsjTLC",
        "description": "buy one, get one",
        "redeem_by": 1621011905,
        "redeem": "available at all locations except Hell's Kitchen",
        "percent": 25,
        "url": "https://dev-app.favr.town/qr?merchant_pk=c272e5c2-ea69-4605-9489-816624ed731b&reward=WtpxsjTLC"
      }
    ],
    
    (...)
```

![](https://img.favr.town/spec/patron-reward-details.svg)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | back | button | icon | `onClick()` close modal |
| 2 | reward status | use `icon_logo.svg` as icon, plus a (partial) svg circle representing percent complete | `item.rule_rewards[].percent` |  |
| 3 | description | string, multi-line | `item.rule_rewards[].description` |  |
| 4 | redemption | string, multi-line, optional, don't show if empty | `item.rule_rewards[].redeem` |  |
| 5 | redeem by date | string, short-date | `item.rule_rewards[].redeem_by` |  |
| 6 | image | image | optional, don't show if empty | `item.rule_rewards[].image` |
| 7 | redeem | button | disabled unless `item.rule_rewards[].allow_redeem` | `onClick()` close modal and route to `item.rule_rewards[].url` |



#### "select my store" modal

Modal to display slocations, and allow a patron to select one as "my store".

![](https://img.favr.town/spec/patron-stores.svg)

When the modal opens, call `/location POST` with `{ body: { merchant_pk: item.pk }}` to retrieve a list of locations for this merchant.

If the result list is empty, show static config text "locations will appear here", else render the result list as panels.

*this endpoint does not support pagination and will return a complete list with a single call*



Example result:
```json
{
  "timeStamp": "1619371831302",
  "items": [
    {
      "id": 1617158268,
      "store": "LarrosaTek Inc\n5th Ave\nNew York, NY 10035"
    }
  ]
}
```



Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | back | button | icon | `onClick()` close modal |
| 2 | label | string |  |  |
| 3 | panel | string, multi-line | `items[].store` | `onClick()` close the modal and call `` with ``. This will return `/merchant GET` result plus a message - merge into the view, and show message |



### [/couponbook](/couponbook)

This view is based on the [/news](/news) view, however, it only shows a patron's clipped coupons.



*when reached*

Call `/coupon POST`, then populate the view based on the result. This will return a paginated list of items, or `{ items: [] }`.

If the list is empty, show static config string "clipped coupons will appear here.
Otherwise render the items based on the  [/news](/news) view with minor changes.

**This view does not currently support pagination and will return all items with a single request.**



***header***

(patron header B)



***content***

List of panels. Each panel representing a coupon item. Panels are read-only except for 3 buttons.

![](https://img.favr.town/spec/patron-couponbook.svg)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | icon, line | svg | scissors icon, dotted line around the item |  |
| 2 | text | string, multi-line | `items[].text` |  |
| 3 | url | string | `items[].url`, hide if empty |  |
| 4 | redeem | string, multi-line | `items[].redeem` |  |
| 5 | redeem_by | string, short date/time | `items[].redeem_by` |  |
| 6 | image | image | `items[].image`, hide if empty. |  |
| 7 | delete | button | trash icon<br /><br />don't show unless `items[].flag_allow_remove` | `onClick()` call `/coupon DELETE` with `{ body: { id: items[].id }}`. |
| 8 | redeem_button | button | disabled unless `items[].flag_allow_redeem` | `onClick()` route to `items[].redeem_url` |
| 9 | share | button | `icon_share.svg` | `onClick()`, call `/action PUT` with `{ body: { share: { pk: items[].pk, sk: items[].sk}}}`. <br /><br />This will return { item: { url }}. <br /><br />Copy `item.url` into clipboard, and show "url copied" message |



***footer***

(no additional elements)



## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg). 

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).



root url: `https://img.favr.town/app`

| view url | content |
| ---- | ---- |
| /p/profile | `/profile-p-bg.png` |
| /p | (special body styling) |
| /search | (special body styling) |
| /addmerchant | `/addmerchant-bg.png` |
| /merchants | `/merchant-bg.png` |
| /couponbook | `/couponbook-bg.png` |




## Icons

Standard bootstrap icons are used with the exception of a few custom icons, mostly in the footer. Assets for custom icons are temporary and will be replaced with final artwork later (svg). 

Icons (svg) must be included with the build as constants.
