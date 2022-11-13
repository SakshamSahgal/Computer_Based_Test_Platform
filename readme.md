Progress -

Index.html (HomePage) -

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

AdminPortal.html

    Can perform all Crud Operations on Database Through Admin Portal

    Register user
        Can Register users as Student/Problem_Setter

    Logout button
        1. Clears Session Cookies
        2. Redirects To HomePage

    Current Edit 
        1. Can edit data of currently selected Row

Problem_Setter_Portal.html

    1. generates a Universally unique id (by using Date.now() timestamp)
    2. Can submit Questions to QuestionBank with this Unique ID

