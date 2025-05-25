document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = { email, password };

    console.log(JSON.stringify(user));

    fetch("http://localhost:3000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        if (data.user) {
          window.location.href = `index.html?name=${data.user.firstName}`;
        }
      })
      .catch((error) => {
        console.error("Error during login:", error.message);
      });
  });
