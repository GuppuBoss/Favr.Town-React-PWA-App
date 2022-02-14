# FAVR.TOWN

Specification
10/20/2021

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

This adds a conversation feature. Conversations in favr.town, at the moment, are not real-time chat, and more like asynchronous email.



### [/conversations](/conversations)

This view lists conversations in a paginated table, sorted by "time" descending. Items can be filtered client-side with a simple text filter on the "text" of the action.

The view is similar to [/actions](/actions).

*when reached*

***if no other query parameters exist except "id"***

Get list of items by calling `/conversation POST` with `{ body: { limit: number }}`.



***If query parameter "merchant_pk" exists, include with `/conversation POST` body: `{ merchant_pk: merchant_pk }`. This will return filtered items for this merchant.***

***If query parameter "patron_pk" exists, include with `/conversation POST` body: `{ patron_pk: patron_pk }`. This will return filtered items for this patron.***



**Pagination**

If the user scrolls down, and `LastEvaluatedKey` was present in the result, request the next page by resubmitting the API call and including  `LastEvaluatedKey` as `ExclusiveStartKey` with the request body. Merge the result into the view keeping the previous results.

Pagination can be tested by including { limit: 1 } with POST request body if more than one item exists in the backend.

*If the result list is empty, render as empty list with the following static text in the background: "(new items will appear here)". Make the static text a config constant for each list view.*



***header***

(patron or merchant header B based on requestor role)



***content***

(instead of a table we'll show a list of panels)

![](https://img.favr.town/spec/merchant-conversations.svg)

Elements:

| id | element | type | source/asset | event |
| -- | ------- | ---- | ------------ | ----- |
| 1  | filter | string |  | filter list client-side combined strings containing filter substring |
| 2-4 | panel | | `[partner, topic, time]` | when the user click on the part of the panel with `topic`, if the item has a `url` property, route to "url" (usually `/conversations/{id}`, otherwise do nothing |
| 2 | picture | image | `partner.profilePicture` or `logo`, whichever is present | onClick() route to `partner.url` if exist, or `url` instead. |
| 3 | topic | string, multi-line | `topic`<br /><br />crop to 100 characters max, if longer, simply add ".." |  |
| 4 | meta | string | `partner.login`, `time`<br /><br />align underneath `topic`<br /><br />format as "short date/time" |  |



***footer***

This section contains the following elements:

| id | element | type | source/asset | event |
| -- | ------- | ---- | ------------ | ----- |
| 1  | new | button | disable unless query parameter "patron_pk" or "merchant_pk" exist<br /><br />+ `icon_message.svg` | `onClick()` open the "new conversation" modal |



#### "new conversation" modal

This modal allows the user to start a new conversation.

![](https://img.favr.town/spec/new-conversation.svg)

Elements:

| id | element | type | source/asset | event |
| -- | --- | -- | -- | -- |
| 1 | close | button | icon | `onClick()` close the modal |
| 2 | topic | string input, required | |  |
| 3 | message | string input, multi-line, required | | |
| 4 | url | string input, optional | validate as `"^https?://"` | |
| 5 | POST | button | disabled unless form validates<br /><br />`icon_upload.svg` | call `/conversation PATCH` with `{ body: topic, message, url, { to: patron_pk || merchant_pk }}` |


The API will return the updated `/conversation POST` body result plus a success `message`. Close the modal, update the list, and show the message.



### [/conversations/{id}](/conversations/{id})

Details for a specific conversation, and option to post a response.

*when reached*

Get the conversation item by calling `/conversation GET` with query/path parameter `{ id: id }`. 

If not found, show error banner and go back.



***header***

(patron or merchant header B based on requestor role)



***content***

Show a form populated with the item.

![](https://img.favr.town/spec/conversation-details.svg)

The form has 3 sections:

*Section A*

This section is read-only. It shows the conversation "partner" (patron: "profilePicture" and "login", or support), the "type", and the "topic".


Elements:

| id | element | type | source/asset | event |
| -- | -- | --- | --- | -- |
| 1-3 | panel |  | `[partner, topic, time]` | |
| 1 | picture | image | `partner.profilePicture` or `logo`, whichever is present | onClick() route to `partner.url` if exist, or `url` instead. |
| 2 | topic | string, multi-line, read-only | `topic`, do not crop here |  |
| 3 | meta | string, read-only | `partner.login`, `time`<br /><br />align underneath `topic`<br /><br />format as "short date/time" |  |



*Section B*

This section is read-write for the user to post a response, and include an optional url.

Elements:

| id | element | type | source/asset | event  |
| -- | ----- | --- | ---- | -- |
| 4  | response | string, multi-line | validate to min_length=2, max_length=300 | |
| 5  | url | string, optional | if not empty, must start with "https://" |  |
| 6  | POST | button  | disabled unless form validates<br /><br />`icon_upload.svg` | `onClick()` call `/conversation PATCH` with queryParams `{ pk, sk }` and `body: { message: { response, url} }`. |

Clicking on "POST" sends the response and returns the updated item. 

On success, merge into the form, on error, show error banner.



*Section C*

This section shows the communication history similar to a text/chat history with own messages aligned right and partner messages aligned left.

Each partner message is decorated with the "profilePicture" or "logo" icon (if available), the login, and the time. If no `item.partner.profilePicture` or `item.partner.logo`, render placeholder icon instead. 
Merchants have a logo instead of a profile picture.

Partner messages are marked with `"from.partner": true`. 

Each own message is aligned right. 


![](https://img.favr.town/spec/message-history.svg)

Elements:

| id | element | type | source/asset  | event |
| -- | --- | ---- | --- | ----- |
| 1  | image | image thumbnail | (partner conversation item) `item.conversation[].from.profilePicture` or `item.conversation[].from.logo` | n/a |
| 2  | message | string, multi-line, read-only | (partner conversation item) message  | n/a |
| 3  | login + time | string, time as shortDate+time | (partner conversation item) `item.conversation[].from.login`, `item.conversation[].time` | n/a   |



***footer***

(no additional elements)



## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg). 

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).



root url: `https://img.favr.town/app`

| view url | content |
| ---- | ---- |
| /conversations | `/conversations-bg.png` |
| /conversations/{id} | `/conversations-id-bg.png` |
