# Cuttlefish Changelog

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
