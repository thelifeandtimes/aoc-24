//--- Day 4: Ceres Search ---
//"Looks like the Chief's not here. Next!" One of The Historians pulls out a device and pushes the only button on it. After a brief flash, you recognize the interior of the Ceres monitoring station!
//
//As the search for the Chief continues, a small Elf who lives on the station tugs on your shirt; she'd like to know if you could help her with her word search (your puzzle input). She only has to find one word: XMAS.
//
//This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words. It's a little unusual, though, as you don't merely need to find one instance of XMAS - you need to find all of them. Here are a few ways XMAS might appear, where irrelevant characters have been replaced with .:
//
//
//..X...
//.SAMX.
//.A..A.
//XMAS.S
//.X....
//The actual word search will be full of letters instead. For example:
//
//MMMSXXMASM
//MSAMXMSMSA
//AMXSXMAAMM
//MSAMASMSMX
//XMASAMXAMM
//XXAMMXXAMA
//SMSMSASXSS
//SAXAMASAAA
//MAMMMXMMMM
//MXMXAXMASX
//In this word search, XMAS occurs a total of 18 times; here's the same word search again, but where letters not involved in any XMAS have been replaced with .:
//
//....XXMAS.
//.SAMXMS...
//...S..A...
//..A.A.MS.X
//XMASAMX.MM
//X.....XA.A
//S.S.S.S.SS
//.A.A.A.A.A
//..M.M.M.MM
//.X.X.XMASX
//Take a look at the little Elf's word search. How many times does XMAS appear?
//
// How I will approach this problem
// Oof. This is weird. The first thing is to read in the input and set a counter.
// After that...do I want to manually define the patterns I am looking for? Do I
// want to put each line into an array? each character? what is the algorithm for
// finding these?
// Perhaps I can start by finding each `X` and then checking for an adjacent M?
// if an M is found, check for an adjacent A, etc.
//
// I think it makes sense for me to split the input into an array based on newlines
// and then into subarrays per character. From there I can check adjacent characters
// by addressing the elements adjacent to that element. then we do a set of nested
// loops and if we get to an S, we increment the counter.
//
// Maybe its actually a matrix that we use here?

import { readInput } from '../utils/fileReader';

let counter = 0;

const input = readInput('day4');

//console.log('The input is: ', input);

const matrixedInput = input
    .trim()
    .split('\n')
    .map((line) => line.split(''));

console.log('the matrixed input is: ', matrixedInput);

// set values for directionality
const backwards = [0, -1];
const forwards = [0, 1];
const downwards = [1, 0];
const upwards = [-1, 0];
const diagUpRight = [-1, 1];
const diagUpLeft = [-1, -1];
const diagDownRight = [1, 1];
const diagDownLeft = [1, -1];

// check the first character, if it is X, continue to other checks, else, exit

for (const [rowIndex, row] of matrixedInput.entries()) {
    console.log('the row index is: ', rowIndex, 'and the row array is: ', row);
    for (const [colIndex, col] of row.entries()) {
        console.log('the col index is: ', colIndex, 'and the character is:', col);
        if (col == 'X') {
            console.log('Character at ', rowIndex, 'x', colIndex, 'is X');
            const neighbors = [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1],
            ];
            for (const [dx, dy] of neighbors) {
                const newRow = rowIndex + dx;
                const newCol = colIndex + dy;

                if (
                    newRow >= 0 &&
                    newRow < matrixedInput.length &&
                    newCol >= 0 &&
                    newCol < row.length
                ) {
                    console.log(
                        `Checking neighbor at [${newRow}][${newCol}]}: ${matrixedInput[newRow][newCol]}`
                    );
                    const neighborValue = matrixedInput[newRow][newCol];
                    if (neighborValue == 'M') {
                        console.log('Neighbor is a Match: ', neighborValue);
                        counter++;
                        console.log('Counter is now: ', counter);
                    }
                    // Here I feel like it is getting very complex with nesting;
                    // It probably makes sense to break out the neighbors to get
                    // a specific direction so that when an M match is found, I
                    // can just check that correct direction for an A and
                    // subsequent S.
                }
            }
        }
    }
}

console.log('Final count is: ', counter);

// I don't think I'm going to finish implementing this one. But to finish
// thinking through the way I would approach it if I did, I would modify the
// above code to include a check on the directionality of a match. then I would
// check that direction for an A and then an S.
