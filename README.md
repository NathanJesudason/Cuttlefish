# Cuttlefish

## Development

### Development Prerequisites

- [.NET SDK version 6.x](https://dotnet.microsoft.com/en-us/download)
- [Node version 18.x](https://nodejs.org/en/download/) [(ideally via nvm)](https://github.com/nvm-sh/nvm)
- (optional, can develop just fine without) [Angular CLI](https://angular.io/cli)

### Run Cuttlefish Locally

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

TODO: decide if we want to use [prettier](https://prettier.io/) for the Angular code.

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
