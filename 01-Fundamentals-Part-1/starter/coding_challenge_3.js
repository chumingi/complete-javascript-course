const scoreDolphins = (96 + 108 + 89) / 3;
const scoreKolas = (88 + 91 + 110) / 3;

if (scoreDolphins === scoreKolas) {
    console.log("Both win the trophy");
} else if (scoreDolphins > scoreKolas) {
    console.log("Dolphins win the trophy");
} else {
    console.log("Kolas win the trophy");
}

// Bonus
if (scoreDolphins > scoreKolas && scoreDolphins >= 100) {
    console.log("Dolphins win the trophy");
} else if (scoreKolas > scoreDolphins && scoreKolas >= 100) {
    console.log("Kolas win the trophy");
} else if (scoreDolphins === scoreKolas && scoreDolphins >= 100) {
    console.log("Both win the trophy");
} else {
    console.log("No one wins the trophy");
}