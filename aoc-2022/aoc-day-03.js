const fs = require("fs")

// sampleinput

const sampleStr = `vJrwpWtwJgWrhcsFMMfFFhFp`

const sampleStr1 = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const puzzleInput = fs.readFileSync("day3.txt", "utf8")

const rucksacks = puzzleInput.split("\n")


// Part 1

// 65 to 90 = A to Z
// 97 to 122 = a to z

// if charCode is 97 - 122 then subtract 96 to get the number
// if charCode is 65 - 90 then subtract 64 to get the number


const returnPriority = (charCode) => {
    if (charCode >= 97) {
        return charCode - 96}
        else {
        return charCode - 38
        }
    }

const findAnswer = (sampleStr) => {

    const ruckSacks = sampleStr.split("\n")
    const ruckSacksArr = Object.values(ruckSacks)
    // console.log(ruckSacksArr)
    let totalPriority = 0
    ruckSacksArr.map(ruckSack => {
        const firstHalf = ruckSack.slice(0, ruckSack.length / 2)
        const secondHalf = ruckSack.slice(ruckSack.length / 2)
        const secondHalfArr = [...secondHalf]
        const itemIncludes = secondHalfArr.filter(item => firstHalf.includes(item)).toString()
        const charCode = itemIncludes.charCodeAt()
        const priority = returnPriority(charCode)
        return totalPriority += priority
    })
    console.log(totalPriority)
    return totalPriority
}


findAnswer(puzzleInput)


// Part 2

const group = ["vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg, vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg", "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg", "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg"]

    const sampleGroupOfRucksacks = [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg"
        ]

    // slice the first three elements from the array, then call the function again with the remaining elements
    const getGroupsOf3 = (arr) =>
        arr.length ? [arr.slice(0 ,3), ...getGroupsOf3(arr.slice(3))] : [];

    // write a function to find the common item between the three array elements in sampleGroupOfRucksacks
    const findCommonItemInGroupOf3 = ([sack1, sack2, sack3]) => {
    // convert the first two elements to sets
    const [set1, set2] = [new Set(sack1), new Set(sack2)]
    // convert the third item to an array
    const commonItem = [...sack3].find(item => set1.has(item) && set2.has(item))
    return commonItem
    }

    // add them all up
    const findTotalPriority = getGroupsOf3(rucksacks)
    .map(findCommonItemInGroupOf3)
    .map(letter => returnPriority(letter.charCodeAt()))
    .reduce((a, b) => a + b, 0)

    console.log("totalPriority " + findTotalPriority)
