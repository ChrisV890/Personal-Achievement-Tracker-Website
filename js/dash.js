const achievements = [];
const achievementModal = document.getElementById("achievementModal");
const addAchievementButton = document.getElementById("addAchievementButton");
const closeAchievementModal = document.getElementById("closeAchievementModal");
const createButton = document.getElementById("createAchievementButton");
const signInButton = document.getElementById("signInButton");
const signUpButton = document.getElementById("signUpButton");
const logoutButton = document.getElementById("logoutButton");
const loggedOutControls = document.getElementById("loggedOutControls");
const loggedInControls = document.getElementById("loggedInControls");
const userEmail = document.getElementById("userEmail");

function createAchievement(title, description, xp){
    let achievement = {
        id: Date.now(),
        title: title,
        description: description,
        xp: xp
    };

    achievements.push(achievement);
    displayAchievements();
}



function displayAchievements() {
    const achievementList = document.getElementById("achievementListJS");

    achievementList.innerHTML = "";

    achievements.forEach(function(achievement) {
        const box = document.createElement("div");
        box.classList.add("achievementBox");

        const title = document.createElement("h3");
        //title.classList.add
        title.textContent = achievement.title;

        const description = document.createElement("p");
        //description.classList.add
        description.textContent = achievement.description;

        const xp = document.createElement("p");
        //xp.classList.add
        xp.textContent = `+${achievement.xp} XP`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteAchievement(achievement.id);
        });



        box.appendChild(title);
        box.appendChild(description);
        box.appendChild(xp);
        box.appendChild(deleteButton)

        achievementList.appendChild(box)
    });
}

function deleteAchievement(id) {
    const index = achievements.findIndex(function(achievement) {
        return achievement.id === id;
    });

    achievements.splice(index, 1);

    displayAchievements();
}


async function checkUser() {

    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.log(error);
        return;
    }

    if (!data.session) {
        window.location.href = "login.html";
        return;
    }

    loggedInControls.classList.remove("hidden");

    userEmail.textContent = data.session.user.email;
}










addAchievementButton.addEventListener("click", function() {
    achievementModal.classList.remove("hidden");
});

closeAchievementModal.addEventListener("click", function() {
    achievementModal.classList.add("hidden");
});

createButton.addEventListener("click", function() {

    const title = document.getElementById("achievementTitle").value;
    const description = document.getElementById("achievementDescription").value;
    const xp = Number(document.getElementById("achievementXP").value);

    createAchievement(title, description, xp)
    achievementModal.classList.add("hidden");
});

signInButton.addEventListener("click", function() {
    window.location.href = "login.html";
});

signUpButton.addEventListener("click", function() {
    window.location.href = "signup.html";
});

logoutButton.addEventListener("click", async function() {

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        console.log(error);
        alert(error.message);
        return;
    }

    window.location.href = "login.html";
});



displayAchievements();
checkUser();

