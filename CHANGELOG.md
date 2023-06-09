# Cuttlefish Changelog

## 1.2.0 (6-8-2023)

Here's the 1.2.0 release, a couple more changes before the 2023 Engineering Expo:

- Implemented avatars into other components of the site beyond the account page
  - It was previously shown as a basic user icon but was updated to display as the appropriate user's avatar
- Finished functionality for the task relationship creation on the task page
  - Can now view, create, and delete dependencies from a task's page, not just the Gantt chart

Pull Requests:

- [#208](https://github.com/NathanJesudason/Cuttlefish/pull/208): Implement avatars throughout Cuttlefish
- [#195](https://github.com/NathanJesudason/Cuttlefish/pull/195): Bump `@types/jasmine` to 4.3.2
- [#203](https://github.com/NathanJesudason/Cuttlefish/pull/203): Bump `@types/node` to 20.2.5
- [#204](https://github.com/NathanJesudason/Cuttlefish/pull/204): Bump `bootstrap` to 5.3.0
- [#209](https://github.com/NathanJesudason/Cuttlefish/pull/209): Bump `@dicebear/collection` to 6.0.4
- [#210](https://github.com/NathanJesudason/Cuttlefish/pull/210): Bump `@dicebear/core` to 6.0.4
- [#214](https://github.com/NathanJesudason/Cuttlefish/pull/214): Finish implementing task dependency buttons

## 1.1.0 (6-2-2023)

Welcome to the 1.1.0 release! Here are some of the key changes made in this version:

- Fixed an edge case with task dates that resulted in tasks accidentally disappearing on the Gantt charts
- Now has a working version of the team members page and account page
  - See `/teammembers` and `/account`
- Implemented initial CRUD for labels
- Completed initial setup to assign projects to specific team members
- Modified the default text for empty Gantt charts to point the user to add task data
- Modified footer styling to always put it at the bottom of the page

Pull Requests:

- [#191](https://github.com/NathanJesudason/Cuttlefish/pull/191): Fix for updating task dates
- [#184](https://github.com/NathanJesudason/Cuttlefish/pull/184): Bump `tslib` to 2.5.2
- [#186](https://github.com/NathanJesudason/Cuttlefish/pull/186): Bump `@types/node` to 20.2.3
- [#190](https://github.com/NathanJesudason/Cuttlefish/pull/190): Bump `socket.io-parser` to 4.2.3 and `socket.io` to 4.6.1
- [#193](https://github.com/NathanJesudason/Cuttlefish/pull/193): Remove placeholder third-party login and signup buttons
- [#192](https://github.com/NathanJesudason/Cuttlefish/pull/192): Disable task drag and drop on pages that don't use it
- [#199](https://github.com/NathanJesudason/Cuttlefish/pull/199): Miscellaneous Gantt chart fixes
- [#202](https://github.com/NathanJesudason/Cuttlefish/pull/202): Update footer placement on specific pages
- [#205](https://github.com/NathanJesudason/Cuttlefish/pull/205): More miscellaneous Gantt chart fixes
- [#206](https://github.com/NathanJesudason/Cuttlefish/pull/206): Remove `dotnet format` GitHub Action
- [#122](https://github.com/NathanJesudason/Cuttlefish/pull/122): CRUD actions on labels, user avatars, other miscellaneous user updates
- [#207](https://github.com/NathanJesudason/Cuttlefish/pull/207): Increase Angular deployment budget

## 1.0.0 (5-22-2023)

### Welcome to the 1.0.0 release! Here's the high level list of features we support

- Account creation and user authentication
  - Ability to reset password
- Management of several projects
  - Change basic attributes of the project
  - View a Gantt chart of the sprints and tasks within the project
- Management of the sprints within projects
  - Change basic attributes of the sprint
  - Complete sprints and receive a sprint report
- Management of the tasks within sprints
  - Change basic attributes of the task
  - Move tasks between sprints with drag and drop functionality
  - Apply labels to tasks and search by them

Here's each of the routes/pages in the front end:

- `/` : the main landing page
- `/login` : the login page, where you can provide your email or username and password to access the site
- `/signup` : the signup page to create a new account
- `/forgotpassword` : the page where you can submit your email to be sent a password reset link
- `/reset` : the page you get sent to via a password reset link so that it can be reset
- `/projects` : the projects page, where you can view all the projects created within this instance of Cuttlefish
- `/project/{id}` : the individual project page, where you can view a project's attributes, sprints, and tasks
- `/project/{id}/gantt` : the Gantt page for a project, from which you can also edit the dates of tasks or dependencies between them
- `/task/{id}` : the individual task page, where you can view a task's properties
- `/label` : the label page, where you can view all tasks with a specific label
- `/teammembers` : the team members page, where you can manage the people with access to this instance of Cuttlefish
