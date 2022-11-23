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
var logout_button = document.getElementById("Logout_btn"); //Getting refrence to Logout button
var fetch_question_bank_btn = document.getElementById("fetch_question_bank"); //Getting refrence to fetch question bank button
var Load_overlay = document.getElementById("Load_overlay");
//-----------------------------------------------------------------------Global variables----------------------------------------------------------------------//

var fetched_Question_Bank_dict = {}; //dictionary that stores the fetched question bank
var selected_Questions_dict = {};


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

function add_to_table(tabe_id) //function inserts data into table
{
    var table = document.getElementById(tabe_id);

    for (const [key, value] of Object.entries(fetched_Question_Bank_dict)) 
    {
        console.log(key, value);
        var row = table.insertRow(1);
        var question_ID_Cell = row.insertCell(0);
        var add_image_cell = row.insertCell(1);
        question_ID_Cell.innerHTML = value.Question_ID;

        var add_btn_id = "add_btn," + value.Question_ID;
        var add_btn_img_id = "img," + value.Question_ID;
        add_image_cell.innerHTML =  "<button class='add_question_btn' id = " + add_btn_id + "> <img src= 'GUI_Resources/add.png' id= "+ add_btn_img_id + "> </button>";
        var add_btn = document.getElementById(add_btn_id);
        add_btn.addEventListener('click',print_Data.bind(null,value.Question_ID));
    }
}

function print_Data(Question_ID)
{
    console.log(Question_ID);
    console.log(fetched_Question_Bank_dict[Question_ID]);
    selected_Questions_dict[Question_ID] = fetched_Question_Bank_dict[Question_ID];
    document.getElementById("img," + Question_ID).src =  "GUI_Resources/cancel.png";
}

function fetch_Question_Bank()
{
    Load_overlay.hidden = false; //unhiding the load overlay
    const dbref = ref(db);
    var path_directory = "Question_Bank/MCQs";
    get(child(dbref,path_directory)).then((snapshot)=>{
        if(snapshot.exists())
        {
            var obj = (snapshot.val()); //getting the object
            console.log(obj);
            var values = Object.values(obj); //getting the value array of the object (each item in the object is itself an object)
            console.log(values);
            console.log("loaded");
            Load_overlay.hidden = true; //hiding the loading overlay after the data has been fetched
            fetch_question_bank_btn.hidden = true;
            for(var i=0;i<values.length;i++)
            {
                console.log(values[i]);
                fetched_Question_Bank_dict[String(values[i].Question_ID)] = values[i];
                //add_to_table(table_id,values[i]);
            }

            add_to_table("Question_to_add_MCQ_table");
        }
    });

}



logout_button.addEventListener('click',logout_user);
fetch_question_bank_btn.addEventListener('click',fetch_Question_Bank);