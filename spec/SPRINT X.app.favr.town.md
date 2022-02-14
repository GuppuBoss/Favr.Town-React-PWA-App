# FAVR.TOWN

Specification
10/14/2021

Project repository:
[ssh://git-codecommit.us-east-2.amazonaws.com/v1/repos/favr.town.frontend.app](ssh://git-codecommit.us-east-2.amazonaws.com/v1/repos/favr.town.frontend.app)

Status:
**DRAFT**



## Summary

This document describes a progressive web application to provide an authenticated website with user stories based on user role.

Roles include "patron", "merchant", and "location" (=restricted merchant).



### Tasks

This sprint extends the existing application.



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



## Changes



### structure

Consolidate all views in /src/views (currently, some views are still in /src/components).



#### routes

Standardize the routes to use either one of the following conventions consistently:

instead of /{ p || m}/profile||account||etc. use just /profile||account||etc. with logic in the view switching based on requestor user role (patron, merchant, location).



Also, we need to prevent users from accessing routes not available to their role. We can simply switch in the client, and redirect e.g. a patron trying to access `/rewards` to the root `/` (that would then redirect them to `/p`.)



**routes for location**
/
/m
/patrons, /patrons/{id}
/qr



**routes for merchant**

/
/actions
/conversations, /conversations/{id}
/locations, /locations/{id}
/m
/news, /news/{id}
/patrons, /patrons/{id}
/profile
/program
/qr
/rewards, /rewards/{id}
/rules
/statistics
/suggestions, /suggestions/{id}
/surveys, /surveys/{id}, /surveys/new



**routes for patron**

/
/actions
/addmerchant
/conversations, /conversations/{id}
/couponbook
/merchants, /merchants/{id}
/news, /news/{id}
/p
/profile
/qr
/search
/suggestions, /suggestions/{id}
/surveys, /surveys/{id}



#### dependencies and shared components

Consolidate and streamline as needed: 

- duplicate dependencies, e.g. [react-dayjs] and [@date-io/date-fns]
- duplicate code/components, e.g. consolidate multiple date picker components



Reduce 3rd party dependencies

- instead of "aws-amplify", only import the needed components ("@aws-amplify/api", "@aws-amplify/auth", "@aws-amplify/core", etc.) if possible




#### Integrate spinner with API directly

Instead of using the spinner in each view, let's integrate it with the API, like a modal, so that the underlying view is dimmed but still visible. 

Make it a shared component that accepts parameters for and then performs:

- { show: true||false } .. if true, when the API is called, show the spinner, until the API returns a result, then hide the spinner. default can be true.



#### image upload component

Make it a shared component that accepts parameters for and then performs:

- crop aspect ratio (currently either 600x600 or 800x600, but we can simply accept { x, y })
- greyscale true/false (if true, convert to greyscale before upload)



Also, resize all cropped images before upload to the crop aspect ratio pixel size.



#### "init" GET - notifications

`/init GET` result may include a "notifications" array of string that is used to show banner notifications when the view is reached.

If included and not empty, show items aligned right (with default padding) about 80% of the width, with each string in a multi-line read-only string control. 

Show all items at the same time, overlapping, one slightly lower than the other. They don't auto-close, so the user must click to close. We can accept a click on the entire panel, so we don't need an X close icon on each.



![](https://img.favr.town/spec/notification.jpg)



Create as shared component.



### UI and Style

Implement a consistent UI style. Let's find a (form) style that is softer, less contrast, more subtle. maybe light grey borders vs black.



#### Form style

For consistency, standardize all forms (e.g. /email and /password) with the same form and style.

- React Hook Forms with Material UI and YUP



Also, some form fields are read-only - those need to be visually different (light grey fill?)



#### /m body

Move the merchant title into the body with some padding so that the text "A Favr Town Must" on the background image is still readable above the merchant title on mobile.



#### Safari signin issue

In Safari, when adding the app to the home screen, *the first time after opening the app* and clicking into the "Login" field, the virtual keyboard does not come up.

However, from the second time, the virtual keyboard does show.
Can this be fixed?



