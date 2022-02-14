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



#### Optimize Build

- Update dependency versions, PWA configuration, and build scripts as needed
- resolve build warnings/errors (if any)
- resolve console warnings/errors (if any)



### Delivery

This sprint delivers a working and tested state-of-the-art optimized Progressive Web Application (ReactJS), as described below, to serve the dynamic responsive site [https://[dev-]app.favr.town/](https://[dev-]app.favr.town/), including all project source and build configuration files, 3rd party libraries, assets, and applicable documentation, optimized for current browsers (Chrome, Firefox, Safari), mobile first, with support for current mobile (Android and iOS), tablet, and desktop viewing modes, and following industry best practices.



## Routes in this sprint

Routes in this sprint are "merchant stories" and apply to the "merchant" user role.

In this document, the user role(s) each route is available is listed after the colon ":".



### fix B-1 integration

We merged B-1 into the "dev" branch and need to fix some small issues.



#### [/rewards](/rewards): merchant

Fix a small issue in the current code base where clicking a reward in the list does not redirect to `/rewards/{sk}` for that reward.



#### [/rewards/{id}](/rewards/{id}): merchant

We changed the image upload to a global component but haven't adjusted this view. Can you update so that the cropper uses 4/3 ratio for reward image?

Also, when removing the image, the page reloads and the reward/GET API is called twice, which is not correct. This seems to be a bug in the B-1 branch that carried over.



### [/patrons](/patrons): merchant, location

*when reached*

Load a paginated list of following patrons by calling `/patron POST`.



***header***

(merchant header B)



***content***

Search header plus result list of panels.



![](https://img.favr.town/spec/m-patrons.svg)



Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | phone/email | string input |  | (see below) |
| 2 | name | string input |  | (see below) |
| 3 | result list | array | based on `/patron POST` result | if an item is clicked, and has a "url" value, route to url, otherwise do nothing |



**panels**

For the result list, instead of a table, we'll show a list of panels.

Each panel looks like this:

![](https://img.favr.town/spec/patron_panel.png)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | profilePicture | image | `item[].profilePicture` |  |
| 2 | details | string, multi-line | `item[].details` |  |
| 3 | active | string | `item[].active` |  |

If a panel is clicked, route to `item[].url`



**search**

When either (1) or (2) is in the search header is updated, do basic validation (for 1 - validate either email or phone, for 2 - validate min_length=2). If the value validates, call `/patron POST` with the updated attribute in `body`.

Example request body for (1):
`{ body: { cellOrEmail: "qqan@outlook.com"}}`

Example request body for (2) - "name" can be either partial "lastName", or complete "lastName" + ", " + partial "firstName":
`{ body: { name: "an"}}`
`{ body: { name: "an, l"}}`

Update the result list with the API response. 



**Pagination**

If the user scrolls down, and `LastEvaluatedKey` was present in the result, request the next page by resubmitting the API call and including  `LastEvaluatedKey` as `ExclusiveStartKey` with the request body. Merge the result into the view keeping the previous results.

Pagination can be tested by including { limit: 1 } with POST request body if more than one item exists in the backend.

*If the result list is empty, render as empty list with the following static text in the background: "(new followers will appear here)". Make the static text a config constant.*



***footer***

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | footer image | image |  | n/a |
| 2 | QR | button | icon | `onClick()` route to `/qr` |



### [/patrons/{id}](/patrons/{id}): location

This view and related modals are the same as for the merchant role, with the exception of the footer: For location role, the footer has no buttons.



### [/patrons/{id}](/patrons/{id}): merchant

*when reached*

***if no other query parameters exist except "id"***

Load requested patron by id by calling `/patron GET` with query/path parameter `{ id: id }`.



Example url:
`https://[dev-]app.favr.town/patrons/p_abcdefg`



If the patron exists. it will return
- patron details
- current reward progress
- statistics
- if the patron is currently following



***if other query parameters exist except "id"***

Other query parameters, if present, must be included, to orchestrate actions. Those could come from a QR code scan and the result would depend on backend validation.



**action=purchase**

When the merchant scans a "self" QR code of a patron, it will read `/p={id}?action=purchase`. On `/` this redirects to: `/patrons/{id}?action=purchase`.

Instead of calling `/patron GET`, call `/patron PUT` with `body: { patron_id: id, action: { type: purchase }}` (see "patron-purchase" modal action).

This will return `/patron GET` result plus a success message for the successful orchestration.

*The `/patron GET` result may include `flags.wipe_query_params: true`. In that case, remove any query parameters except "id" from the view's url. This is to avoid unintended duplicate orchestration on reload.*



**reward=reward_sk**

When the merchant scans a "reward" QR code of a patron, it will read `/p={id}?reward=reward_sk`. On `/` this redirects to: `/patrons/{id}?reward=reward_sk`.

Instead of calling `/patron GET`, call `/patron PUT` with `body: { patron_id: id, action: { type: reward, reward_sk: reward_sk }}` (see "patron-reward" modal action).

This will return `/patron GET` result plus a success message for the successful orchestration.

*The `/patron GET` result may include `flags.wipe_query_params: true`. In that case, remove any query parameters except "id" from the view's url. This is to avoid unintended duplicate orchestration on reload.*



**coupon=coupon_id**

When the merchant scans a "coupon" QR code of a patron, it will read `/p={id}?coupon=coupon_id`. On `/` this redirects to: `/patrons/{id}?coupon=coupon_id`.

Instead of calling `/patron GET`, call `/patron PUT` with `body: { patron_id: id, action: { type: coupon, coupon_id: coupon_id }}`.

This will return `/patron GET` result plus a success message for the successful orchestration. The actual coupon is returned with the patron details as `item.coupon`.

*On success, in addition to updating the `/patrons/{id}` form with the result item, show the actual coupon inside a "patron-coupon" modal, so that the merchant knows what coupon was claimed.* 



*The `/patron GET` result may include `flags.wipe_query_params: true`. In that case, remove any query parameters except "id" from the view's url. This is to avoid unintended duplicate orchestration on reload.*



***header***

(merchant header B)



***content***

![](https://img.favr.town/spec/m-patrons-id.svg)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | profile picture | image/icon |  `item.profilePicture` if available, or placeholder | n/a |
| 2 | details | read-only form | show `item.login`, `item.firstName`, `item.lastName` | `onClick()` open "patron-details" modal with additonal profile details |
| 3 | favr | number | `item.favr` | n/a |
| 4-9 | rewards | (reward detail component) | `item.rule_rewards` <BR /><BR />use `icon_logo` as reward icon, and a custom svr circle representing the % | `onClick()` open "patron-reward" modal with the selected reward |
| 10 | purchase | button |  | `onClick()` open "patron-purchase" modal |
| 11 | send favr | button |  | `onClick()` open "patron-favr" modal |
| 12 | statistics | toggle |  | `onClick()` expand or collapse statistics details |
| 13 | statistics details | label/number | list any key-value starting with `"stat_*"` but not `stat_new_*`, for example: `item.stat_like`, `stat_reward` | n/a |



***footer***

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | footer image | image |  | n/a |
| 2 | actions | button | icon | `onClick()`route to `flags.action_url` if exists, otherwise disable button |
| 3 | conversations | button | icon | `onClick()`route to `flags.conversation_url` if exists, otherwise disable button |



#### "patron-details" modal

![](https://img.favr.town/spec/patron-details-modal.svg)

The modal shows a read-only form with `item.patron_details`. Attributes can be empty. Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | close | button | icon | `onClick()` close the modal |
| 2 | name | string | `item.patron_details.name` | n/a |
| 3 | phone | string | `item.patron_details.phone` | n/a |
| 4 | accept_birthday | switch | `item.patron_details.accept_birthday` | n/a |
| 5 | birthday | string, short date | `item.patron_details.birthday` | n/a |
| 6 | accept_mail | switch | `item.patron_details.accept_mail` | n/a |
| 7 | mail | string, multi-line | `item.patron_details.mail` | n/a |



#### "patron-reward" modal

![](https://img.favr.town/spec/patron-rewards-modal.svg)

This modal shows a read-only form with details for the selected reward, and allows the merchant to register the redemption for the patron.

Reward details are for the `item.rule_rewards[]` clicked by the merchant to open the modal. The reward is identified by a unique `sk` value.

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | close | button | icon | `onClick()` close the modal |
| 2 | reward name | string | `item.rule_rewards[].name` |  |
| 3 | reward description | string, multi-line | `item.rule_rewards[].description` |  |
| 4  | reward value | number | `item.rule_rewards[].favr` ||
| 5  | patron favr balance | number | `item.favr` ||
| 6  | redeem | button | disabled unless `item.rule_rewards[].allow_redeem` | `onClick()` show "are you sure" modal (10). If confirm, call `/patron PUT` with `body: { patron_id: id, action: { type: reward, reward_sk: item.rule_rewards[].reward_sk }}` |
| 7 | redemption details | string (conditions, exclusions, if any) | `item.rule_rewards[].redeem` |  |
| 8| redeem by date | string, short date/time | `item.rule_rewards[].redeem_by` |  |
| 9| reward image | image from url (if any) | `item.rule_rewards[].image` |  |



#### "patron-favr" modal

![](https://img.favr.town/spec/patron-favr-modal.svg)

This modal shows the patron's current favr balance (2), and allows to send or withdraw favr.
Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | close | button | icon | `onClick()` close the modal |
| 2 | balance | number | `item.favr` |  |
| 3 | amount | number input | validate as integer > 0 and < `item.favr` |  |
| 4 | send | button |  | `onClick()` show "are you sure" modal (6). If confirm, call `/patron PUT` with `body: { patron_id: id, action: { type: favr, amount: amount }}` |
| 5 | withdraw | button |  | `onClick()` show "are you sure" modal (6). If confirm, call `/patron PUT` with `body: { patron_id: id, action: { type: favr, amount: (-1 * amount) }}` |

The API will return the updated `/patron GET` result plus a success `message`. Close the modal, update the form with the result, and show the message (if any).



#### "patron-purchase" modal

This case only shows the "are you sure" modal with text "Confirm this patron's purchase?". If confirmed, call `/patron PUT` with `body: { patron_id: id, action: { type: purchase }}`. 

The API will return the updated `/patron GET` result plus a success `message`. Close the modal, update the form with the result, and show the message (if any).



#### "patron-coupon" modal

This modal shows the coupon claimed by scanning a patron's "coupon" QR code. 

![](https://img.favr.town/spec/patron-coupon-modal.svg)

It's a read-only form with the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | close | button | icon | `onClick()` close the modal |
| 2 | description | string, multi-line | `item.coupon.text` | n/a |
| 3 | website | url | `item.coupon.url` | `onClick()` open in new tab |
| 4 | redeem | string, multi-line | `item.coupon.redeem`, don't show if empty | n/a |
| 5 | redeem by | string, short-date/time | `item.coupon.redeem_by`, don't show if empty | n/a |
| 6 | image | image | `item.coupon.image`, don't show if empty | n/a |



## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg). 

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).



root url: `https://img.favr.town/app`

| view url | content |
| ---- | ---- |
| /patrons | `/patrons-bg.png` |



## Icons

Standard bootstrap icons are used with the exception of a few custom icons, mostly in the footer. Assets for custom icons are temporary and will be replaced with final artwork later (svg). 

Icons (svg) must be included with the build as constants.
