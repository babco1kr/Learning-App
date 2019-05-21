# Learning App
A full-stack education application allowing teachers to easily create, assign, and review interactive spelling homework assignments that students can complete and submit online. 

---

## Functionality

Upon visiting the [Learning App](https://thawing-brook-74578.herokuapp.com/), the user is brought to a student login, though options are immediately shown to allow teachers to login or sign-up for the app.  

![main-page](/images/studentLogin.jpeg)


## Teacher Experience
Once the teacher logs in, they are shown how many current students are in their class and a graph showing how many students have completed or left incomplete the current assignment. Within the Learning App, spelling questions are grouped by units, and this page shows the unique ID's for any assigned units.

![teacher-logging-in](/images/teacherLogin.gif)

Reviewing the Navbar, clicking on the "Students" link shows you a list of Current Students while also allowing the teacher to add and delete students.

![teacher-student-page](/images/teacherStudent.gif)

Under "Units", teachers can create or delete units, edit questions in units, and set units as active or inactive. Setting a unit as "active" will prompt students to spell the words in that unit. 

![teacher-units](/images/teacherUnits.gif)

To add or delete questions to a unit, the teacher simply needs to click on the unit name they would like to edit. Upon doing this, they will be shown all of the current questions for that unit, after which the can add or delete words where prompted.

Note that to add a word, the teacher has the option of providing an image link. If teacher provided an image, a checkmark will appear next to the word in the unit list and the image will appear in the student assignment. Otherwise, no image will appear and an "X" will show next the word. Images are optional, and regardless the student will be provided a sound file pronouncing each word they are being questioned on. 

![teacher-questions](/images/teacherQuestions.gif)

Under "Scores," teachers can see how well each student has done. It lists the student's name, how long it took them to complete the assignment, and each question number with either a checkmark to its right indicating a correct answer, or an "X" signifying an incorrect response. If the question was answered incorrectly, the student's answer is also provided next to the "X". 

![teacher-scores](/images/teacherScores.jpeg)

## Creators
* **Kyle Babcock**
* **Jordan Werre**
