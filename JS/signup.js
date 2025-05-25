// signup.js
document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("sign-up");

  if (signUpForm) {
    signUpForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      // Get input elements by their corrected IDs
      const firstNameInput = document.getElementById("first-name");
      const lastNameInput = document.getElementById("last-name");
      const emailInput = document.getElementById("email"); // Corrected ID
      const passwordInput = document.getElementById("password"); // Corrected ID

      // Get date of birth select elements
      const dobDaySelect = document.getElementById("dob-day");
      const dobMonthSelect = document.getElementById("dob-month");
      const dobYearSelect = document.getElementById("dob-year");

      // Get gender radio buttons
      const genderMale = document.querySelector(
        'input[name="gender"][value="Male"]'
      );
      const genderFemale = document.querySelector(
        'input[name="gender"][value="Female"]'
      );

      // Add checks to ensure inputs exist before accessing .value
      if (
        !firstNameInput ||
        !lastNameInput ||
        !emailInput ||
        !passwordInput ||
        !dobDaySelect ||
        !dobMonthSelect ||
        !dobYearSelect ||
        !genderMale ||
        !genderFemale
      ) {
        console.error(
          "One or more required form elements are missing from the HTML."
        );
        showError("Form is incomplete. Please contact support.");
        return;
      }

      // Trim values where appropriate
      const firstName = firstNameInput.value.trim();
      const lastName = lastNameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      // Get date of birth values
      const day = dobDaySelect.value;
      const month = dobMonthSelect.value; // Expecting numeric month values from HTML
      const year = dobYearSelect.value;

      // Get selected gender
      let gender = "";
      if (genderMale.checked) {
        gender = genderMale.value;
      } else if (genderFemale.checked) {
        gender = genderFemale.value;
      }

      // Combine date of birth into YYYY/MM/DD format for consistency with your initial JSON example
      // Ensure month and day are padded with leading zeros if they are single digits
      const formattedMonth = month.padStart(2, "0");
      const formattedDay = day.padStart(2, "0");
      const birthDate = `${year}/${formattedMonth}/${formattedDay}`;

      // Client-side validation
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !day ||
        !month ||
        !year ||
        !gender
      ) {
        showError("Please fill in all required fields");
        return;
      }

      if (password.length < 8) {
        showError("Password must be at least 8 characters");
        return;
      }

      if (!isValidEmail(email)) {
        showError("Please enter a valid email address");
        return;
      }

      // Create user object, using 'birthDate' key as per your initial JSON
      const user = { firstName, lastName, email, password, gender, birthDate };

      // Handle submit button state
      const submitBtn = document.querySelector('button[type="submit"]');
      if (!submitBtn) {
        console.error("Submit button not found.");
        showError("Signup functionality error. Please try again later.");
        return;
      }
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Creating account...";

      clearError(); // Clear any previous error messages

      // API call to signup endpoint
      fetch("http://localhost:3000/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            // If response is not OK (e.g., 400, 500), parse error message from body
            return response.json().then((data) => {
              throw new Error(
                data.message || `Signup failed: ${response.status}`
              );
            });
          }
          return response.json(); // Parse successful response
        })
        .then((data) => {
          // Handle successful signup
          if (data.user) {
            // Store user data in localStorage
            localStorage.setItem("currentUser", JSON.stringify(data.user));

            // Redirect to index.html with success message
            window.location.href = `index.html?signup=success&name=${encodeURIComponent(
              data.user.firstName
            )}`;
          } else {
            // If API returns success but no user data
            showError(
              "Signup successful, but no user data received. Please log in."
            );
          }
        })
        .catch((error) => {
          // Handle any errors during the fetch operation
          console.error("Error during signup:", error.message);
          showError(
            error.message || "Failed to create account. Please try again."
          );
        })
        .finally(() => {
          // Re-enable button and restore text, regardless of success or failure
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        });
    });
  } else {
    console.error(
      "Sign-up form element with ID 'sign-up' not found in the HTML."
    );
  }

  // Helper function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Helper function to display error messages
  function showError(message) {
    let errorElement = document.getElementById("error-message");

    if (!errorElement) {
      // If error message element doesn't exist, create it
      const errorDiv = document.createElement("div");
      errorDiv.id = "error-message";
      errorDiv.className = "error-message"; // Assign a class for styling
      errorDiv.textContent = message;

      const form = document.getElementById("sign-up");
      if (form) {
        // Insert error message at the top of the form
        form.insertBefore(errorDiv, form.firstChild);
      } else {
        console.error(
          "Error: '#sign-up' form not found to display error message."
        );
      }
    } else {
      // If error message element already exists, update its content and display it
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  }

  // Helper function to clear error messages
  function clearError() {
    const errorElement = document.getElementById("error-message");
    if (errorElement) {
      errorElement.style.display = "none";
      errorElement.textContent = ""; // Clear text content as well
    }
  }
});
