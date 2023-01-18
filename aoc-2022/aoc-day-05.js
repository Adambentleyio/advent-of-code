const fs = require("fs")

// read day 5 input File

const day5Input = fs.readFileSync("day5.txt", "utf8")

function parseInput(stacks) {

    let inputStacksArray = stacks.split("\n")
        .slice(0,-1)

    // get the size of each row from the inputStacks array and assign it to an array
    let maxArrayLength = []

    for(i=0; i < inputStacksArray.length; i++){
        maxArrayLength.push(inputStacksArray[i].length)
    }

    // get the maximum size of each inputStacks element
    let inputStacksIterator = Math.max(...maxArrayLength)

    let inputStacksLettersArray = []

    for (i=0; i < inputStacksArray.length; i++) {
        // for each element/row in the array get only the characters of the crates
        // console.log("i am i the iterator " + i)

        let inputRowLetters = []

        for (j=1; j < inputStacksIterator; j+=4) {
            // each character is the 4th character in each row. Add it to a string, and return the full string each loop

            inputRowLetters.push(inputStacksArray[i][j])

        }

        // console.log(inputRowLetters)
        inputStacksLettersArray.push(inputRowLetters)

    }

    // convert rows into columns
    // check each row
    const ordered = []

    for (let i = 0; i < inputStacksLettersArray[0].length; i++) {

        let cols = [] //eg [[000],[111]]

        for (let j = 0; j < inputStacksLettersArray.length; j++) {

            inputStacksLettersArray[j][i] != ' ' || inputStacksLettersArray[j][i] ==  undefined
            ? cols.push(inputStacksLettersArray[j][i])
            : inputStacksLettersArray
        }

        const singleStack = cols.filter(element => element != undefined )

        ordered.push(singleStack)
    }

    // Ordered contains an array of arrays of the correct columns
    return ordered

}

const cratesFromReduce = crates.reduce((arr, row) => {
    row.reduce((innerArr, char, j) => {
        char === ""
        ? innerArr
        : innerArr.map((str, k) => j === k ? str+char : str)
    }, arr)
}, Array(howManyStacks).fill("") )

const extractInstructions = (str) => {
    const [,qty,,from,,to] = str.split(' ')

    return [Number(qty), Number(from), Number(to)]
}

const getInstructions = moves => {

    const instructions = moves.split('\n')
    .map(extractInstructions)

    return instructions

}

const move = (crates, instruction, {reverse}) => {

    // console.log(instruction)

    const [move, from, to] = instruction

    // check to see if move from and to are numbers and that from or to is not greater than the length of the crates array
    // if (typeof move !== 'number' || typeof from !== 'number' || typeof to !== 'number' || from > crates.length || to > crates.length) {

        // make copy of the crates array
        let newCrates = crates

        // remove the first elements equal to the move number and from the crates array at the from index
        let cargoMove = newCrates[from-1].splice(0, move)

        // reverse the order of cargoMove if more than one element
        if (reverse) {
            cargoMove.length > 1 ? cargoMove.reverse() : cargoMove
        }

        // add cargoMove to the beginning of the crates array
        newCrates[to-1].unshift(...cargoMove)
        // console log the new array at the to index
        // console.log(newCrates)

    // }
        return newCrates

}

// // represent the stacks as an array of strings
// const stackRows = stackPart.split("\n").slice(0, -1)
// // console.log({stackRows})

// // make an array for each row with only the characters in it. Each character can be obtained by filtering for only the characters in the array with an index has a modulus of 1 when divided by 4
// const stackMatrix = stackRows.map(row => [...row].filter((_, i) => i % 4 === 1))

// //find out the longest array from the array of arrays in order to create an empty array with that many elements
// const howManyStacks = stackMatrix.reduce((acc, curr) => Math.max(acc, curr.length), 0)

// // make an array from the stack rows that transposes the rows into their correct columns
// const stacks = stackMatrix.reduce(
//     (arr, row) =>
//     row.reduce(
//         (innerArr, char, j) =>
//         char === ""
//         ? innerArr
//         : innerArr.map((str, k) =>
//             j === k ? str + char : str),
//         arr
//     ),
//     Array(howManyStacks).fill(""))
//     .map(stack => stack.trim())
//     .map(stack => [...stack])

//     const instructions = instructionPart.split("\n")

//     // function that returns all the crate moves in an array of objects as moveStack, fromStack, toStack
//     const allCrateMovesByLine = () => {

//         let crateMoveInstructions = []

//         for (lines of instructions) {
//         // regex to find the 3 numbers in the string
//         let [moveStack, fromStack, toStack] = lines.match(/\d+/g).map(Number)
//         let lineOfMoves = {moveStack, fromStack, toStack}
//         crateMoveInstructions.push(lineOfMoves)
//     }

//     return crateMoveInstructions
// }

//     const moveCratesExecution = (stacks, crateMoveInstructions) => {

//         let newStacks = stacks

//         for (let {moveStack, fromStack, toStack} of crateMoveInstructions) {

//             let temp = []

//             for (i = 0; i < moveStack; i++) {
//                 let singleCrateMove = newStacks[fromStack].shift()
//                 temp.push(singleCrateMove)
//                 // console.log({singleCrateMove})
//             }
//             console.log({temp})
//             newStacks[toStack].unshift(...temp)
//             temp = []
//         }
//         return newStacks
//     }

    const partOne = () => {

        const [stacks, instructions] = day5Input.split("\n\n")

        let crates = parseInput(stacks)
        const crateMoves = getInstructions(instructions)

        for(i=0; i < crateMoves.length; i++) {
            crates = move(crates, crateMoves[i])
            // console.log({crates})
        }

        // console.log({crates})

        // console.log({crateMoves})
        const topOfTheStacks = crates.map(stack => stack[0])
        .reduce((acc, curr) => acc + curr)

        console.log("The top of the stack are " + topOfTheStacks)


    }

    const partTwo = () => {

        const [stacks, instructions] = day5Input.split("\n\n")

        let crates = parseInput(stacks)
        const crateMoves = getInstructions(instructions)

        for(i=0; i < crateMoves.length; i++) {
            crates = move(crates, crateMoves[i], {reverse: false})
            // console.log({crates})
        }

        // console.log({crates})

        // console.log({crateMoves})
        const topOfTheStacks = crates.map(stack => stack[0])
        .reduce((acc, curr) => acc + curr)

        console.log("The top of the stack are " + topOfTheStacks)


    }

    console.log(partTwo())
