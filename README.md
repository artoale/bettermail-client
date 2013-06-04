Better Mail (client)
==================

The aim of this project is to provide a single page application to be used with [bettermail-server](https://github.com/artoale/betteremail-server#bettermail-server)

This web application is built on top of [AngularJS](https://github.com/angular/angular.js#angularjs) and uses Yeoman, Grunt and Bower as the basic toolchain (more infos [here](http://yeoman.io/))

![Alt text](https://lh3.googleusercontent.com/-bgMQgo7s5hU/Ua44XypDlmI/AAAAAAAABUM/WWqIvKS-Nkg/w1114-h615-no/Schermata+2013-06-04+alle+20.52.29.png)

#Setup

In order to install the application you must follow this step:

*  chechout the code from github `git clone git@github.com:artoale/bettermail-client.git`
*  install the latest version of Node.js and NPM
*  run `npm install -g yo grunt-cli bower` in order to install all the tools you need
*  cd into your local copy of the repository and run `npm install`
*  If everything goes well you can now run `grunt server` in order to start a static web server for serving the web application


#Mail sync

In order to request email syncronization you have to do the following:

*  Setup an instance of bettermail-server and start it up
*  Go to `http://localhost:9000/#/labels` and insert all the gmail labels you want to add to the application
*  Go to `http://localhost:9000/#/syncmail` select your label and hit 'sync'. It will start syncronizing the headers of all your email in this box

You're done!



