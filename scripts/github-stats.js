
const username = "fayjullahhemon-2025";

async function getGithubData() {
    const response = await fetch(
        `https://api.github.com/users/${username}`
    );

    const data = await response.json();

    console.log("Name:", data.name);
    console.log("Username:", data.login);
    console.log("Followers:", data.followers);
    console.log("Public Repositories:", data.public_repos);
}

getGithubData();
