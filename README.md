# NodeJs
NodeJs or Node is a open source, cross platform runtime environment for running Javascript code. Quite often we use Node to compose backend services to be exposed as APIs. <br/>
Node is usually build to create highly scalable, data intensive and real time application.

## Advantages
- Great for prototyping and agile development
- Highly scalable services
- Node uses Javacscript framework
- Cleaner and consistent codebase
- Large eco-system of open source libraries

## Runtime environment
Browser uses Javascript engine to run Javascript code in browser. <br/>
NodeJs = Googles V8 Javascript engine wrapped around with c++ code.<br/>
Node is not a programming language or framework, its just a runtime engine. <br/>

## How it works
Node application are asyncronous by default. <b>Non blocking asynchronous.</b><br/>
Node use one thread to handle multiple requests. It processes a requests in background and continues to process the next request. The state of background request is maintained in a <b>Event Queue</b>.

## Installation of NodeJs
- Find if Node is already installed<br/>
Open command prompt, type `node --version`
- If not, open up browser to [NodeJs](https://nodejs.org/en). Dowload latest stable version and install.

## Node Modules
- Operating System
- File System
- Events
- HTTP

## Node with Express framework
Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js
<br/>
```
npm init --yes
npm i express
```
To run node in watch mode, install `nodemon` or node monitor
```
npm install -g nodemon
```
Using system defined port number from environment variable `process.env.PORT`<br/>
In the local system `PORT` can be set using `set PORT=5000`<br/>
Accessing the resources can we done by using `params`.<br/>
```
http://localhost:3000/api/courses/30?sortBy=john
/api/courses/30 is request parameter or params
sortBy=john anything after ? is query parameters or query
```
<br/>
Use `Joi` for validation. Object schema description language and validator for JavaScript objects
```
npm install joi --save-dev
```





