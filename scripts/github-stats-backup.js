
const username = "fayjullahhemon-2025";

async function getGithubData() {
    const token = process.env.GITHUB_TOKEN;

    const query = `
        query {
            user(login: "${username}") {
                name
                login
                followers {
                    totalCount
                }
                repositories(
                    first: 100
                    ownerAffiliations: OWNER
                    privacy: PUBLIC
                ) {
                    totalCount
                    nodes {
                        stargazerCount
                        forkCount
                    }
                }
            }
        }
    `;

    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify({
            query
        })
    });

    const result = await response.json();

    if (result.errors) {
        console.error(result.errors);
        process.exit(1);
    }

    const user = result.data.user;

    let stars = 0;
    let forks = 0;

    user.repositories.nodes.forEach(repo => {
        stars += repo.stargazerCount;
        forks += repo.forkCount;
    });

    console.log("================================");
    console.log("       GITHUB PROFILE STATS");
    console.log("================================");

    console.log("Name:", user.name);
    console.log("Username:", user.login);
    console.log("Followers:", user.followers.totalCount);
    console.log("Repositories:", user.repositories.totalCount);
    console.log("⭐ Stars:", stars);
    console.log("🍴 Forks:", forks);
}

getGithubData();
