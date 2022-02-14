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

### [/couponbook](/couponbook)

This view is based on the [/news](/news) view, however, it only shows a patron's clipped coupons.

_when reached_

Call `/coupon POST`, then populate the view based on the result. This will return a paginated list of items, or `{ items: [] }`.

If the list is empty, show static config string "clipped coupons will appear here.
Otherwise render the items based on the [/news](/news) view with minor changes.

**This view does not currently support pagination and will return all items with a single request.**

**_header_**

(patron header B)

**_content_**

List of panels. Each panel representing a coupon item. Panels are read-only except for 3 buttons.

![](https://img.favr.town/spec/patron-couponbook.svg)

Elements:

| id  | element       | type                    | source/asset                                                        | event                                                                                                                                                                                                                 |
| --- | ------------- | ----------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | icon, line    | svg                     | scissors icon, dotted line around the item                          |                                                                                                                                                                                                                       |
| 2   | text          | string, multi-line      | `items[].text`                                                      |                                                                                                                                                                                                                       |
| 3   | url           | string                  | `items[].url`, hide if empty                                        |                                                                                                                                                                                                                       |
| 4   | redeem        | string, multi-line      | `items[].redeem`                                                    |                                                                                                                                                                                                                       |
| 5   | redeem_by     | string, short date/time | `items[].redeem_by`                                                 |                                                                                                                                                                                                                       |
| 6   | image         | image                   | `items[].image`, hide if empty.                                     |                                                                                                                                                                                                                       |
| 7   | delete        | button                  | trash icon<br /><br />don't show unless `items[].flag_allow_remove` | `onClick()` call `/coupon DELETE` with `{ body: { id: items[].id }}`.                                                                                                                                                 |
| 8   | redeem_button | button                  | disabled unless `items[].flag_allow_redeem`                         | `onClick()` route to `items[].redeem_url`                                                                                                                                                                             |
| 9   | share         | button                  | `icon_share.svg`                                                    | `onClick()`, call `/action PUT` with `{ body: { share: { pk: items[].pk, sk: items[].sk}}}`. <br /><br />This will return { item: { url }}. <br /><br />Copy `item.url` into clipboard, and show "url copied" message |

**_footer_**

(no additional elements)

## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg).

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).

root url: `https://img.favr.town/app`

| view url    | content              |
| ----------- | -------------------- |
| /couponbook | `/couponbook-bg.png` |

## Icons

Standard bootstrap icons are used with the exception of a few custom icons, mostly in the footer. Assets for custom icons are temporary and will be replaced with final artwork later (svg).

Icons (svg) must be included with the build as constants.
