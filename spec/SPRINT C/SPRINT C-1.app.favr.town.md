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



## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg). 

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).



root url: `https://img.favr.town/app`

| view url | content |
| ---- | ---- |
| /p/profile | `/profile-p-bg.png` |



## Icons

Standard bootstrap icons are used with the exception of a few custom icons, mostly in the footer. Assets for custom icons are temporary and will be replaced with final artwork later (svg). 

Icons (svg) must be included with the build as constants.
