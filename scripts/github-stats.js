const username = "fayjullahhemon-2025";

async function getGithubData() {
    const response = await fetch(
        `https://api.github.com/users/${username}`
    );

    const user = await response.json();

    console.log("================================");
    console.log("       GITHUB PROFILE STATS");
    console.log("================================");

    console.log("Name:", user.name);
    console.log("Username:", user.login);
    console.log("Followers:", user.followers);
    console.log("Public Repositories:", user.public_repos);
}

getGithubData();
