//--------------------------------------------------------------------- Firebase setup -------------------------------------------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

    const firebaseConfig = {
      apiKey: "AIzaSyCyt3pQ5xUwzRSa1k4yPwGuJiPTjEJsNoY",
      authDomain: "cbtplatform-d2cb9.firebaseapp.com",
      projectId: "cbtplatform-d2cb9",
      storageBucket: "cbtplatform-d2cb9.appspot.com",
      messagingSenderId: "1071199320623",
      appId: "1:1071199320623:web:ef64a8442f32f01d84e4da"
    };
  
    const app = initializeApp(firebaseConfig);

   import {getDatabase, ref, get, set, child, update,remove}  from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js" ; //importing the functions 

    const db = getDatabase(); //getting the database

//------------------------------------------------------------------- Refrences -------------------------------------------------------------------

var timer = document.getElementById("timer"); //getting refrence to timer 
var logout_button = document.getElementById("Logout_btn"); //Getting refrence to Logout button
var confirmation_overlay = document.getElementById("Overlay"); //getting refrence to overlay object
var confirmation_overlay_no_btn = document.getElementById("confirmation_ans_no"); //getting refrence to confirmation overlay no ans button
var confirmation_overlay_yes_btn = document.getElementById("confirmation_ans_yes"); //getting refrence to confirmation overlay yes ans button
var question_pallet_table = document.getElementById("Question_Pallet_table"); //Question Pallet Table
var Load_Overlay = document.getElementById("Load_overlay");
var Question_Details_div = document.getElementById("Question_details");
var Question_Details_Obj = { //JSON object to store html elements for displaying Question 
    Marks : document.getElementById("Marks"),
    Question_Description : document.getElementById("Question_Description"),
    Option_1 : document.getElementById("Option1"),
    Option_2 : document.getElementById("Option2"),
    Option_3 : document.getElementById("Option3"),
    Option_4 : document.getElementById("Option4"),
    Radio_Option_1 : document.getElementById("option_1_radio"),
    Radio_Option_2 : document.getElementById("option_2_radio"),
    Radio_Option_3 : document.getElementById("option_3_radio"),
    Radio_Option_4 : document.getElementById("option_4_radio")
}


//--------------------------------------------------------------------------Global Variables---------------------------------------------------------

var Candidate_Answers = {}; //creating a Dictionary to store answers answered by the candidate with Key = Question ID and values = Answer Object
var Test_obj; //object that stores the data of the current test
var current_Question_Obj; //object that stores the data of the currently loaded Question

//-------------------------------------------------------------------- Functions ----------------------------------------------------

function redirect_to_homepage() //function locates back to Admin_Portal
{
    location.href = "./index.html";
}

function assign_Profile() //this function assigns the profile div it's data for username
{
    document.getElementById("logged_in_as").innerHTML = Cookies.get("Name"); //assigning values
}


function logout_user() //function is called when logout button is clicked
{
    Cookies.remove("Logged_in");
    Cookies.remove("user_id");
    Cookies.remove("Name");
    redirect_to_homepage();
}

if(Cookies.get("Logged_in") == undefined) //if got to this page without logging in redirect to homepage
    redirect_to_homepage();
else
    assign_Profile();



function back_to_student_portal() //this function is called when user presses No on start test confirmation portal
{
    Cookies.remove("Current_test_data"); //clearing the current test data cookie
    location.href = "./Student_Portal.html"; //redirecting back to student portal
}

function proceed_test() //this function is called when user presses yes on start test confirmation portal
{
    confirmation_overlay.hidden = true; //hiding the confirmation div
    Test_obj = JSON.parse(Cookies.get("Current_test_data")); //getting the test object data from the cookies
    shuffle(Test_obj.Questions); //Shuffling the test object questions
    console.log("got test object = ");
    console.log(Test_obj);//printing test object got from cookies
    Add_Questions_to_pallet();
    Start_Timer(); //starting the timer
}

function shuffle(a) //this function shuffles the array passed to it
{
    for(var j,i=a.length-1;i>0;i--)
    {
        j=Math.floor(Math.random()*(i+1));
        [a[i],a[j]]=[a[j],a[i]]
    }
}

function Add_Questions_to_pallet() //this function Adds Question buttons to Question pallet
{
    var questions_added=0;
    for(var i=0;;i++)
    {
        var end = false;
        var row = question_pallet_table.insertRow(i);
        for(var j=0;j<5;j++)
        {
            if(questions_added < Test_obj.Questions.length)
            {
                questions_added++;
                //console.log(questions_added);
                var cell = row.insertCell(j);
                var btn_id = "ques,"+Test_obj.Questions[questions_added-1].Question_ID;
                
                cell.innerHTML = "<button class = 'question_pallet_buttons' id = " + btn_id + " style='text-align:center;' >" + questions_added +"</button>";
                var this_Question_obj = JSON.parse(JSON.stringify(Test_obj.Questions[questions_added-1])); //getting this question object
                document.getElementById(btn_id).addEventListener('click',Clicked_Question.bind(null,this_Question_obj)); //assigning click event listener to each button with passing the question details (stored in the test object) of the particular question
            }
            else
            {
                end = true;
                break;
            }
        }
        if(end)
            break;
    }
}



//this passed question object only contains {question_id and marks} since it is from the test object
function Clicked_Question(Question_obj) //this function is called when the user clicks on any of the question button from Question pallet (with the question object passed)
{
    Question_Details_div.hidden = false;
    console.log(Question_obj);
    Load_Overlay.hidden = false; //Revealing the loading Overlay 
    var path_directory = "Question_Bank/MCQs/" + Question_obj.Question_ID;
    get(ref(db,path_directory))
    .then((snapshot)=>{
        if( snapshot.exists() ) 
        {
            //alert("exists");
            current_Question_Obj = snapshot.val();
            console.log(current_Question_Obj);
            Fill_Question_Details(Question_obj);
            Load_Overlay.hidden = true;
        }
        else
        {
            alert("not exists");
        }
    })
    .catch((error)=>{
        alert("unsuccessful, error = " + error);
    });
}

function Fill_Question_Details(Question_obj_from_test_array) //this function displays current question details (called when user clicks on a question button)
{
    //Adding current question details to the HTML

    Question_Details_Obj.Marks.innerHTML = Question_obj_from_test_array.Marks;
    Question_Details_Obj.Question_Description.innerHTML = current_Question_Obj.Description;
    Question_Details_Obj.Option_1.innerHTML = current_Question_Obj.Option1;
    Question_Details_Obj.Option_2.innerHTML = current_Question_Obj.Option2;
    Question_Details_Obj.Option_3.innerHTML = current_Question_Obj.Option3;
    Question_Details_Obj.Option_4.innerHTML = current_Question_Obj.Option4;
    Question_Details_Obj.Radio_Option_1.checked =  ( Candidate_Answers[Question_obj_from_test_array.Question_ID] === undefined ) ?  false : Candidate_Answers[Question_obj_from_test_array.Question_ID].Option1;
    Question_Details_Obj.Radio_Option_2.checked =  ( Candidate_Answers[Question_obj_from_test_array.Question_ID] === undefined ) ?  false : Candidate_Answers[Question_obj_from_test_array.Question_ID].Option2;
    Question_Details_Obj.Radio_Option_3.checked =  ( Candidate_Answers[Question_obj_from_test_array.Question_ID] === undefined ) ?  false : Candidate_Answers[Question_obj_from_test_array.Question_ID].Option3;
    Question_Details_Obj.Radio_Option_4.checked =  ( Candidate_Answers[Question_obj_from_test_array.Question_ID] === undefined ) ?  false : Candidate_Answers[Question_obj_from_test_array.Question_ID].Option4;

     //if Question is already answered then just replace already answered values

    var Answer_Object = { //this json object contains the data answered by the user
            Question_ID : 0,
            Option1 : false,
            Option2 : false,
            Option3 : false,
            Option4 : false
    }

    //assigning the Answer object it's question id
    Answer_Object.Question_ID = Question_obj_from_test_array.Question_ID;
    var btn_id = "ques," + Question_obj_from_test_array.Question_ID; //getting button ID of clicked question button
    

    Question_Details_Obj.Radio_Option_1.onclick = function(){
        Answer_Object.Option1 = true;
        Answer_Object.Option2 = false;
        Answer_Object.Option3 = false;
        Answer_Object.Option4 = false;
        Candidate_Answers[Answer_Object.Question_ID] = Answer_Object;
        document.getElementById(btn_id).classList.add("Answered_Btn");  //if any option is clicked then add clicked css class to button
        console.log(Candidate_Answers);
    }

    Question_Details_Obj.Radio_Option_2.onclick = function(){
        Answer_Object.Option1 = false;
        Answer_Object.Option2 = true;
        Answer_Object.Option3 = false;
        Answer_Object.Option4 = false;
        Candidate_Answers[Answer_Object.Question_ID] = Answer_Object;
        document.getElementById(btn_id).classList.add("Answered_Btn");  //if any option is clicked then add clicked css class to button
        console.log(Candidate_Answers);
    }
    
    Question_Details_Obj.Radio_Option_3.onclick = function(){
        Answer_Object.Option1 = false;
        Answer_Object.Option2 = false;
        Answer_Object.Option3 = true;
        Answer_Object.Option4 = false;
        Candidate_Answers[Answer_Object.Question_ID] = Answer_Object;
        document.getElementById(btn_id).classList.add("Answered_Btn"); //if any option is clicked then add clicked css class to button
        console.log(Candidate_Answers);
    }

    Question_Details_Obj.Radio_Option_4.onclick = function(){
        Answer_Object.Option1 = false;
        Answer_Object.Option2 = false;
        Answer_Object.Option3 = false;
        Answer_Object.Option4 = true;
        Candidate_Answers[Answer_Object.Question_ID] = Answer_Object;
        document.getElementById(btn_id).classList.add("Answered_Btn"); //if any option is clicked then add clicked css class to button
        console.log(Candidate_Answers);
    }
    
}


function Start_Timer()
{
    var time =(parseInt(JSON.parse(Cookies.get("Current_test_data")).Test_Duration))*60; //setting the start time
    timer.innerHTML = time;
    var my_timer = setInterval(function(){
        console.log("time running");
         var cur_time = parseInt(timer.innerHTML);
        if(cur_time != 0)
            cur_time--;
        else
        {
            alert("time_up");
            clearInterval(my_timer);
        }
        timer.innerHTML = (cur_time);
    },1000);
}

logout_button.addEventListener('click',logout_user);
confirmation_overlay_no_btn.addEventListener('click',back_to_student_portal);
confirmation_overlay_yes_btn.addEventListener('click',proceed_test);
