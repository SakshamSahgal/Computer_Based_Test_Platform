Progress -

(HomePage)
	Index.html  -

		login as admin -

				1. saves session cookies
				{logged_in ,yes}
				{user_id,ID entered}
				{Name , name from database}
				2. redirects to Admin portal

		login as Problem Setter

				 1. saves session cookies
				{logged_in ,yes}
				{user_id,ID entered}
				{Name , name from database}
				2. redirects to Problem Setter portal
		
		login as student
		        1. Saves session cookies
				{logged_in ,yes}
				{user_id,ID entered}
				{Name , name from database}
				2. redirects to Studeont_Portal.html
AdminPortal.html

    Can perform all Crud Operations on Database Through Admin Portal

    Register user
        Can Register users as Student/Problem_Setter

    Logout button
        1. Clears Session Cookies
        2. Redirects To HomePage

    Current Edit 
        1. Can edit data of currently selected Row

Problem Setter - 
	
	Problem_Setter_Portal.html

			1. Add Question - Redirects to AddQuestion.html
			2. Question Bank - Redirects to Question Bank.html

	AddQuestion.html

			1. generates a Universally unique id (by using Date.now() timestamp)
			2. Can submit Questions to QuestionBank with this Unique ID

	Question Bank.html

			1. Can view the whole list of Questions from the database
			2. Can click on the view button of each question to get detailed view of each question
			3. Can edit each question in the database
			4. Can Delete Any Question from the database
	
	Create Test.html
			
			1. Provides you a way to create Custom tests
			2. Can Add multiple Questions to the test from the Question Bank
			3. Can Set custom Names for the tests
			4. Can Set custom Duration for the each tests
			5. Can Set custom marks from each question in the test
			
Student Portal - 
	
	Student Portal.html
			
			1. Can view the complete list of scheduled tests
			2. Can give any of the scheduled Test (it will redirect you to the desired Test_Portal.html)
			
	Test_Portal.html
			
			1. Can view each Question in the test By Clicking on the Question No
			2. The questions are Randomly shuffeled each time 
			3. You can view the complete Detail of each Question , including the marks it carry
			
	Result_Section.html 
	
			1. Can view your Performance , through a list of attempted Question 
			2. Can view the deatailed view of each question's attempted option , and correct option
			3. Can view the marks scored by you
