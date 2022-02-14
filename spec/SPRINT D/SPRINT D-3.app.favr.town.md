# FAVR.TOWN

Specification
10/21/2021

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



### [/suggestions/{id}](/suggestions/{id})

Same  as [/news](/news), except, when reached, when calling `/suggestion POST` include "id" as `{ body: { id }}`.



### [/suggestions](/suggestions)

This view allows merchants to review, manage, and comment on their suggestions.
It also allows patrons to see, and share or like suggestions associated with a merchant.

*when reached*

Call `/suggestion POST`, then populate the view based on the result. This will return a paginated list of items, or `{ items: [] }`.



***If query parameter "merchant_pk" exists, include with `/suggestion POST` body: `{ merchant_pk: merchant_pk }`. This will return filtered items for this merchant.***

***If query parameter "patron_pk" exists, include with `/suggestion POST` body: `{ patron_pk: patron_pk }`. This will return filtered items for this patron.***



**Pagination**

If the user scrolls down, and `LastEvaluatedKey` was present in the result, request the next page by resubmitting the API call and including  `LastEvaluatedKey` as `ExclusiveStartKey` with the request body. Merge the result into the view keeping the previous results.

Pagination can be tested by including { limit: 1 } with POST request body if more than one item exists in the backend.

*If the result list is empty, render as empty list with the following static text in the background: "(new items will appear here)". Make the static text a config constant for each list view.*



***header***

(patron or merchant header B based on requestor role)



***content***

![](https://img.favr.town/spec/merchant-suggestions.svg)

Paginated list of panels. Each panel is a read-only representation of a suggestion, and a comment input. the comment input is read-only unless `flags.allow_modify: true`



Elements:

| id | element | type | source/asset | event |
| -- | ------- | ---- | ------------ | ----- |
| 1 | profilePicture | image | `items[].profile.profilePicture` if exists, or place holder asset | `onClick()` route to `items[].profile.url` |
| 2 | suggestion | string, multi-line, read-only | `items[].suggestion` | |
| 3 | created by | string, read-only | `items[].profile.login` | |
| 4 | date | short date/time | `items[].flag_created` | |
| *5* | delete | button | don't show unless `flags.allow_remove` | see **delete button** section below |
| *5* | like | button | don't show unless `flags.allow_like` | see **like button** section below |
| 6 | likes | like icon, number | `item.stat_like`<br /><br />asset: `icon_follow.svg` |  |
| 7 | shares  | share icon, number | `item.stat_share` |  |
| 8 | share | button | don't show unless `flags.allow_share` and `items[].share_url`<br /><br />asset: `icon_share.svg` | `onClick()`, call `/action PUT` with `{ body: { share: { pk: items[].pk, sk: items[].sk}}}`. <br /><br />This will return { item: { url }}. <br /><br />Copy `item.url` into clipboard, and show "url copied" message |
| 9 | comment | string, multi-line, read-only unless `flags.allow_modify` | `items[].comment` | when changed and losing focus, if `flags.allow_modify`, call `/suggestion PATCH` with `{ body: { pk: items[].pk, sk: items[].sk, comment: items[].comment}}`. On success, do nothing, on error, show error banner<br /><br />Allow "comment" to be empty (a merchant can delete a comment by submitting an empty string) |
| 10 | line | svg | (line to separate each panel) | |



**delete button**

Don't show unless `flags.allow_remove`.

`onClick()` call `/suggestion DELETE` with `{ body: { pk: items[].pk, sk: items[].sk }}`. This will return `/news POST` result plus a message, however, don't merge the result, simply remove the deleted item from the view, and show the message.

The "delete" and "like" button are in the same position - show one or the other.



**like button**

Don't show unless `flags.allow_like`.

`onClick()`, call `/action PUT` with `{ body: { like: { pk: item.pk, sk: item.sk}}}`.  This will return `{ item: { stat_like }, favr: { favr, favr_town, favr_following} }`. Merge the result into the current panel, and show the favr update.

The "delete" and "like" button are in the same position - show one or the other.



***footer***

This section contains the following elements:

| id | element | type | source/asset | event  |
| -- | ------- | ---- | ------------ | ------ |
| 1  | +suggestion | button | hide unless `flags.allow_create`<br /><br />use +`icon_message` (similar to +news) | `onClick()` open "new suggestion" modal |



#### "new suggestion" modal

The modal allows a patron to post a suggestion to a merchant.

![](https://img.favr.town/spec/new-suggestion-modal.svg.svg)

Elements:

| id | element | type | source/asset | event |
| -- | ------- | ---- | ------------ | ----- |
| 1  | back | button | icon | `onClick()` close the modal  |
| 2  | suggestion | string, multi-line, required | validate as min-length=2, max-length=250 | |
| 3  | POST | button | disabled unless form validates<br /><br />asset: `icon_upload.svg` | `onClick()` show "ARE YOU SURE" with the following static text: "This will post your suggestion for others to see and like."<br /><br />If confirmed, call `/suggestion PUT` with `{ body: { merchant_pk: items[].merchant_pk, suggestion: suggestion }}`. This will return the updated `/suggestion POST` result, plus a message.  <br /><br />Close the modal, merge the result list into the view, and show the message. |



## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg). 

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).



root url: `https://img.favr.town/app`

| view url | content |
| ---- | ---- |
| /suggestions | `/suggestions-bg.png` |
| /suggestions/{id} | `/suggestions-bg.png` |
