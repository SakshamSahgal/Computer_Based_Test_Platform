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
var del_Confirm_yes_btn = document.getElementById("confirmation_ans_yes");
var del_Confirm_no_btn = document.getElementById("confirmation_ans_no");
var confirmation_overlay = document.getElementById("Overlay");
var loading_overlay = document.getElementById("Load_overlay");
//Question Pallet elements Object
var Question_Pallet = { //JSON object for HTML elements of question pallet
    Edit_Btn : document.getElementById("Edit_Button"), 
    Edit_Btn_img : document.getElementById("Edit_btn_img"),
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
    Correct_opt : [ document.getElementById("correct_opt_1") , document.getElementById("correct_opt_2") , document.getElementById("correct_opt_3") , document.getElementById("correct_opt_4") ] ,
    update_row : document.getElementById("Update_row") ,
    Update_Ques_btn : document.getElementById("Update_Question")
}

//------------------------------------------------------------------------------- Functions -------------------------------------------------------------------



function display_question(id,btn_id,values_obj) //this function is called when view button of any question is clicked
{
    console.log(id);
    console.log(values_obj);
    var view_btn = document.getElementById(btn_id);
    //console.log(view_btn.src);
    if( (view_btn.src).includes("Right_Arrow.png") )
    {
        view_btn.src = "GUI_Resources/eye.png";
        Question_Pallet.Question_Pallet_holder_div.hidden = false; //toggeling hiding div
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
    else
    {
        view_btn.src = "GUI_Resources/Right_Arrow.png";
        Question_Pallet.Question_Pallet_holder_div.hidden = true; //toggeling hiding div
    }
    
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
    var view_btn_img_id = "btnimg," + values_obj.Question_ID; //button image
    display_col.innerHTML = "<Button style = 'background-color: transparent;' id = " + drop_down_btn_id + " > <img src='GUI_Resources/Right_Arrow.png' id = " + view_btn_img_id + "> </Button>"; //adding button with this ID
    
    var th_display_btn = document.getElementById(drop_down_btn_id);
    th_display_btn.addEventListener('click',display_question.bind(null,drop_down_btn_id,view_btn_img_id,values_obj)); //assigning event listener to this button to call the function
}

function Fetch_data_from_database(to_database,table_id) //function that fetches all the data from the database passed as JSON object
{
    console.log("loading");
    loading_overlay.hidden = false; //showing loading animation while fetching data from database
    const dbref = ref(db);
    get(child(dbref,to_database)).then((snapshot)=>{
    if(snapshot.exists())
    {
        var obj = (snapshot.val()); //getting the object
        
        console.log(obj);
        var values = Object.values(obj); //getting the value array of the object (each item in the object is itself an object)
        console.log(values);
        console.log("loaded");
        loading_overlay.hidden = true; //hiding the loading overlay after the data has been fetched
        fetch_MCQs.hidden = true; //hiding the fetch data button
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

function logout_user() //function is called when logout button is clicked
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



function edit_question() //this function is called when edit button is clicked
{
    //toggling everything
    Question_Pallet.ques_desc.disabled = !Question_Pallet.ques_desc.disabled;   

    if((Question_Pallet.Edit_Btn_img.src).includes("Edit_Icon.png"))
    {
        (Question_Pallet.Edit_Btn_img).src = "GUI_Resources/Edit_Icon_pressed.png";
        console.log("aaiya");
    }
    else
        Question_Pallet.Edit_Btn_img.src = "GUI_Resources/Edit_Icon.png";

    for(var i=0;i<4;i++)
    {
        Question_Pallet.MCQ_options_values[i].disabled = !Question_Pallet.MCQ_options_values[i].disabled;
        Question_Pallet.Correct_opt[i].disabled = !Question_Pallet.Correct_opt[i].disabled;
    }
    
    Question_Pallet.authoterd_by_me_radio.disabled = !Question_Pallet.authoterd_by_me_radio.disabled; 
    Question_Pallet.Authored_by_anonymous_radio.disabled = !Question_Pallet.Authored_by_anonymous_radio.disabled;
    Question_Pallet.Difficulty_Slider.disabled = !Question_Pallet.Difficulty_Slider.disabled;
    Question_Pallet.update_row.hidden = !Question_Pallet.update_row.hidden; //toggling update row
}


function Update_Data() //this function is called when update data button is clicked
{   
     
    var correct_opt;

    for(var i=0;i<4;i++)
        if(Question_Pallet.Correct_opt[i].checked)
            correct_opt = i+1;

    
    var path_directory = "Question_Bank/MCQs/" + Question_Pallet.Cur_Question_ID.innerHTML;
    
    //console.log(Question_Pallet.Cur_Question_ID.innerHTML);

    if(Question_Pallet.ques_desc.value != "" && Question_Pallet.MCQ_options_values[0].value && Question_Pallet.MCQ_options_values[1].value && Question_Pallet.MCQ_options_values[2].value && Question_Pallet.MCQ_options_values[3].value)
    {
            var Updated_Question_Obj = {
                Question_ID : Question_Pallet.Cur_Question_ID.innerHTML,
                Authored_by : (Question_Pallet.authoterd_by_me_radio.checked == true) ? Question_Pallet.authored_by_me_span.innerHTML : "Anonymous",
                Difficulty : Question_Pallet.Difficulty_Slider.value,
                Description : Question_Pallet.ques_desc.value,
                Option1 : Question_Pallet.MCQ_options_values[0].value ,
                Option2 : Question_Pallet.MCQ_options_values[1].value ,
                Option3 : Question_Pallet.MCQ_options_values[2].value ,
                Option4 : Question_Pallet.MCQ_options_values[3].value ,
                Correct_Option : correct_opt
            }

            //console.log(Updated_Question_Obj);

            update(ref(db,path_directory),Updated_Question_Obj)
            .then(()=>{
                alert("updated");
                location.href = "./Question_Bank.html";
            })
            .catch((error)=>{
                alert("unsuccessful while  updating , error = " + error);
            })
        }
        else
            alert("Please Enter Values To update");

   
}

Question_Pallet.Difficulty_Slider.oninput = function() //function called when slider value changes
{
   Question_Pallet.current_difficulty_span.innerHTML = Question_Pallet.Difficulty_Slider.value;
}

function Delete_Data() //function called when we press yes to delete confimation
{
    confirmation_overlay.hidden  = true;
    var path_directory = "Question_Bank/MCQs/" + Question_Pallet.Cur_Question_ID.innerHTML;
    remove(ref( db , path_directory ))
        .then(()=>{
            alert("deleted successfully");
            location.href = "./Question_Bank.html";
        })
        .catch((error)=>{
            alert("unsuccessful , error " + error);
        });
}

function view_confirmation() //this function enables the confirmation overlay when someone deletes a question
{
    confirmation_overlay.hidden = false;
}

function dont_delete() //function called when no confirmation button is pressed
{
    confirmation_overlay.hidden  = true;
}

logout_button.addEventListener('click',logout_user);
fetch_MCQs.addEventListener('click',Fetch_data_from_database.bind(null,"Question_Bank/MCQs","MCQ_Bank_table"));
Question_Pallet.Edit_Btn.addEventListener('click',edit_question);
Question_Pallet.Update_Ques_btn.addEventListener('click',Update_Data); //adding click event listener to Update Question Button
Question_Pallet.Delete_Btn.addEventListener('click',view_confirmation);
del_Confirm_no_btn.addEventListener('click',dont_delete);
del_Confirm_yes_btn.addEventListener('click',Delete_Data);
