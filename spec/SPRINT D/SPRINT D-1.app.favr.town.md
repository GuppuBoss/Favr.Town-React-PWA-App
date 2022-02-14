# FAVR.TOWN

Specification
10/19/2021

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

Leverage existing dependencies and styles, reuse components, and add reusable components as much as possible.



#### Optimize Build

- Update dependency versions, PWA configuration, and build scripts as needed
- resolve build warnings/errors (if any)
- resolve console warnings/errors (if any)



### Delivery

This sprint delivers a working and tested state-of-the-art optimized Progressive Web Application (ReactJS), as described below, to serve the dynamic responsive site [https://[dev-]app.favr.town/](https://[dev-]app.favr.town/), including all project source and build configuration files, 3rd party libraries, assets, and applicable documentation, optimized for current browsers (Chrome, Firefox, Safari), mobile first, with support for current mobile (Android and iOS), tablet, and desktop viewing modes, and following industry best practices.



## Routes in this sprint

Routes in this sprint are "merchant stories" and apply to the "merchant" user role. In this document, the user role(s) each route is available is listed after the colon ":".



### [/qr](/qr)

This view show's the merchant's qr code (patron can scan to follow), a scan button to scan a patron's qr code, and a button to download the merchant's qr code.



***implement the qr code scanner modal as reusable component***



*when reached*

**if there are no query parameters**

Call `/qr POST` without parameters (empty request body) to get own QR code.



*the QR code icon on /p and /m (see C-2) must redirect to `/qr` (same tab)*



**if there are query parameters**

Include query parameters with `/qr POST` body based on what parameters are present.



***"coupon"***

This requires "coupon" parameter.

call `/qr POST` with body:
```json
{
  "coupon": coupon
}
```



***"reward"***

This requires "reward" and "merchant_pk" parameters.

call `/qr POST` with body:
```json
{
  "reward": reward,
  "merchant_pk": merchant_pk
}
```



***header***

(patron or merchant header B based on requestor role)



***content***

QR code, and scan button.

![](https://img.favr.town/spec/m-qr-content.svg)

Elements:

| id | element | type | source/asset | event |
| -- | ------- | ---- | ------------ | ----- |
| 1 | QR code  | image  | svg, get by calling `/qr POST` <br /><br />with or without parameters in the body | |
| 2 | scan | button | icon | Open the qr code scanner in a modal with a close icon. Orchestrate based on scan result |



Additional example scan result urls:

| url | orchestration |
| --- | ------------- |
| `https://dev-app.favr.town?p=p_abcdefg&action=purchase` | merchant to register patron purchase |
| `https://dev-app.favr.town?p=p_abcdefg&reward=vkmaRj8yh` | merchant to register patron reward claim |
| `https://dev-app.favr.town?p=p_abcdefg&coupon=vkmaRj8yh` | merchant to register patron coupon claim |
| `https://dev-app.favr.town?m=m_g56aDAS` | patron to view and follow merchant |



Any orchestration happens at the target view based on query parameters.



***footer***

Add the following icons on top of the footer image:

![](https://img.favr.town/spec/m-qr-footer.svg)

Elements:

| id   | element  | type | source/asset | event |
| ---- | -------- | ---- | ------------ | ----- |
| 1 | share | button | `icon_share` | copy the value of `item.url` into the clipboard, and show "url copied" message |
| 2 | download | button | `icon_download` | prompt to download the svg to the device |



#### qr code scanner modal 

Connect a react qr code scanner. 

Open the scanner in a modal similar to the existing image upload modal used on `/profile`, with no buttons other than the X close button (no icon_upload button).



Possible libraries:

- "react-qr-reader-es6" [https://www.npmjs.com/package/react-qr-reader-es6]
- "react-qr-reader" [https://www.npmjs.com/package/react-qr-reader]



If the scan is unsuccessful, or, if the scan is successful but the result does not return a url including `"favr.town"`, close the modal, and show "invalid url" error.

If the scan is successful and returns a url, redirect to that url in the same tab.




### [/actions](/actions)

This view lists actions (like "patron started following") in a paginated table, sorted by "time" descending. Items can be filtered client-side with a simple text filter on the "text" of the action.

*when reached*

Get list of items by calling `/action POST` with `{ body: { limit: number }}`.



***If query parameter "merchant_pk" exists, include with `/action POST` body: `{ merchant_pk: merchant_pk }`. This will return filtered items for this merchant.***

***If query parameter "patron_pk" exists, include with `/action POST` body: `{ patron_pk: patron_pk }`. This will return filtered items for this patron.***



**Pagination**

If the user scrolls down, and `LastEvaluatedKey` was present in the result, request the next page by resubmitting the API call and including  `LastEvaluatedKey` as `ExclusiveStartKey` with the request body. Merge the result into the view keeping the previous results.

Pagination can be tested by including { limit: 1 } with POST request body if more than one item exists in the backend.

*If the result list is empty, render as empty list with the following static text in the background: "(new followers will appear here)". Make the static text a config constant.*



***header***

(patron or merchant header B based on requestor role)



***content***

(instead of a table we'll show a list of panels)

![](https://img.favr.town/spec/m-actions.svg)

Elements:

| id | element | type | source/asset | event |
| -- | ------- | ---- | ------------ | ----- |
| 1 | filter | string |  | filter list client-side by "text" containing filter substring |
| 2-4 | panel | | `[ type, text, time, url ]` | if the item has a "url" property, `onClick()` (entire panel) route to "url", otherwise do nothing |

Format "time" as "short date/time" in two rows with date top, time bottom.

As with all lists, scroll for pagination (use `{ body: { limit: 1}}` to test).



Instead of "type", show a corresponding icon (default is `icon_action`):

| type | icon |
| -- | ------ |
| "follow" | `icon_follow` |
| "unfollow" | `icon_unfollow` |
| "suggestion" | `icon_message` |
| "share" | `icon_share` |
| "reward" | `icon_logo` |
| "purchase" | `icon_host` |
| "coupon" | (scissors icon) |
| (any other) | `icon_action` |



***footer***

(no additional elements)



## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg). 

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).



root url: `https://img.favr.town/app`

| view url | content |
| ---- | ---- |
| /qr | `` |
| /actions | `/actions-bg.png` |

