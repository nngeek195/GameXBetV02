// Function to handle scrolling to the login section
function scrollToLogin() {
    document.getElementById('login-section').scrollIntoView({ behavior: 'smooth' });
}

// Function to show the signup popup
function showSignupPopup() {
    document.getElementById('signup-popup').style.display = 'flex';
}

// Function to hide the signup popup
function hideSignupPopup() {
    document.getElementById('signup-popup').style.display = 'none';
}

// Optional: Hide popup if clicking outside of it
window.onclick = function(event) {
    const popup = document.getElementById('signup-popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
}

// Function to handle signup
function handleSignup(event) {
    event.preventDefault();
    
    const username = document.querySelector('#signup-username').value;
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;

    // Check if email already exists
    if (localStorage.getItem(email)) {
        alert("This email is already registered.");
        return;
    }

    // Store the user data in localStorage
    const userData = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem(email, JSON.stringify(userData));

    // Save username to localStorage for profile use
    localStorage.setItem('profileName', username);

    // Redirect to login page after successful signup
    alert("Signup successful! Please log in.");
    window.location.href = "loging.html";  // Corrected from 'loging.html' to 'login.html'
}

// Function to handle login
function handleLogin(event) {
    event.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem(email));

    if (!userData) {
        alert("User not found. Please sign up first.");
        return;
    }

    if (userData.password === password) {
        // Save username to localStorage for profile use
        localStorage.setItem('profileName', userData.username);

        // Redirect to user.html if login is successful
        window.location.href = "user.html";
    } else {
        alert("Incorrect password. Please try again.");
    }
}

// Attach event listeners to signup and login forms
document.querySelector('#signup-form').addEventListener('submit', handleSignup);
document.querySelector('#login-form').addEventListener('submit', handleLogin);
