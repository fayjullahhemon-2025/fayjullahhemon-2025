
const fs = require("fs");

const username = "fayjullahhemon-2025";

async function getGithubData() {
    const token = process.env.GITHUB_TOKEN;

    const query =
        "query { " +
        "user(login: \"" + username + "\") { " +
        "name " +
        "login " +

        "followers { " +
        "totalCount " +
        "} " +

        "repositories( " +
        "first: 100 " +
        "ownerAffiliations: OWNER " +
        "privacy: PUBLIC " +
        ") { " +

        "totalCount " +

        "nodes { " +
        "stargazerCount " +
        "forkCount " +
        "} " +

        "} " +

        "contributionsCollection { " +

        "contributionCalendar { " +
        "totalContributions " +

        "weeks { " +
        "contributionDays { " +
        "date " +
        "contributionCount " +
        "} " +
        "} " +

        "} " +

        "pullRequestContributions { " +
        "totalCount " +
        "} " +

        "issueContributions { " +
        "totalCount " +
        "} " +

        "} " +

        "} " +
        "}";

    // Get GitHub data

    const response = await fetch(
        "https://api.github.com/graphql",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },

            body: JSON.stringify({
                query: query
            })
        }
    );

    const result = await response.json();

    // Check for GitHub API errors

    if (result.errors) {
        console.error("GitHub API Error:");
        console.error(result.errors);
        process.exit(1);
    }

    const user = result.data.user;

    // -----------------------------
    // Repository statistics
    // -----------------------------

    let stars = 0;
    let forks = 0;

    user.repositories.nodes.forEach(function (repo) {
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
        .forEach(function (week) {

            week.contributionDays.forEach(function (day) {
                contributionDays.push(day);
            });

        });

    // Sort oldest to newest

    contributionDays.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    // -----------------------------
    // Calculate streaks
    // -----------------------------

    let currentStreak = 0;
    let longestStreak = 0;
    let runningStreak = 0;

    contributionDays.forEach(function (day) {

        if (day.contributionCount > 0) {

            runningStreak++;

            if (runningStreak > longestStreak) {
                longestStreak = runningStreak;
            }

        } else {

            runningStreak = 0;
        }
    });

    // -----------------------------
    // Current streak
    // -----------------------------

    for (
        let i = contributionDays.length - 1;
        i >= 0;
        i--
    ) {

        if (contributionDays[i].contributionCount > 0) {

            currentStreak++;

        } else {

            break;
        }
    }

    // -----------------------------
    // Other statistics
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

    // -----------------------------
    // Display statistics
    // -----------------------------

    console.log("");
    console.log("================================");
    console.log("       GITHUB PROFILE STATS");
    console.log("================================");

    console.log("Name:", user.name);
    console.log("Username:", user.login);

    console.log("");

    console.log("Current Streak:", currentStreak);
    console.log("Longest Streak:", longestStreak);

    console.log("");

    console.log("Contributions:", totalContributions);
    console.log("Pull Requests:", pullRequests);
    console.log("Issues:", issues);

    console.log("");

    console.log("Stars:", stars);
    console.log("Forks:", forks);
    console.log("Repositories:", user.repositories.totalCount);
    console.log("Followers:", user.followers.totalCount);

    console.log("");

    // -----------------------------
    // Create stats object
    // -----------------------------

    const stats = {
        currentStreak: currentStreak,
        longestStreak: longestStreak,
        contributions: totalContributions,
        pullRequests: pullRequests,
        issues: issues,
        stars: stars,
        forks: forks,
        repositories: user.repositories.totalCount,
        followers: user.followers.totalCount
    };

    // -----------------------------
    // Save stats.json
    // -----------------------------

    fs.writeFileSync(
        "scripts/stats.json",
        JSON.stringify(stats, null, 4)
    );

    console.log("stats.json created successfully!");
}

getGithubData();

