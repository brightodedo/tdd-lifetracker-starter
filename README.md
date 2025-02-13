# Week 3 Assignment: Life Tracker

Submitted by: Nnaemeka Odedo

Deployed Application: [Lifetracker Deployed Site]("http://equal-stem.surge.sh/")

## Application Features

### Core Features

- [X] **The Nav Bar:** Implement customized views for users who are logged in vs not logged in.
  - [X] If the user is logged in, it should display a **Sign Out** button. 
  - [X] If no user is logged in, it should display **Login** and **Register** buttons
  - [X] Display a logo on the far left side, and contain links to the individual detailed activity page. 
- [X] **The Landing Page:** Display a large hero image and a brief blurb on what this application is about
- [X] **Login Page:** A form that allows users to login with email and password.
- [X] **Registration Page:** A form that allows the user to sign up with their email, password, username, first name, and last name.
- [X] When a user first authenticates, they should be redirected to an authenticated view (i.e the detailed activity page). When they sign out, all frontend data should be reset.
- [X] Users have access to an overview Activity page that show one summary statistic about each of the 3 types of activity tracked.
- [X] The API should have a `security` middleware that only allows authenticated users to access resources and only allows users to access resources about themselves. 
- [X] Users should have the ability to track at least **1** types of activities (i.e Nutrition, Exercise, Sleep, etc.). Each activity should be tracked on separate pages.
- [X] Deployed website with Heroku & Surge. 

**Detailed Activity Page:**
- [X] The detailed activity page should display a feed of all previous tracked activities.
- [X] The detailed activity should contain a form to contain relevant information. (i.e if tracking nutrition this form allows the user to capture calories, timestamp, image, category, etc.) 
- [ ] The activity tracked should be given a unique id for easy lookup.
  `TODO://` Add link to table schema in the link code below. Your file should end in `.sql` and show your schema for the detailed activities table. (🚫 Remove this paragraph after adding schema link)
  * [Table Schema](📝ADD LINK TO TABLE SCHEMA.sql HERE!) 

### Stretch Features

Implement any of the following features to improve the application:
- [X] Provide a dropdown that allows users to filter activity based on a certain attribute of any activity item.
- [X] Calculate aggregate statistics based on time periods - such as daily, weekly, monthly aggregates.
- [ ] Create a page that shows all other users that use the life tracker application and allow users to follow each other.

### Walkthrough Video

![giphy 7 27 12 PM](https://user-images.githubusercontent.com/54002497/178081752-45a51118-ccba-47ac-b2bc-6f9503dad501.gif)

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?
- Yes the topics we covered in the labs such as postgres, SQL, security, and the walkthroughs prepared me for this.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
- If I had more time I would work more on the CSS for my code.


* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?
- Would like to try implementing a better CSS with better gifs.


### Open-source libraries used

- Add any links to open-source libraries used in your project.

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.

- Shout Out to TA Roy, TA Rebecca, Duy Nguyen and all the interns in codpath. Seeing everyone's project is very inspirational and motivational in moving forward.

- Shout out to Falone and Aileen for help with the deployment
