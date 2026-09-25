let achievements = [];
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

async function createAchievement(title, description, category, xp) {

    const { data: sessionData, error: sessionError } =
        await supabaseClient.auth.getSession();

    if (sessionError) {
        console.log(sessionError);
        return;
    }

    const user = sessionData.session.user;

    const { data, error } = await supabaseClient
        .from("achievements")
        .insert({
            user_id: user.id,
            title: title,
            description: description,
            category: category,
            xp: xp
        });

    if (error) {
        console.log(error);
        alert(error.message);
        return;
    }

    loadAchievements();
}



function displayAchievements() {
    const achievementList = document.getElementById("achievementListJS");

    achievementList.innerHTML = "";

    achievements.forEach(function(achievement) {
        if (achievement.completed) {
            return;
        }

        const box = document.createElement("div");
        box.classList.add("achievementBox");

        const title = document.createElement("h3");
        //title.classList.add
        title.textContent = achievement.title;

        const description = document.createElement("p");
        //description.classList.add
        description.textContent = achievement.description;

        const category = document.createElement("p");
        category.textContent = achievement.category;

        const xp = document.createElement("p");
        //xp.classList.add
        xp.textContent = `+${achievement.xp} XP`;

        const completeButton = document.createElement("button");
        completeButton.textContent = achievement.completed ? "Completed" : "Complete";

        completeButton.addEventListener("click", function() {
            completeAchievement(achievement.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteAchievement(achievement.id);
        });



        box.appendChild(title);
        box.appendChild(description);
        box.appendChild(xp);
        box.appendChild(category);
        box.appendChild(completeButton);
        box.appendChild(deleteButton)

        achievementList.appendChild(box)
    });
}

async function deleteAchievement(id) {

    const { error } = await supabaseClient
        .from("achievements")
        .delete()
        .eq("id", id);

    if (error) {
        console.log(error);
        alert(error.message);
        return;
    }

    loadAchievements();
}

async function completeAchievement(id) {

    const { error } = await supabaseClient
        .from("achievements")
        .update({
            completed: true
        })
        .eq("id", id);

    if (error) {
        console.log(error);
        alert(error.message);
        return;
    }

    loadAchievements();
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


async function loadAchievements() {

    const { data: sessionData, error: sessionError } =
        await supabaseClient.auth.getSession();

    if (sessionError) {
        console.log(sessionError);
        return;
    }

    const user = sessionData.session.user;

    const { data, error } = await supabaseClient
        .from("achievements")
        .select("*")
        .eq("user_id", user.id)
        

    if (error) {
        console.log(error);
        return;
    }

    achievements = data;

    displayAchievements();
    displayCategoryProgress();
}


function displayCategoryProgress() {

    const categories = {
        Personal: { total: 0, completed: 0 },
        Work: { total: 0, completed: 0 },
        School: { total: 0, completed: 0 },
        Social: { total: 0, completed: 0 },
        Financial: { total: 0, completed: 0 }
    };

    achievements.forEach(function(achievement) {

        const category = achievement.category;

        if (categories[category]) {

            categories[category].total++;

            if (achievement.completed) {
                categories[category].completed++;
            }
        }
    });

    updateCategoryProgress(
        categories.Personal,
        "personalProgressText",
        "personalProgressBar"
    );

    updateCategoryProgress(
        categories.Work,
        "workProgressText",
        "workProgressBar"
    );

    updateCategoryProgress(
        categories.School,
        "schoolProgressText",
        "schoolProgressBar"
    );

    updateCategoryProgress(
        categories.Social,
        "socialProgressText",
        "socialProgressBar"
    );

    updateCategoryProgress(
        categories.Financial,
        "financialProgressText",
        "financialProgressBar"
    );
}

function updateCategoryProgress(category, textId, barId) {

    const text = document.getElementById(textId);
    const bar = document.getElementById(barId);

    text.textContent =
        `Achievement Completion: ${category.completed}/${category.total}`;

    if (category.total === 0) {
        bar.style.width = "0%";
        return;
    }

    const percentage =
        (category.completed / category.total) * 100;

    bar.style.width = `${percentage}%`;
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
    const category = document.getElementById("achievementCategory").value;
    const xp = Number(document.getElementById("achievementXP").value);

    createAchievement(title, description, category, xp)
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




checkUser();
loadAchievements();
