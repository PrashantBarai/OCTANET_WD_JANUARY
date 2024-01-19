function signup() {
    const username = document.getElementById("signupUsername").value;
    const userEmail = document.getElementById("signupEmail").value;
    const userPassword = document.getElementById("signupPassword").value;

    // // Check if the user is already logged in
    // const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    // if (loggedInUser) {
    //     console.log("User is already logged in. Redirecting to ToDo.html...");
    // // Redirect to ToDo.html if the user is logged in
    // location.href = "ToDo.html";
    // }

    // Displaying the username in the UI
    // usernameTag.textContent = username;

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
         // Store the logged-in user information
        //  localStorage.setItem("loggedInUser", JSON.stringify(authenticatedUser));
        // Redirect to ToDo List page
        location.href = "ToDo.html";
        // Show the ToDo List container
        document.querySelector('.container').style.display = 'block';
    } else {
        alert("Invalid credentials. Please try again.");
    }
}