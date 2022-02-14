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

Routes in this sprint are "merchant stories" and apply to the "merchant" user role.

In this document, the user role(s) each route is available is listed after the colon ":".



### [/program](/program): merchant

This view allows merchants to manage their loyalty program settings.


*when reached*

Call `/program GET`, then indicate required configuration and new items based on the result.



***header***

(merchant header B)



***content***

*this view style is based on `/account`. use the same button style and 2 sizes*



![](https://img.favr.town/spec/merchant-program.svg)


Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 0 | background | image |  | n/a |
| 1 | rules | button | `item.rules` | `onClick()` route to [/rules](/rules) |
| 2 | rewards | button | `item.rewards` | `onClick()` route to [/rewards](/rewards) |
| 3 | complete | icon, can show on any button | show a green check if `complete:true` for any button |  |
| 4 | incomplete | icon | show a red exclamation mark if `complete:false` for any button |  |
| 5 | news and deals | button | `item.news` | `onClick()` route to [/news](/news) |
| 6 | surveys | button | `item.survey` | `onClick()` route to [/surveys](/surveys) |
| 7 | new item | icon | show a red filled circle (on top of complete/incomplete if applicable) if `new:true`, otherwise don't show |  |
| 8 | statistics | button | `item.statistics` | `onClick()` route to [/statistics](/statistics) |
| 9 | suggestions | button | `item.suggestions` | `onClick()` route to [/suggestions](/suggestions) |
| 10 | most recent | string, short date/time | show on a button if `updated` | |



***footer***

(no elements)



### [/rules](/rules): merchant

This view allows merchants to manage default favr reward settings.


*when reached*

Call `/rule GET`, then fill the form based on the result. 



***header***

(merchant header B)



***content***

![](https://img.favr.town/spec/merchant-rules.svg)

The form contains dropdown inputs for each number value. Defaults (if no value is defined for the attribute) and source are taken from `flags.flag_defaults[attribute]`.



Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | welcome | dropdown | `item.rule_welcome`, `flags.flag_defaults.rule_welcome` |  |
| 2 | purchase | dropdown | `item.rule_purchase`, `flags.flag_defaults.rule_purchase` |  |
| 3 | share | dropdown | `item.rule_share`, `flags.flag_defaults.rule_share` |  |
| 4 | suggest | dropdown | `item.rule_suggest`, `flags.flag_defaults.rule_suggest` |  |
| 5 | vote | dropdown | `item.rule_vote`, `flags.flag_defaults.rule_vote` |  |
| 6 | like | dropdown | `item.rule_like`, `flags.flag_defaults.rule_like` |  |
| 7 | birthday | dropdown | `item.rule_birthday`, `flags.flag_defaults.rule_birthday` |  |


Each time a control is updated and loses focus, it's value is send to the backend as number value for the assigned attribute by calling `/rule PATCH` with `{ body: attribute }`.



***footer***

(no elements)




### [/statistics](/statistics): merchant

This view allows merchants to view their program statistics/results.

*when reached*

Call `/statistics GET`, then populate the view based on the result.



***header***

(merchant header B)



***content***

![](https://img.favr.town/spec/merchant-statistics.svg)

The form renders each number value, plus the special "joined" short-date/time value.

"joined" is always on top of the list, followed by "follower".
Any other value is listed underneath.


Elements:

| id | element | type | source/asset | event |
| -------- | -------- | -------- | -------- | -------- |
| 1 | joined | short date/time | `item.joined` |  |
| 2 | follower | number | `item.follower` |  |

*Loop through and dynamically render any available number values*.  The list of values returned by the API can vary, and will grow in the future.



***footer***

(no elements)



## Images

Assets for images are temporary and will be replaced with final artwork later (png or svg). 

Only icons should be included with the build; all other image assets will reside on the CDN (final assets will return correct Cache-Control headers).



root url: `https://img.favr.town/app`

| view url | content |
| ---- | ---- |
| /program | `/program-bg.png` |
| /rules | `/rules-bg.png` |
| /statistics | `/statistics-bg.png` |

