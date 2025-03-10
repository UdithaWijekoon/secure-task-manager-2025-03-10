const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const toggleForm = document.getElementById("toggleForm");
const toggleText = document.getElementById("toggleText");
const formTitle = document.getElementById("formTitle");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");

// Function to show messages
function showMessage(element, message, isSuccess = false) {
    element.innerText = message;
    element.classList.remove("hidden");
    element.classList.toggle("text-green-500", isSuccess);
    element.classList.toggle("text-red-500", !isSuccess);
}


// Toggle between login and registration forms
toggleForm.addEventListener("click", (e) => {
    e.preventDefault();
    if (loginForm.classList.contains("hidden")) {
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");
        formTitle.innerText = "Login";
        toggleText.innerText = "Don't have an account?";
        toggleForm.innerText = "Register";
    } else {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
        formTitle.innerText = "Register";
        toggleText.innerText = "Already have an account?";
        toggleForm.innerText = "Login";
    }
});

// Handle login
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMessage.classList.add("hidden");

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        // Check if login is unsuccessful and show error messages
        if (!response.ok) {
            if (data.error && data.error.includes("Unauthorized")) {
                throw new Error("Incorrect email or password");
            }
            throw new Error(data.error || "Login failed");
        }

        // Store token & success flag
        localStorage.setItem("token", data.token);
        localStorage.setItem("loginSuccess", "true");

        // Redirect to dashboard
        window.location.href = "dashboard.html";
    } catch (error) {
        errorMessage.innerText = error.message;
        errorMessage.classList.remove("hidden");
    }
});

// Handle registration
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMessage.classList.add("hidden");

    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const password_confirm = document.getElementById("register-password-confirm").value;

    // Frontend password length validation
    if (password.length < 6) {
        errorMessage.innerText = "Password must be at least 6 characters.";
        errorMessage.classList.remove("hidden");
        return;
    }

    if (password !== password_confirm) {
        errorMessage.innerText = "Passwords do not match";
        errorMessage.classList.remove("hidden");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, password_confirmation: password_confirm })
        });

        // Ensure the response is valid JSON
        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (jsonError) {
            throw new Error("Invalid server response. May be email is already taken. Try again with another email ");
        }

        if (!response.ok) {
            if (data.errors) {
                const errorMessages = Object.values(data.errors).flat().join(" ");
                throw new Error(errorMessages);
            }
            throw new Error(data.error || "Registration failed");
        }

        alert("Registration successful! You can now login.");
        location.reload();
        
        toggleForm.click();
    } catch (error) {
        errorMessage.innerText = error.message;
        errorMessage.classList.remove("hidden");
    }
});

// Handle logout
async function logout() {
    const token = localStorage.getItem("token");

    if (!token) {
        showMessage(errorMessage, "You are not logged in.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/logout", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Logout failed");

        // Remove token and show success message
        localStorage.removeItem("token");
        showMessage(successMessage, "Logout successful!", true);

        setTimeout(() => {
            window.location.href = "index.html"; // Redirect to login page
        }, 1500);
    } catch (error) {
        showMessage(errorMessage, error.message);
    }
}