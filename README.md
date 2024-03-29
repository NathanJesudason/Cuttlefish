# Cuttlefish

<p align="center">
  <img src="./ClientApp/src/assets/cuttlefish_logo.png" width="300px" alt="Cuttlefish Logo" />
</p>

Cuttlefish is an open-source project management software that maintains important agile-focused features like Gantt charts and sprint management.

[See our wiki](https://github.com/NathanJesudason/Cuttlefish/wiki) for more long-form information about the project, such as how to deploy Cuttlefish.

[Submit an issue](https://github.com/NathanJesudason/Cuttlefish/issues) with any questions or bugs to report.

## Architecture

Cuttlefish operates with an ASP.NET version 6 (written in C#) back end and Angular version 14 (written in Typescript/HTML/CSS) front end. Everything in `ClientApp/` belongs to the front end, and everything else in the repo constitutes the back end. The back end interacts with an SQL database to manage the data used to support Cuttlefish.

The back end follows the standard .NET MVC organization, just without the views. The models in `Models/` describe the entites that Cuttlefish uses. The controllers in `Controllers/` serve as endpoints for the API that the Cuttlefish back end provides, each of which have their own interactions with the database. There are a handful of other helper functions throughout, including those in `Authentication/` and `Email/`.

The front end (in `ClientApp/`) is a standard Angular project with only a few notable Cuttlefish-specifc notes. We use [PrimeNG](https://primeng.org/) components to build our UI, which provides a cohesive look and improves development velocity. We use [ng-mocks](https://ng-mocks.sudo.eu/) to reduce the boilerplate used by Angular's standard unit testing strategy. As with all Angular projects, we have a module (our only module) in `src/app/`. Its configuration, including routes, is defined in `app.module.ts`, and the rest of its pieces follow are within that directory. `animations/` defines our animations that we apply to our front end components. `components/` contains all the visual elements in the UI, separated by type. `guards/` contains our Angular guards that we use to protect certain routes. `interceptors/` defines our Angular interceptors that serve as a middleware for all outgoing HTTP requests, especially to the Cuttlefish back end. `services/` contains all our services that perform the HTTP operations with the back end, among other things. Our components import these services and use them to perform the necessary actions.

### Architecture Diagrams

These diagrams, in `docs/diagrams/`, are a record of the diagrams we created and referenced during the development of this project.

![System architecture diagram](/docs/diagrams/system_architecture.png)
*System architecture diagram.*

![Entity-relationship diagram](/docs/diagrams/er_diagram.png)
*Entity-Relationship diagram.*

![UI flowchart](/docs/diagrams/ui_flowchart.png)
*UI flowchart.*

![Figma mockup of project page](/docs/diagrams/project_page_mockup.png)
*Figma mockup of project page.*

![Figma mockup of Gantt chart](/docs/diagrams/gantt_mockup.png)
*Figma mockup of Gantt chart.*

![Initial sketch of Cuttlefish logo](/docs/diagrams/logo_sketch.png)
*Initial sketch of Cuttlefish logo.*

## Development

### Development Prerequisites

- [.NET SDK version 6.x](https://dotnet.microsoft.com/en-us/download)
- [Node version 18.x](https://nodejs.org/en/download/) [(ideally via nvm)](https://github.com/nvm-sh/nvm)
- (optional, can develop just fine without) [Angular CLI](https://angular.io/cli)

### Run Cuttlefish Locally

First update the connection string in `appsettings.Development.json` with an SQL database.

You can run Cuttlefish with the two commands...

```shell
$ dotnet build
MSBuild version 17.3.2+561848881 for .NET
     Determining projects to restore...
     All projects are up-to-date for restore.
...
Build succeeded.
     0 Warning(s)
     0 Error(s)

Time Elapsed 00:00:04.85

$ dotnet watch run
...
info: Microsoft.Hosting.Lifetime[14]
     Now listening on: http://localhost:5277
...
```

...then navigating to the specified URL. Once navigated to for the first time, the SPA proxy will boot up, allowing for the Angular frontend to connect to the backend, and you'll be shown Cuttlefish in all its glory.

While running in this state, the frontend and backend will both hot reload for quick development.

The frontend can also be run in isolation like so...

```shell
$ cd ClientApp
$ npm install
...
added 21 packages, removed 19 packages, changed 169 packages, and audited 985 packages in 12s
...
$ npm start

  > cuttlefish@0.0.0 start
  > ng serve --port 44430
...
  ** Angular Live Development Server is listening on localhost:44430, open your browser on http://localhost:44430/ **
...
```

...then navigating to the specified URL. This version also hot reloads, but is limited since there's no backend capabilities.

### Run Unit Tests

You can run ASP.NET unit tests like so...

```shell
dotnet test
```

You can run Angular unit tests like so...

```shell
$ cd ClientApp
$ npm test

  > cuttlefish@0.0.0 start
  > ng test

✔ Browser application bundle generation complete.
05 11 2022 18:17:34.226:WARN [karma]: No captured browser, open http://localhost:9876/
05 11 2022 18:17:34.324:INFO [karma-server]: Karma v6.4.1 server started at http://localhost:9876/
...
TOTAL: 4 SUCCESS
...
```

A browser should open automatically to show the test results in detail, and the terminal will continue running, allowing for quick code changes to be reflected automatically in the browser.

### Code Formatting

.NET provides an easy method of code formatting. From the repo root, run...

```shell
dotnet format
```

### Add New Dependencies

We add new dependencies in the ASP.NET backend in the standard way, from the root of the repo...

```shell
dotnet add package <PACKAGE_NAME>
```

...and the frontend is also standard...

```shell
cd ClientApp
npm install <PACKAGE_NAME>
```

## Plans for the Future

- Dockerize Cuttlefish to improve local development experience and make development between team members more consistent
- Better tracking of epics and OKRs
- Implement dynamic theming (a feature provided by PrimeNG) in the front end
- Create a system for adopters to enable and disable features and create their own (plugins?)
- Add Angular end to end testing
- Better optimization for mobile devices (not crucial, users are more likely to access via company-issued computers)
- Full role-based functionality (admins vs. standard users vs. guests)
