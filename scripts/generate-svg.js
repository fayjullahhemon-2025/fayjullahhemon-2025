const fs = require("fs");

const stats = {
    currentStreak: 78,
    longestStreak: 78,
    contributions: 660,
    pullRequests: 7,
    issues: 0,
    stars: 0,
    forks: 1,
    repositories: 41,
    followers: 5
};

const svg = `
<svg
    width="900"
    height="500"
    viewBox="0 0 900 500"
    xmlns="http://www.w3.org/2000/svg"
>

    <rect
        width="900"
        height="500"
        rx="24"
        fill="#0d1117"
    />

    <rect
        x="1"
        y="1"
        width="898"
        height="498"
        rx="24"
        fill="none"
        stroke="#30363d"
        stroke-width="2"
    />

    <!-- Header -->

    <text
        x="50"
        y="55"
        fill="#8b949e"
        font-family="monospace"
        font-size="16"
    >
        $ github --stats
    </text>

    <text
        x="50"
        y="100"
        fill="#ffffff"
        font-family="Arial, sans-serif"
        font-size="28"
        font-weight="bold"
    >
        FAYJULLAH HAQUE EMON
    </text>

    <text
        x="50"
        y="128"
        fill="#58a6ff"
        font-family="Arial, sans-serif"
        font-size="16"
    >
        WEB DEVELOPER
    </text>

    <!-- Divider -->

    <line
        x1="50"
        y1="155"
        x2="850"
        y2="155"
        stroke="#30363d"
    />

    <!-- Row 1 -->

    <text x="60" y="195"
        fill="#8b949e"
        font-family="Arial"
        font-size="14">
        🔥 CURRENT STREAK
    </text>

    <text x="60" y="235"
        fill="#ffffff"
        font-family="Arial"
        font-size="30"
        font-weight="bold">
        ${stats.currentStreak} DAYS
    </text>


    <text x="320" y="195"
        fill="#8b949e"
        font-family="Arial"
        font-size="14">
        🏆 LONGEST STREAK
    </text>

    <text x="320" y="235"
        fill="#ffffff"
        font-family="Arial"
        font-size="30"
        font-weight="bold">
        ${stats.longestStreak} DAYS
    </text>


    <text x="580" y="195"
        fill="#8b949e"
        font-family="Arial"
        font-size="14">
        📊 CONTRIBUTIONS
    </text>

    <text x="580" y="235"
        fill="#ffffff"
        font-family="Arial"
        font-size="30"
        font-weight="bold">
        ${stats.contributions}
    </text>


    <!-- Row 2 -->

    <text x="60" y="285"
        fill="#8b949e"
        font-family="Arial"
        font-size="14">
        🔀 PULL REQUESTS
    </text>

    <text x="60" y="320"
        fill="#ffffff"
        font-family="Arial"
        font-size="25"
        font-weight="bold">
        ${stats.pullRequests}
    </text>


    <text x="270" y="285"
        fill="#8b949e"
        font-family="Arial"
        font-size="14">
        ⭐ STARS
    </text>

    <text x="270" y="320"
        fill="#ffffff"
        font-family="Arial"
        font-size="25"
        font-weight="bold">
        ${stats.stars}
    </text>


    <text x="430" y="285"
        fill="#8b949e"
        font-family="Arial"
        font-size="14">
        📦 REPOSITORIES
    </text>

    <text x="430" y="320"
        fill="#ffffff"
        font-family="Arial"
        font-size="25"
        font-weight="bold">
        ${stats.repositories}
    </text>


    <text x="650" y="285"
        fill="#8b949e"
        font-family="Arial"
        font-size="14">
        👥 FOLLOWERS
    </text>

    <text x="650" y="320"
        fill="#ffffff"
        font-family="Arial"
        font-size="25"
        font-weight="bold">
        ${stats.followers}
    </text>


    <!-- Bottom divider -->

    <line
        x1="50"
        y1="355"
        x2="850"
        y2="355"
        stroke="#30363d"
    />

    <!-- Activity -->

    <text
        x="50"
        y="390"
        fill="#8b949e"
        font-family="monospace"
        font-size="14"
    >
        CONTRIBUTION ACTIVITY
    </text>

    <text
        x="50"
        y="425"
        fill="#58a6ff"
        font-family="monospace"
        font-size="18"
    >
        ░ ▒ ▓ ▓ ▒ ░ ░ ▓ ▓ ▓ ▒ ░ ▒ ▓ ▓ ░ ░ ▒ ▓ ▓ ▒ ░
    </text>

    <text
        x="50"
        y="465"
        fill="#8b949e"
        font-family="monospace"
        font-size="13"
    >
        React • TypeScript • Next.js • Node.js
    </text>

</svg>
`;

fs.writeFileSync(
    "assets/github-stats.svg",
    svg
);

console.log("✅ github-stats.svg generated successfully!");
