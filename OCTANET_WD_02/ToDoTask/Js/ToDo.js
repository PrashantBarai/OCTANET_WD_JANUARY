// document.addEventListener("DOMContentLoaded", function () {
//     // Check if the user is not logged in
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (!loggedInUser) {
//         // Redirect to login.html if the user is not logged in
//         location.href = "login.html";
//     }

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

/******************************************************************************/
/******************************************************************************/

function addTask(){
    if(inputBox.value === ''){
        alert("Please enter a task!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        // li.classList.add("list-group-item");
        // li.classList.add("list-group-item-dark");
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

function logout() {
    // Clear the logged-in user information
    localStorage.removeItem("loginUser");
    localStorage.removeItem("signupUsername");
    localStorage.removeItem("signupEmail");

    // Use replaceState to remove the ToDo.html from the history stack
    history.replaceState(null, "Login", "login.html");

    // Redirect to login.html after logout
    location.href = "login.html";
}

// Handle the popstate event to prevent going back to ToDo.html
window.onpopstate = function (event) {
    // Check if the user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // If not logged in, redirect to login.html
    if (!loggedInUser) {
        location.href = "login.html";
    }
};

showTask();
// });
