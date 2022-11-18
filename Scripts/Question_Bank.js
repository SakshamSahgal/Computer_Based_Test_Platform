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

//------------------------------------------------------------------------------- Refrences -------------------------------------------------------------------

var logout_button = document.getElementById("Logout_btn");
var fetch_MCQs = document.getElementById("fetch_MCQs"); 



//Question Pallet elements Object
const Question_Pallet = {
    Edit_Btn : document.getElementById("Edit_Button"), 
    Delete_Btn : document.getElementById("Delete_Button"),
    Question_Pallet_holder_div : document.getElementById("Question_Pallet_holder_div"),
    Cur_Question_ID : document.getElementById("Cur_Question_ID"),
    authoterd_by_me_radio : document.getElementById("Authored_by_me") ,
    Authored_by_anonymous_radio : document.getElementById("Authored_by_anonymous") ,
    authored_by_me_span : document.getElementById("my_name"),
    Difficulty_Slider : document.getElementById("Difficulty_Slider") ,
    current_difficulty_span : document.getElementById("current_difficulty") ,
    ques_desc : document.getElementById("ques_desc") ,
    MCQ_options_values : [  document.getElementById("mcq_option1_value") , document.getElementById("mcq_option2_value") , document.getElementById("mcq_option3_value") , document.getElementById("mcq_option4_value") ] ,
    Correct_opt : [ document.getElementById("correct_opt_1") , document.getElementById("correct_opt_2") , document.getElementById("correct_opt_3") , document.getElementById("correct_opt_4") ]
}

//------------------------------------------------------------------------------- Functions -------------------------------------------------------------------



function display_question(id,values_obj) //this function is called when view button of any question is clicked
{
    console.log(id);
    console.log(values_obj);
    Question_Pallet.Question_Pallet_holder_div.hidden = !Question_Pallet.Question_Pallet_holder_div.hidden; //toggeling hiding div
    Question_Pallet.Cur_Question_ID.innerHTML = (id.split(","))[1]; //putting the current Question ID to the Question Pallet
    
    if (values_obj.Authored_by == "Anonymous") 
    {
        Question_Pallet.authoterd_by_me_radio.checked = false;
        Question_Pallet.Authored_by_anonymous_radio.checked = true;
    }
    else
    {
        Question_Pallet.authoterd_by_me_radio.checked = true;
        Question_Pallet.Authored_by_anonymous_radio.checked = false;
    }

    Question_Pallet.current_difficulty_span.innerHTML = values_obj.Difficulty;
    
    Question_Pallet.authored_by_me_span.innerHTML = Cookies.get("Name");
    Question_Pallet.ques_desc.innerHTML = values_obj.Description;
    Question_Pallet.Difficulty_Slider.value = values_obj.Difficulty;
    Question_Pallet.MCQ_options_values[0].innerHTML = values_obj.Option1;
    Question_Pallet.MCQ_options_values[1].innerHTML = values_obj.Option2;
    Question_Pallet.MCQ_options_values[2].innerHTML = values_obj.Option3;
    Question_Pallet.MCQ_options_values[3].innerHTML = values_obj.Option4;

    Question_Pallet.Correct_opt[0].checked = (values_obj.Correct_Option == 1) ?  true : false;   
    Question_Pallet.Correct_opt[1].checked = (values_obj.Correct_Option == 2) ?  true : false;   
    Question_Pallet.Correct_opt[2].checked = (values_obj.Correct_Option == 3) ?  true : false;   
    Question_Pallet.Correct_opt[3].checked = (values_obj.Correct_Option == 4) ?  true : false;   
}

function add_to_table(id,values_obj) //function inserts data into table (here values is a JSON object)
{
    //inserting cells 
    
    var table = document.getElementById(id);
    var row = table.insertRow(2); //inserting at the 1
    var Question_ID_cell = row.insertCell(0); //inserting at the 0th col (starting)
    var display_col = row.insertCell(1); //inserting at the 0th col (starting)
    
    //adding data to cells
    Question_ID_cell.innerHTML = values_obj.Question_ID; //adding question id to table
    
    var drop_down_btn_id = "dropdown," + values_obj.Question_ID; //defining button ID
    display_col.innerHTML = "<Button style = 'background-color: transparent;' id = " + drop_down_btn_id + " > <img src='GUI_Resources/Right_Arrow.png'> </Button>"; //adding button with this ID
    
    var th_display_btn = document.getElementById(drop_down_btn_id);
    th_display_btn.addEventListener('click',display_question.bind(null,drop_down_btn_id,values_obj)); //assigning event listener to this button to call the function
}

function Fetch_data_from_database(to_database,table_id) //function that fetches all the data from the database passed as JSON object
{
    console.log("loading");
    document.getElementById("loading_img").src = "GUI_Resources/Loading.gif" ;
   const dbref = ref(db);
   get(child(dbref,to_database)).then((snapshot)=>{
    if(snapshot.exists())
    {
        var obj = (snapshot.val()); //getting the object
        
        console.log(obj);
        var values = Object.values(obj); //getting the value array of the object (each item in the object is itself an object)
        console.log(values);
        console.log("loaded");
        document.getElementById("loading_img").src = "" ;
        for(var i=0;i<values.length;i++)
        {
            console.log(values[i].Question_ID);
            add_to_table(table_id,values[i]);
        }
    }
   });
}




function redirect_to_homepage() //function locates back to Admin_Portal
{
    location.href = "./index.html";
}

function logout_user()
{
    Cookies.remove("Logged_in");
    Cookies.remove("user_id");
    Cookies.remove("Name");
    redirect_to_homepage();
}

function assign_Profile() //this function assigns the profile div it's data for username
{
    document.getElementById("logged_in_as").innerHTML = Cookies.get("Name"); //assigning values
}

if(Cookies.get("Logged_in") == undefined) //if got to this page without logging in redirect to homepage
    redirect_to_homepage();
else
    assign_Profile();



function edit_question()
{
    Question_Pallet.ques_desc.disabled = !Question_Pallet.ques_desc.disabled;

    for(var i=0;i<4;i++)
    {
        Question_Pallet.MCQ_options_values[i].disabled = !Question_Pallet.MCQ_options_values[i].disabled;
        Question_Pallet.Correct_opt[i].disabled = !Question_Pallet.Correct_opt[i].disabled;
    }
    
    Question_Pallet.authoterd_by_me_radio.disabled = !Question_Pallet.authoterd_by_me_radio.disabled;
    Question_Pallet.Authored_by_anonymous_radio.disabled = !Question_Pallet.Authored_by_anonymous_radio.disabled;
    Question_Pallet.Difficulty_Slider.disabled = !Question_Pallet.Difficulty_Slider.disabled;
}

logout_button.addEventListener('click',logout_user);
fetch_MCQs.addEventListener('click',Fetch_data_from_database.bind(null,"Question_Bank/MCQs","MCQ_Bank_table"));
Question_Pallet.Edit_Btn.addEventListener('click',edit_question);