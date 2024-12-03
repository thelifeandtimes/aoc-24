//--- Day 3: Mull It Over ---
//"Our computers are having issues, so I have no idea if we have any Chief Historians in stock! You're welcome to check the warehouse, though," says the mildly flustered shopkeeper at the North Pole Toboggan Rental Shop. The Historians head out to take a look.
//
//The shopkeeper turns to you. "Any chance you can see why our computers are having issues again?"
//
//The computer appears to be trying to run a program, but its memory (your puzzle input) is corrupted. All of the instructions have been jumbled up!
//
//It seems like the goal of the program is just to multiply some numbers. It does that with instructions like mul(X,Y), where X and Y are each 1-3 digit numbers. For instance, mul(44,46) multiplies 44 by 46 to get a result of 2024. Similarly, mul(123,4) would multiply 123 by 4.
//
//However, because the program's memory has been corrupted, there are also many invalid characters that should be ignored, even if they look like part of a mul instruction. Sequences like mul(4*, mul(6,9!, ?(12,34), or mul ( 2 , 4 ) do nothing.
//
//For example, consider the following section of corrupted memory:
//
//xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
//Only the four highlighted sections are real mul instructions. Adding up the result of each instruction produces 161 (2*4 + 5*5 + 11*8 + 8*5).
//
//Scan the corrupted memory for uncorrupted mul instructions. What do you get if you add up all of the results of the multiplications?
//
// How would I approach solving this problem?
// First I want to parse the string for a regex of the valid entries
// splitting them into an array of separate strings
// for each of the separate strings, i want to then multiple the two values together
// and add the output to my counter
//
// Open questions include:
// - How do i write the regex for `mul(<number>,<number>)`?
// - how to split a string into an array based on the regex being fulfilled?

import { readInput } from '../utils/fileReader';

interface EntryValues {
    first: string;
    second: string;
}

let countValue = 0;
const file: string = readInput('day3');

//console.log('the file is: ', file);

const filterRegex = /don't\(\)[\s\S]*?do\(\)/g;
const regexFile = /mul\((?<first>\d+),(?<second>\d+)\)/g;
const regexEntry = /(?<first>\d+),(?<second>\d+)/;

const filteredArray: string[] = file.split(filterRegex);
console.log('filtered array is now: ', filteredArray);

const filteredString: string = filteredArray.join('');
console.log('filtered string is now: ', filteredString);

const array = filteredString.match(regexFile);

//console.log('the new array is: ', array);
if (array !== null) {
    for (const entry of array) {
        //console.log('entry: ', entry);
        const fullEntry = entry.match(regexEntry);
        if (fullEntry?.groups) {
            const groupedEntry = fullEntry.groups as EntryValues;
            //console.log('entry values are: ', fullEntry);
            //console.log('grouped entry values are: ', groupedEntry);
            const entryOne: number = parseInt(groupedEntry.first);
            const entryTwo: number = parseInt(groupedEntry.second);
            //console.log('entry one is: ', entryOne);
            //console.log('entry two is: ', entryTwo);
            const entryProduct: number = entryOne * entryTwo;
            countValue = countValue + entryProduct;
            //console.log('entry product is: ', entryProduct);
            console.log('current count value is: ', countValue);
        }
    }
}

// --- Part Two ---
//As you scan through the corrupted memory, you notice that some of the conditional statements are also still intact. If you handle some of the uncorrupted conditional statements in the program, you might be able to get an even more accurate result.
//
//There are two new instructions you'll need to handle:
//
//The do() instruction enables future mul instructions.
//The don't() instruction disables future mul instructions.
//Only the most recent do() or don't() instruction applies. At the beginning of the program, mul instructions are enabled.
//
//For example:
//
//xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
//This corrupted memory is similar to the example from before, but this time the mul(5,5) and mul(11,8) instructions are disabled because there is a don't() instruction before them. The other mul instructions function normally, including the one at the end that gets re-enabled by a do() instruction.
//
//This time, the sum of the results is 48 (2*4 + 8*5).
//
//Handle the new instructions; what do you get if you add up all of the results of just the enabled multiplications?
//
// How would I handle part two?
// Since I am in regex mode, I think probably the way to do this is to filter out basically anything in between a `don't()` and a `do()` instruction.
// As a matter of fact, I think this might not be too hard to do in a super scrappy way so I'm going to try to hack it out right now.
// yup, this worked.
