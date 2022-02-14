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



### [/surveys](/surveys)

This view allows 

- merchants to
  - create and manage surveys that patrons can vote on
  - view consolidated votes
- patrons to
  - view surveys
  - vote
  - view consolidated votes (only after casting a vote)



*when reached*

Call `/survey POST`, then populate the view based on the result. This will return a paginated list of items, or `{ items: [] }`.



***If query parameter "merchant_pk" exists, include with `/survey POST` body: `{ merchant_pk: merchant_pk }`. This will return filtered items for this merchant.***



Example result:

```json
{
  "timeStamp": "1620412940678",
  "items": [
    {
      "choices": [
        {
          "text": "red pill",
          "id": "Oob9s8dagb"
        },
        {
          "text": "blue pill",
          "id": "SEYCmhz93"
        }
      ],
      "draft": true,
      "end": 1623346178,
      "flag_created": 1620408787,
      "flag_share": true,
      "flag_updated": 1620408787,
      "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
      "profile": {
        "businessName": "Little Cupcake Shop",
        "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
        "tags": ["##BAKERY", "#BREAD", "#CUPCAKE"],
        "url": "https://dev-app.favr.town?m=m_g56aDAS"
      },
      "question": "which one is your favorite?",
      "share_url": "https://dev-app.favr.town?s=s_ElJ8nAx9zk",
      "sk": "survey#1620408787",
      "stat_like": 0,
      "stat_new": false,
      "stat_promoted": 0,
      "stat_response": 0,
      "stat_share": 0,
      "stat_view": 0,
      "url": "https://dev-app.favr.town/surveys/s_ElJ8nAx9zk"
    },
    {
      "choices": [
        {
          "image": "https://img.favr.town/content/survey/al1e2WGvMR.png",
          "text": "absolutely",
          "id": "CPYVQnqxD1"
        },
        {
          "text": "maybe",
          "id": "_-SQfbgBKM"
        },
        {
          "image": "https://img.favr.town/content/survey/aksLULYmWO.png",
          "text": "nah",
          "id": "1J3U1ue8S"
        }
      ],
      "draft": true,
      "end": 1619899200,
      "flag_created": 1618693620,
      "flag_remove": true,
      "flag_share": true,
      "flag_updated": 1618788824,
      "image": "https://img.favr.town/content/survey/qPvd8myZGy.png",
      "pk": "merchant#c272e5c2-ea69-4605-9489-816624ed731b",
      "profile": {
        "businessName": "Little Cupcake Shop",
        "logo": "https://img.favr.town/content/logo/WFo4DCS4b.png",
        "tags": ["##BAKERY", "#BREAD", "#CUPCAKE"],
        "url": "https://dev-app.favr.town?m=m_g56aDAS"
      },
      "question": "how do you order your food?",
      "share_url": "https://dev-app.favr.town?s=s_eA5r70irwS",
      "sk": "survey#1618693620",
      "stat_like": 0,
      "stat_new": false,
      "stat_promoted": 0,
      "stat_response": 0,
      "stat_share": 0,
      "stat_view": 0,
      "url": "https://dev-app.favr.town/surveys/s_eA5r70irwS"
    }
  ],
  "flags": {
    "allow_create": true
  }
}
```



**Pagination**

If the user scrolls down, and `LastEvaluatedKey` was present in the result, request the next page by resubmitting the API call and including  `LastEvaluatedKey` as `ExclusiveStartKey` with the request body. Merge the result into the view keeping the previous results.

Pagination can be tested by including { limit: 1 } with POST request body if more than one item exists in the backend.

*If the result list is empty, render as empty list with the following static text in the background: "(new items will appear here)". Make the static text a config constant for each list view.*



***header***

(patron or merchant header B based on requestor role)



***content***

![](https://img.favr.town/spec/merchant-surveys.svg)



Paginated list of panels. Each panel represents a read-only suggestion item.

Each panel can be clicked anywhere inside the green area to open the merchant. `onClick()` route to `items[].profile.url`.
Each panel can be clicked anywhere inside the red area to open the survey. `onClick()` route to `items[].url`.



Elements:

| id   | element | type | source/asset | event |
| ---- | ------- | ---- | ------------ | ----- |
| 1 | status label | string, emphasized, red | if `items[].draft === true`, show red color "DRAFT", otherwise show green color "ACTIVE" |  |
| 2 | logo | image | `item.profile.logo`<br /><br />don't show if `flags.allow_modify: true` | `onClick()`  route to `item.profile.url` |
| 3 | Business name | string | `item.profile.businessName`<br /><br />don't show if `flags.allow_modify: true` | `onClick()`  route to `item.profile.url` |
| 4 | tags | array of string | `item.profile.tags`<br /><br />list of string separated by ","<br /><br />if an item starts with "##", replace "##" with "#", and format differently from other items (emphasize).<br /><br />(lanes start with "##", specialties start with "#")<br /><br />don't show if `flags.allow_modify: true` |  |
| 5 | image | image | `items[].image` if exists, or skip | |
| 6 | question | string, multi-line, read-only | `items[].question` |  |
| 7 | delete | button | unavailable unless `items[].flag_remove` | `onClick()` call `/survey DELETE` with `{ body: { sk }}`. This will return `/survey POST` result, and a message - show message, and update the view |
| 8 | votes | number | `items[].stat_response` |  |
| 9 | shares | number | `items[].stat_share` |  |
| 10 | share | button | unavailable unless `items[].flag_share` | `onClick()`, call `/action PUT` with `{ body: { share: { pk: items[].pk, sk: items[].sk}}}`. <br /><br />This will return { item: { url }}. <br /><br />Copy `item.url` into clipboard, and show "url copied" message |
| 11 | line | svg | (line to separate each panel) |  |



***footer***

This section contains the following elements:

| id | element | type | source/asset | event |
| -- | ------- | ---- | ------------ | ----- |
| 1  | new | button | unavailable unless `flags.allow_create` | `onClick()` route to [/surveys/new](/surveys/new) |



### [/surveys/new](/surveys/new)
### [/surveys/{id}](/surveys/{id})

This view represents a new survey form, or an existing survey. Existing surveys can be changed while in draft status. Once posted, surveys can only be viewed, or ended. Ended surveys can be removed.

*when reached*

The action depends on the query parameter.



**"new"**

Don't call the API. Instead, render a blank form to allow the creation of a new item.

If the requestor role is "patron", redirect to [/surveys](/surveys). Patrons cannot create surveys.



**{id}** (any id other than "new")

Call `/survey GET` with `{ queryParams: { id }}`. Render the form with the result.



***header***

(patron or merchant header B based on requestor role)



***content***

![](https://img.favr.town/spec/merchant-surveys-id.svg)



Each panel can be clicked anywhere inside the green area (if visible to the user) to open the merchant. `onClick()` route to `items[].profile.url`.



The visibility and read/read-write state of some elements depends on the following conditions:

| id | condition | characteristics |
| -- | --------- | --------------- |
| A  | new item  | (query parameter "id" === "new") |
| B  | existing item  | (query parameter "id" !== "new") |
| C  | draft item | `item.draft === true` |
| D  | allow edit | `flags.flag_allow_edit` |
| E  | allow response | `flag.flag_allow_response === true` |
| F  | show responses | `flag.flag_show_response === true` |
| G  | owner | `item.pk` === (`init GET` result `item.pk`) |
| H  | choice is selected | (see element "choice selection" below) |

*The conditional section below works by listing a condition and indirectly defining its opposite. E.g., "G: visible" also defines "not G: not-visible".*



Elements (default is visible and read-only):

| id | element      | type  | source/asset | conditional | event |
| -- | ------------ | ----- | ------------ | ----- | ----- |
| 1 | status | switch | `item.draft` | G: visible<br /><br />(C+D): read-write | validate and action like any other input on the form. Include switch status with `/survey PATCH` as `body: { draft: true || false }`<br /><br />default value for new items is `false` |
| 2 | logo | image | `item.profile.logo`<br /><br />don't show if `flags.allow_modify: true` | G: invisible |  |
| 3 | Business name | string | `item.profile.businessName`<br /><br />don't show if `flags.allow_modify: true` | G: invisible |  |
| 4 | tags | array of string | `item.profile.tags`<br /><br />list of string separated by ","<br /><br />if an item starts with "##", replace "##" with "#", and format differently from other items (emphasize).<br /><br />(lanes start with "##", specialties start with "#")<br /><br />don't show if `flags.allow_modify: true` | G: invisible |  |
|  | green area |  |  | G: invisible | `onClick` route to `item.profile.url` |
| 5 | image | image control | `item.image` | D: image control with image or placeholder<br /><br />E: image or invisible | A, D: image control, either integrated in the form, or through "new survey image" modal |
| 6 | question | string, multi-line | `item.question` | D: read-write |  |
| 7 | end | date/time selector | `item.end` | G: read-write |  |
| 8 | add | button |  | D: visible, disabled unless `item.choices.length < 6` and all existing choices validate (have either "image" or "text" value) | `onClick()` add another "choice" section (9-13) to the form (see bracket) |
| 9 | choice image | image control | `item.choices[].image` | D: image control with image or placeholder<br /><br />E: image or invisible |  |
| 10 | choice text | string, multi-line | `item.choices[].text` | D: read-write<br /><br />E: invisible if empty |  |
| 11 | choice remove | button |  | D: visible | `onClick()` remove this choice section (9-13) from `item.choices[]` |
| 12 | choice vote | line, length is based on `item.choices[].answer_percent` where the form width is 100%. Color is green if `item.choices[].top`, otherwise grey |  |  |  |
| 13 | choice percentage | number | `item.choices[].answer_percent` |  |  |
|  | choice section (bracket) |  |  | E: section can be selected (draw light grey background box background to "select" a choice section) or un-selected (remove grey box). selecting a section automatically un-select a previously selected section (single choice) | E: if a section is selected, show a "POST" button in the footer, otherwise hide the button |



There's no dedicated update or save button, instead, each time an input element is updated and loses focus, if the form validates, call `/survey PATCH` with `{ queryParams: { sk }}` (unless condition A - then leave queryParams empty) and `{ body: attributes }` (include only changed attributes including empty/undefined) to update the backend asynchronously. 



The "choices" array counts as one attribute.



For the form to validate, the item must have all of the following:

- image or question (or both)
- end
- choices[].length



*If `PATCH` body includes `{ draft: true }`):*

When the form validates, before calling `/survey PATCH`, show "ARE YOU SURE" modal with text "This will make the survey visible for patrons to cast their votes". If confirmed, continue and call `/survey PATCH` with `{ queryParams: { sk }}` and `{ body: { attributes } }`, otherwise do nothing.



`/survey PATCH` will return `/survey GET` result and may also return a message. Show the message, and update the form.



***footer***

This section contains the following elements, as with the content section, conditional:

| id | element      | type  | source/asset | conditional | event |
| -- | ------------ | ----- | ------------ | ----- | ----- |
| 1 | like | button | `icon_follow.svg` | G: invisible. <br /><br />disabled unless `flags.flag_allow_like` | `onClick()`, call `/action PUT` with `{ body: { like: { pk: item.pk, sk: item.sk}}}`. <br /><br />This will return `{ item: { stat_like }, favr: { favr, favr_town, favr_following} }`. <br /><br />Merge the result into the current panel, and show the favr update. |
| 2 | share | button | `icon_share.svg` | G: invisible. <br /><br />disabled unless `flags.flag_allow_share` | `onClick()`, call `/action PUT` with `{ body: { share: { pk: item.pk, sk: item.sk}}}`. <br /><br />This will return { item: { url }}. <br /><br />Copy `item.url` into clipboard, and show "url copied" message |
| 3 | post | button | `icon_upload.svg` | E: visible, disabled unless H (a choice is selected) | `onClick()` call `/survey PUT` with query parameters `{ pk, sk }` and `{ body: { answer_id }}`. <br /><br />This will return `/survey GET` result and a message. <br /><br />Show the message, and merge the result into the view. |




#### "new survey image" modal
#### "new choice image" modal

*The image modals are the same as "news image"*, however, once an image is selected, simply replace the attribute value (either `item.image` or `item.choices[].image`) with  the png/base64 string (don't include encoding information, e.g. `data:image/png;base64,`, just the image string).

To delete an image, simply includes as `item.image: null` or `items[].choice.image: null` with `/survey PATCH` request body.

Then call `/survey PATCH` with `{ body: attributes }` with the update.



## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg). 

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).



root url: `https://img.favr.town/app`

| view url | content |
| ---- | ---- |
| /surveys | `/surveys-bg.png` |
| /surveys/{id} | `/surveys-bg.png` |
