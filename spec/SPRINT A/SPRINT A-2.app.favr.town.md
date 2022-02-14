# FAVR.TOWN

Specification
10/01/2021

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



### [/locations](/locations): merchant

This view, together with [/locations/{id}](/locations/{id}), is used to manage business locations. 

A "merchant" account belongs to a business owner. 
Each business can have multiple "locations". 

A location can have dedicated login credentials - a "location" account. The "location" role is limited and managed by the parent "merchant" role.



*when reached*

Call `/location POST` for a list of existing locations to show on the view.



***header***

(merchant header B)



***content***

![](https://img.favr.town/spec/m-locations.svg)

This section contains the following elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | add | button | disabled unless `{ flags: { allow_add: true }}` | `onClick()` route to [/locations/new](/m/locations/new) |
| 2 | filter | string input |  | filter the "location" list client-side on update (join all values for each item, then search items for partial string match) |
| 3/4 | "location" list item | Combine item values except "login" and show as address, also show edit(4) buttons |  | edit button: route to [/locations/{id}](/locations/{id}) **and include the item with the state so that the view doesn't have to call the API again** |



As with all lists, scroll for pagination (use `{ body: { limit: 1}}` to test).



*If the result list is empty, render as empty list with the following static text in the background: "(add at least one location)". Make the static text a config constant.*



***footer***

(no elements)



### [/locations/{id}](/locations/{id}) or [/locations/new](/locations/new): merchant

This view is used to update or remove an existing location, add a new location, and manage login credentials for a location.



*when reached*

If the url is [/locations/new](/locations/new) (=new item), so nothing, just render the empty form.



If the url is [/locations/{id}](/locations/{id}) (=existing item), fill the form with the item (handed over from  [/locations](/locations)), if exists. If the view is reloaded or has no state, try to get the item based on the {id} query parameter by calling `/location POST` with `body: { id: id }`. 

This will return the individual location.



On success, fill the form with the item, on error, show error, then go back.




***header***

(merchant header B)



***content***

Form with 2 sections. 



***1-9***



![](https://img.favr.town/spec/m-locations-id-1.svg)

Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | Business Name | string, min_length=2, required | `item.businessName` |  |
| 2 | Street | string, min_length=2, required | `item.street` |  |
| 3 | Zip | string, required | `item.zip` | (special handling see below) |
| 4 | State | string, min_length=2, required | `item.state` |  |
| 5 | City | string, min_length=2, required | `item.city` |  |
| 6 | About | string, min_length=2, required | `item.about` |  |
| 7 | Website | string, must validate `^https?://`, optional | `item.website` |  |
| 8 | Phone | string, must validate US phone number `^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$`, optional | `item.phone` |  |
| 9 | remove | button | disabled unless (a) existing item and (b) no existing login (must remove login before removing location) | show the **"are you sure" modal** without specific text, and if true, call `/location DELETE` with `{ body: { id }}`. <br /><br />On success, go back to the list (`/location DELETE`) will return `/location POST` result |



There's no dedicated update or save button, instead, each time an input element is updated and loses focus, if the form validates, the client should call `/location PATCH` with `{ body: attributes }` (include all attributes including empty/undefined, and "id" for existing items) to update the backend asynchronously. 



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



***10-14***

This section extends the form below ***1-9***. It can be used to either create a new login (all fields required), change the password for an existing login, or remove an existing login.

The status of some of the elements depend on whether a login exists for this location.
All fields are required.

Values for an existing login ("profile", "login", "email") come from the location object.

Allow "password" to be empty for existing login, only validate if not empty.


![](https://img.favr.town/spec/m-locations-id-2.svg)


Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 10 | login | string | read-only for existing, new must validate min_length=6, force lower-case |  |
| 11 | email | string | read-only for existing, new must validate email pattern `^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$`, force lower-case |  |
| 12 | password | string | allow empty for existing, new must validate min_length=6 |  |
| 13 | update | button | only show for existing login, disabled unless form validates | call `/login PATCH` with body based on whether the login exists or not. This will return the updated location as `{ item: object }` (similar to `/location POST` result with `{ body: { id } }`) to merge into the form |
| 14 | remove | button | only show for existing login | call `/login DELETE` with `body: { id: id }`. This will return the updated location as `{ item: object }` (similar to `/location POST` result with `{ body: { id } }`) to merge into the form. Show success or error message, then go back. |
| 15 | create | button | only show for non-existing login, disabled unless form validates | call `/login PATCH` with all login form attributes in the body. This will return the updated location as `{ item: object }` (similar to `/location POST` result with `{ body: { id } }`) to merge into the form.<br /><br />this will also send an email with the credentials to the provided email |



***footer***

(no elements)



## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg). 

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).



root url: `https://img.favr.town/app`

| view url | content |
| ---- | ---- |
| /locations | `/locations-bg.png` |



## Icons

Standard bootstrap icons are used with the exception of a few custom icons, mostly in the footer. Assets for custom icons are temporary and will be replaced with final artwork later (svg). 

Icons (svg) must be included with the build as constants.
