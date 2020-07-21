## Overview

A racing application made for a work application. Although some of the code was templated, the majority of the code here is mine or
has been made completely transformative such that I can use it as an example of my coding process. The only code that retains from
the original project that is not my own is some of the HTML and CSS templating for the app, but the core functionality, forms and testing 
are my own. 

## Development Environment 

* [Express](https://expressjs.com/)
* [Angular CLI](https://cli.angular.io/)
* [json-server](https://github.com/typicode/json-server)
  * A full fake REST API

## Running the Application

Review the available scripts in the [package.json](package.json)   

## Run in Production Mode

Application will run on [localhost:8000](http://localhost:8000)

Enter any username and password to login

`npm start`

## Run in Development Mode

Application will run on [localhost:4200](http://localhost:4200)

Enter any username and password to login

`npm run start-dev`

_Please Note:  To have Angular call `json-server` directly, set `DEBUG` to `true` in [app.service.ts](./src/app/app.service.ts)_
