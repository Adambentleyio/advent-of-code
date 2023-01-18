const fs = require("fs")

const sampleData = `24-66,23-25
3-3,2-80`

const samplePairs = `13-79,14-5
2-3,5-87
18-77,18-76
18-77,18-76`

const puzzleInput = fs.readFileSync("day4.txt", "utf8")

const ranges = puzzleInput.trim().split("\n")

const parseRangePair = rangePair => {
    const [start1, end1, start2, end2 ] = rangePair.match( /(\d+)-(\d+),(\d+)-(\d+)/).slice(1).map(Number)
    return [start1, end1, start2, end2]
}

const isRangeContained = ([start1, end1, start2, end2]) => start1 >= start2 && end1 <= end2 || start1 <= start2 && end1 >= end2

const coordinates = ranges.map(parseRangePair)
const containing = coordinates.filter(isRangeContained)
const containingCount = containing.length


console.log(containingCount)

// part 2

const isRangeOverlapping = ([start1, end1, start2, end2]) => start1 <= end2 && end1 >= start2

const overlapping = coordinates.filter(isRangeOverlapping)
const overlappingCount = overlapping.length

console.log(overlappingCount)

