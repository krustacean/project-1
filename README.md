reversetodo.ninja
=================
reversetodo.ninja is a simple life logging application that let's you see the things you've done, how many times you've done them and the last time that you did them. You can create a user account and then track your own todos as you make them!

heroku
==========
[reversetodo.herokuapp.com](http://reversetodo.herokuapp.com)

User Stories
================
John is looking for a new to-do list app. He wants something that organizes simple to-do lists in a more logical manner. He wants a site to go to that he can log into and save all his relevant to dos and can access from anywhere.

George has trouble keeping track of the things he has done. He can never remember if it's his turn to bring the milk and cookies because he can't remember the last time that he did it.

Artemis has always wanted to create a diary and yet just hasn't gotten around to it. She wants the ability to log into a site and quickly create a diary from the things that she has already done.


Scope
============

My app will allow users to easily record things they have done in the past and things would like to complete in the future. My stretch goal is to use the [Google calendar api](https://developers.google.com/google-apps/calendar/quickstart/nodejs) to import new users old calendar entries and also edit and add current calendar entries.


Wireframes
============

#### Landing Page:

![Landing Page](https://glwx.mybalsamiq.com/mockups/3687112.png?key=38d3f33da80d3605801f3ac72636f6de0be51be3)

#### Main Page:

![Main Page](https://glwx.mybalsamiq.com/mockups/3687113.png?key=fd9cc39cafacde7e1fa7b9ada8a493b9125e1b04)


ERDs
=============
![Data Model](erd.jpg)


Project Planning
============
Used [Pivotal Tracker](https://www.pivotaltracker.com/projects/1455590)

Stack
============
- bootstrap3
- jquery
- bcrypt
- body-parser
- dotenv
- ejs
- express
- express-session
- express-favicon
- moment.js (server and client side)
