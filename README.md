# README #

This is SpaceX Launch Programs App.

Folder structure - 
1. Inside the 'dist' folder contains prod-ready files bundled using webpack -
    a. index.html       : html file that is opened in browser. 
    b. main.js          : transpiled and uglyfied/minified code in a single js file.
    c. main.css         : transpiled scss code and merged into a single css file.
2. Inside the 'src' folder contains the source-code with the following structure - 
    a. index.html       : contains the view
    b. js/              : contains all the js files
    c. css/             : conatins styles used in this app

Instructions to run the app - 
1. You can run the app by opening 'index.html' in 'dist' folder in your browser.
2. If you want to run the source code i.e. src, please run the following command-
    npm run-script build

Functional Features - 
1. Responsive app for all your screens.

Non-functional features - 
1. Faster execution of the app due to uglyfied, bundled js code.

Room for Modification - 
I have made this app in a way that you can easily add, modify the code based on any requirements.
Eg: 1. For Api Modifications, there is a separate JS file.
    2. For return objects, a separate JS file (Using ES6 Classes).

Heroku app deployed at below link - 
https://spacex-launch-programs-info.herokuapp.com/

Additional Files - 
Required an additional server.js file to deploy on heroku

Happy Using 😊!!