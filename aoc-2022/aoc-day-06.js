// import the readFileSync function from the fs module
const { readFileSync } = require("fs")

const sampleData = readFileSync("day6.txt", {encoding: "utf8"})

// COMMUNICATION PACKET CODE
// mjqjpqmgbljsphdztnvjfqwrcgsmlb

const slidingWindow = (str, size) => {

        // Loop through string minus size of substring
        for(let i=0; i < str.length - size + 1; i++) {

        // create a new set for each substring
        let windowSet = new Set(str.slice(i, i+size))

        // if the set is equal to substring size return the nth of next index
           if (windowSet.size == size) {
            console.log(i + size)
            break;
            // jpqm ends at index 6
           }
    }
}

function partOne() {
    return slidingWindow(sampleData, 4)
}

function partTwo() {
    return slidingWindow(sampleData, 14)
}

partOne()
partTwo();