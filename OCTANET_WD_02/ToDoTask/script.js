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
showTask();

/******************************************************************************/
/******************************************************************************/

function signup() {
    const username = document.getElementById("signupUsername").value;
    const userEmail = document.getElementById("signupEmail").value;
    const userPassword = document.getElementById("signupPassword").value;

    // Check if the user already exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(user => user.email === userEmail);

    if (!username || !userEmail || !userPassword) {
        alert("Please enter the credentials.");
    } else if (userExists) {
        alert("User already exists. Please use a different email.");
    } else {
        // Save the new user
        const newUser = { username, email: userEmail, password: userPassword };
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        // Automatically login after signing up
        loginUser(newUser.email, newUser.password);
    }
}

function login() {
    const userEmail = document.getElementById("loginEmail").value;
    const userPassword = document.getElementById("loginPassword").value;

    loginUser(userEmail, userPassword);
}

function loginUser(email, password) {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const authenticatedUser = existingUsers.find(user => user.email === email && user.password === password);

    if (!email || !password) {
        alert("Please enter the credentials.");
    } else if (authenticatedUser){
        console.log("Redirecting..."); // Check if this line is printed
        // Redirect to ToDo List page
        document.location.href = "OCTANET_WD_02/ToDoTask/ToDo.html";
        // Show the ToDo List container
        document.querySelector('.container').style.display = 'block';
    } else {
        alert("Invalid credentials. Please try again.");
    }
}