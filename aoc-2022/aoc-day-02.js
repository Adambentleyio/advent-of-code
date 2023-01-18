const fs = require("fs")

//      ROCK PAPER SCISSORS

// A=ROCK     B=PAPER   C=SCISSORS
// OPPONENT   ME
// X FOR ROCK 1 POINT
// Y FOR PAPER 2 POINTS
// Z FOR SCISSORS 3 POINTS

const sampleInput =`
A Y
B X
C Z`

const sampleInput2 =`

B X
`

const sampleInput3 =`

C Z`

const sampleInput4 =`
A Y
`


const puzzleInput = fs.readFileSync("day2.txt", "utf8").replace(/\r/g, "")

// Make a dictonary key with the values of the oponents and my rock pape scissors as inputs

// Paper plays rock
// scissors plays rock
// paper plays scissors
// rock plays scissors
// paper plays paper
// rock plays rock
// scissors plays scissors

///////////////////////////////////
//      ROCK PAPER SCISSORS
//
// A=ROCK     B=PAPER   C=SCISSORS
// OPPONENT   ME
// X FOR ROCK 1 POINT
// Y FOR PAPER 2 POINTS
// Z FOR SCISSORS 3 POINTS

const key = {
    0: ["A", "Y", 8],
    1: ["B", "X", 1],
    2: ["C", "Z", 6],
}

const moveValues = {X: 1, Y: 2, Z: 3 }

const gameValues = {
    A: {X: 3, Y: 6, Z: 0 },
    B: {X: 0, Y: 3, Z: 6},
    C: {X: 6, Y: 0, Z: 3}
}

const getPairsFromInput = input => {
    const trimmedInput = input.trim()
    const pairs = trimmedInput.split("\n")
    const splitOnSpace = pairs.map(pair => pair.split(" "))
    // evoke function that checks the pairs
    return checkPairs(splitOnSpace)

}

const checkPairs = pairs => {
    let total = 0
    // check the pairs
    pairs.map(hand => {
        // eg [A, Y]
        const [opponent, me] = hand
        const gameScore = gameValues[opponent][me]
        total += gameScore + moveValues[me]
    })

    return total

}

/*
PART 2
X is lose
Y is draw
Z is win
*/

const requiredMove = {
    A: {X: "Z", Y: "X", Z: "Y"},
    B: {X: "X", Y: "Y", Z: "Z"},
    C: {X: "Y", Y: "Z", Z: "X"}
}

const outcomeScore = {X: 0, Y: 3, Z: 6}

const getTheScore = (input) => {
    const gameGuide = input.trim().split("\n")
    // console.log({gameGuide})
    const gamePair = gameGuide.map(pair => pair.split(" "))
    // console.log({gamePair})
    const gameScore = gamePair.map(pair => {
        const [opponentMove, outcome] = pair
        console.log({opponentMove, outcome})
        const myGameMove = requiredMove[opponentMove][outcome]
        const gameTotal = outcomeScore[outcome] + moveValues[myGameMove]
        console.log({myGameMove, gameTotal})
        return gameTotal
    })
    return gameScore.reduce((a, b) => a + b, 0)
}

// console.log(getPairsFromInput(sampleInput))
console.log(getTheScore(puzzleInput))






