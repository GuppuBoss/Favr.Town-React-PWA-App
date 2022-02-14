# FAVR.TOWN

Specification
10/11/2021

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

## General Changes

### Merge current "dev" branch

The current "dev" branch should be the basis for this sprint.

It includes:

- several CSS fixes for header and footer
- react-hook-form
- image upload component

## Routes in this sprint

Routes in this sprint are "merchant stories" and apply to the "merchant" user role.

In this document, the user role(s) each route is available is listed after the colon ":".

### [/m](/m): merchant

This sprint adds navigation buttons to the footer for this view.

_the current "dev" branch has a working footer icon implementation on `/p`_

**_header_**

(merchant header A)

**_content_**

(no change)

**_footer_**

Add navigation shortcuts to the footer (show on top of existing footer background image):

![](https://img.favr.town/spec/m-footer.svg)

Elements:

| id  | element       | type   | source/asset       | event                                       |
| --- | ------------- | ------ | ------------------ | ------------------------------------------- |
| 1   | program       | button | `icon_logo.svg`    | route to [/program](/program)               |
| 2   | actions       | button | `icon_action.svg`  | route to [/actions](/actions)               |
| 3   | conversations | button | `icon_message.svg` | route to [/conversations](/m/conversations) |
| 4   | patrons       | button | `icon_patron.svg`  | route to [/patrons](/patrons)               |
| 5   | qr            | button | `icon_qr.svg`      | route to [/qr](/qr)                         |

**_"new" indicators_**

Buttons can have a "new" indicator (svg filled red circle) based on `/init GET` result "flags" (show if true, hide if undefined/false):

| id  | element       | condition "new" indicator |
| --- | ------------- | ------------------------- |
| 2   | program       |                           |
| 3   | actions       | `"flag_new_action"`       |
| 4   | conversations | `"flag_new_conversation"` |
| 5   | patrons       | `"flag_new_patron"`       |
| 6   | qr            |                           |

Example "flags" section from `/init GET` result:

```json
  "flags": {
    "flag_confirmed": true,
    "flag_new_patron": true,
    "flag_new_suggestion": true,
    "flag_show_help": true
  },
```

### [/m](/m): location

This view and related modals are the same as for the merchant role, with the exception of the footer: For location role, the footer has less buttons:

| id  | element | type   | source/asset      | event                         |
| --- | ------- | ------ | ----------------- | ----------------------------- |
| 5   | patrons | button | `icon_patron.svg` | route to [/patrons](/patrons) |
| 6   | qr      | button | `icon_qr.svg`     | route to [/qr](/qr)           |

### [/rewards](/rewards): merchant

This view is a list of rewards that patrons can exchange favr for with this merchant.

_when reached_

Load a list of the merchant's rewards by calling `/reward POST`.

**_header_**

(merchant header B)

**_content_**

List of panels with the merchant's rewards. Each panel is a read-only form based on react-hook-form.

When a panel is clicked, route to `items[].url` for this item.

![](https://img.favr.town/spec/merchant-reward-list.svg)

Elements:

| id  | element            | type               | source/asset                  | event                                                                          |
| --- | ------------------ | ------------------ | ----------------------------- | ------------------------------------------------------------------------------ |
| 1   | reward description | string, multi-line | `items[].description`         |                                                                                |
| 2   | favr value         | number             | `items[].favr`                |                                                                                |
| 3   | redeem by          | short-date string  | `items[].redeem_by`           |                                                                                |
| 4   | claimed            | number             | `items[].claimed`             |                                                                                |
| 5   | delete             | button             | material ui trash icon        | show ARE YOU SURE. if yes, call `reward DELETE` with `body: { "sk": item.sk }` |
| 6   | line               | svg                | (line to separate each panel) |                                                                                |

**_footer_**

This section contains the following elements:

| id  | element | type   | source/asset                                                                                                       | event                   |
| --- | ------- | ------ | ------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| 2   | add     | button | unavailable unless `{ flags: { allow_add: true }}`<br /><br />same button style as the SIGN IN button on `/signin` | open "new reward" modal |

#### "new reward" modal

The modal renders a form to create a new reward item.

![](https://img.favr.town/spec/merchant-new-reward-modal.svg)

Elements:

| id  | element            | type                                                                                        | source/asset                   | event                                                                                           |
| --- | ------------------ | ------------------------------------------------------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| 1   | close              | button                                                                                      | icon                           | `onClick()` close the modal                                                                     |
| 2   | text               | reward description                                                                          | string, multi-line             | `description`                                                                                   |
| 3   | favr value         | number, validate as > 0                                                                     | `favr`                         |                                                                                                 |
| 4   | redemption details | string (conditions, exclusions, if any), optional                                           | `redeem`                       |                                                                                                 |
| 5   | redeem by          | date selector, set to 5pm local time for any selected date, store as epoch number (seconds) | `redeem_by`                    |                                                                                                 |
| 6   | post               | button<br /><br />use `icon_upload.svg`                                                     | disabled unless form validates | `onClick()` call `/reward PATCH` with `{ body: { attributes }}`<br /><br />then close the modal |

Calling the API will return `/reward POST` result - close the modal and update the view.

### [/rewards/{id}](/rewards/{id}): merchant

When reached, when calling `/reward GET` with `{ queryParams: { id: id }`.

**_header_**

(merchant header B)

**_content_**

The view has a read-write form based on react-hook-form to modify an existing reward. The form style and layout is based on `/profile`.

If the item has an image, show the image in the form similar to the image on `/profile` with overlay trash and add icons (left illustration). If the item has no image, show an empty image placeholder frame (like in the current B branch) with overlay add icon (right illustration).

![](https://img.favr.town/spec/merchant-reward-id.svg)

The form fields are the same as for the "new reward" modal, with the addition of `redemption` and `image`.

Elements:

| id  | element            | type                                                                                                                      | source/asset                   | event                                     |
| --- | ------------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------------------------------------- |
| 1   | reward description | string, multi-line, validate as min-length=2                                                                              | `items[].description`          |                                           |
| 2   | redemption details | string (conditions, exclusions, if any), optional                                                                         | `items[].redeem`               |                                           |
| 3   | favr value         | number, validate as > 0                                                                                                   | `items[].favr`                 |                                           |
| 4   | redeem by          | date selector, set to 5pm local time for any selected date, store as epoch number (seconds)<br /><br />show as short date | `items[].redeem_by`            |                                           |
| 5   | image              | image, optional                                                                                                           | `items[].image` or placeholder | `onClick()` open "new reward image" modal |
| 6   | delete             | button                                                                                                                    |                                | delete image by calling `image DELETE`    |
| 7   | add                | button                                                                                                                    |                                | open image upload modal                   |
| 8   | claimed            | number, read-only                                                                                                         | `items[].claimed`              |                                           |

If an attribute is updated, and the form validates, call `/reward PATCH` with `{ queryParams: { sk: items[].sk }}` and `{ body: { attribute }}` with the updated attribute.

On error, show error, on success, do nothing.

**_footer_**

(No specific items)

#### Image upload modal

Use the existing image upload modal and component from the "dev" branch to upload a reward image as png. Crop the image to 800x600 pixel.

**_For now just include the modal without the API - we'll finalize the API tomorrow_**

## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg).

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).

root url: `https://img.favr.town/app`

| view url | content           |
| -------- | ----------------- |
| /m       | `/m-bg.png`       |
| /rewards | `/rewards-bg.png` |
