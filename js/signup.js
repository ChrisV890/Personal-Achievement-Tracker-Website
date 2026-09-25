const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        console.log(error);
        alert(error.message);
        return;
    }

    console.log(data);
    alert("Account created!");
    window.location.href = "dash.html";


});