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

                contributionsCollection {

                    contributionCalendar {

                        totalContributions

                        weeks {
                            contributionDays {
                                date
                                contributionCount
                            }
                        }
                    }

                    pullRequestContributions {
                        totalCount
                    }

                    issueContributions {
                        totalCount
                    }
                }
            }
        }
    `;

    const response = await fetch(
        "https://api.github.com/graphql",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                query
            })
        }
    );

    const result = await response.json();

    if (result.errors) {
        console.error(result.errors);
        process.exit(1);
    }

    const user = result.data.user;

    // -----------------------------
    // Repository statistics
    // -----------------------------

    let stars = 0;
    let forks = 0;

    user.repositories.nodes.forEach(repo => {
        stars += repo.stargazerCount;
        forks += repo.forkCount;
    });

    // -----------------------------
    // Contribution data
    // -----------------------------

    const contributionDays = [];

    user.contributionsCollection
        .contributionCalendar
        .weeks
        .forEach(week => {

            week.contributionDays.forEach(day => {
                contributionDays.push(day);
            });

        });

    // Sort oldest → newest
    contributionDays.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    // -----------------------------
    // Calculate streaks
    // -----------------------------

    let currentStreak = 0;
    let longestStreak = 0;
    let runningStreak = 0;

    for (const day of contributionDays) {

        if (day.contributionCount > 0) {

            runningStreak++;

            if (runningStreak > longestStreak) {
                longestStreak = runningStreak;
            }

        } else {

            runningStreak = 0;
        }
    }

    // Current streak
    for (let i = contributionDays.length - 1; i >= 0; i--) {

        if (contributionDays[i].contributionCount > 0) {
            currentStreak++;
        } else {
            break;
        }
    }

    // -----------------------------
    // Final statistics
    // -----------------------------

    const totalContributions =
        user.contributionsCollection
            .contributionCalendar
            .totalContributions;

    const pullRequests =
        user.contributionsCollection
            .pullRequestContributions
            .totalCount;

    const issues =
        user.contributionsCollection
            .issueContributions
            .totalCount;

    console.log("");
    console.log("================================");
    console.log("       GITHUB PROFILE STATS");
    console.log("================================");

    console.log("Name:", user.name);
    console.log("Username:", user.login);

    console.log("");

    console.log("🔥 Current Streak:", currentStreak);
    console.log("🏆 Longest Streak:", longestStreak);

    console.log("");

    console.log("📊 Contributions:", totalContributions);
    console.log("🔀 Pull Requests:", pullRequests);
    console.log("🐛 Issues:", issues);

    console.log("");

    console.log("⭐ Stars:", stars);
    console.log("🍴 Forks:", forks);
    console.log("📦 Repositories:", user.repositories.totalCount);
    console.log("👥 Followers:", user.followers.totalCount);

    console.log("");
}

getGithubData();
