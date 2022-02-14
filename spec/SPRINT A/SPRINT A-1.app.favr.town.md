# FAVR.TOWN

Specification
10/12/2021

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



### [/profile](/profile): merchant

The current `/profile` route includes the patron profile. Update so that the same route can support either the patron or the merchant profile based on the authenticated user role..



**form**

The form is based on the included react-hook-form components and style, similar to the existing `/profile` route.

There's no dedicated update or save button, instead, each time an input element is updated and loses focus, if the form validates, the client should call `/profile PATCH` with `{ body: attributes }` (include only changed attributes including empty/undefined) to update the backend asynchronously. 



**images**

*Images are an exception:* image (logo, album) assets in this view are uploaded by calling `/image PATCH`, and removed by calling `/image DELETE`, however, the form's data model includes their public url instead. This should be a reusable component.

The form simply shows images with buttons. To upload a new image, the included image upload modal component must be used.



**when reached**

This data is part of the cached `/init GET` result, however, to have the most current data, call `/profile GET`, populate the form with the result, and *also merge updates into the cached `/init GET` result*



***header***

(merchant header B)



***content***

![](https://img.favr.town/spec/merchant-profile.svg)



**Section 1** contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | logo | image with overlay add/remove button | `item.logo`<br /><br />show existing image | remove: call `/image DELETE` with `{ body: { url}}`<BR /><BR />add: call `/image PATCH` with `{ body: { type, image, image_text }}`<BR /><BR />`body.type` has value "logo" |



This works similar to the "profilePicture" management on the patron's profile.
The cropper must resize the logo image to 600x600 pixel for the logo.

Include "image" as png/base64 string (don't include encoding information, e.g. `data:image/png;base64,` just the image string).



**Section 2-4** contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 2 | Business Name | string, required | `item.businessName` | |
| 3 | About | string, multi-line, optional | `item.about` | |
| 4 | Website | string/url, optional. if not empty, must start with https:// | `item.website` | |



**Section 5-6** contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 5 | multi-line list | array of string | `item.lanes` | allow delete if `flags.flag_allow_remove` |
| 6 | add lane | button | disabled unless `flags.flag_allow_add` | open the "add lane" modal |



This section manages "lanes" (product categories) and "specialties" (sub-categories). Each item can be either a "lane" or a "lane" combined with a "specialty". Items are listed as [`${lane}`] or [`${lane}/${specialty}`]. 

The data source is coming from `/profile GET`:

```json
{
  "timeStamp": "1616085332793",
  "item": {
    "lanes": [
      "BAKERY",
      "BAKERY/BREAD",
      "BAKERY/CUPCAKE"
    ]
  },
  "flags": {
    "flag_allow_add": true,
    "flag_allow_remove": true
  }
}
```

Items can be added to the list if `flags.flag_allow_add` using the "add lane" modal. the modal calls `/lane PATCH` with `{ body: { lane, specialty }}`, and (on success) returns `{ item: { lanes: array }}`.

Items can be removed from the list if `flags.flag_allow_remove`.  To remove a lane or lane/specialty, call `/lane DELETE` with `{ body: { remove: string }}`. 

Items can only be added or removed one by one.

Merge the PATCH/DELETE result into both the form and the cached `/init GET` result.





**Section 7-9** contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 7 | Salutation | dropdown, string, required, source: ["Mr.", "Ms.", "Mrs."] | `item.salutation` | |
| 8 | First Name | string, required | `item.firstName` | |
| 9 | Last Name | string, required | `item.lastName` | |



**Section 10-11** contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 10 | add | icon | material UI | show the image upload modal. album images must convert to 800x600px and grey scale<br /><br />call `/image PATCH` with `{ body: { {type: "album"}, image }}` |
| 11 | album | list/carousel of images with remove button | `item.album`<br /><br />show existing image. don't show if no image | remove: call `/image DELETE` with `{ body: { url}}` |



This works similar to the "profilePicture" management on the patron's profile.
The cropper must resize the logo image to 800x600 pixel for the album.

Include "image" as png/base64 string (don't include encoding information, e.g. `data:image/png;base64,` just the image string).



***footer***

This section contains no additional elements.



#### "add lane" modal

Modal that allows adding a lane+specialty. 

![](https://img.favr.town/spec/merchant-add-lane-modal.svg)

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | close | button | icon | `onClick()` close the modal |
| 2 | lane | dropdown string input, uppercase | allow both source selection and manual input of new values | validate against `^\S+[A-Z_]{2,30}\S$` (uppercase characters plus "_" no whitespace, max-length 30 |
| 3 | specialty | dropdown string input, uppercase | allow both source selection and manual input of new values | validate against `^\S+[A-Z_]{2,30}\S$` (uppercase characters plus "_" no whitespace, max-length 30 |
| 4 | confirm | button | disabled unless modal form validates | `onClick()` call `/lane PATCH` with `{ body: { lane, specialty }}`. On success, merge the response into the [/m/profile](/m/profile) view, and close the modal, on error, close the modal and show the error. |

*data source for the dropdown inputs*

To get data sources for dropdowns, call `/settings GET` with `{ queryParams: { type: "app"}}`. Only call it once, then store in redux for the remaining session.

Use `item.source.lane` keys as "lane" source. Based on the selected "lane", update the "specialty" source with the corresponding values.



## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg). 

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).



root url: `https://img.favr.town/app`

| view url | content |
| ---- | ---- |
| /profile | `/profile-m-bg.png` |

