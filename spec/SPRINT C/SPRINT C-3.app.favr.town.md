# FAVR.TOWN

Specification
10/04/2021

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



## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg). 

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).



root url: `https://img.favr.town/app`

| view url | content |
| ---- | ---- |
| /merchants | `/merchant-bg.png` |



## Icons

Standard bootstrap icons are used with the exception of a few custom icons, mostly in the footer. Assets for custom icons are temporary and will be replaced with final artwork later (svg). 

Icons (svg) must be included with the build as constants.
