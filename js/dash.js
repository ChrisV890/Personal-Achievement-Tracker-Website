const achievements = [
    {
        title: "Test",
        description: "Please Work",
        xp: 250
    }
];




function createAchievement(title, description, xp){
    let achievement = {
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


        box.appendChild(title);
        box.appendChild(description);
        box.appendChild(xp);

        achievementList.appendChild(box)
    });
}



displayAchievements();

createAchievement("fuck", "fucking fuck", 200);

