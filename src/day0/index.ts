//--- Day 1: Trebuchet?! ---
//Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.
//
//You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.
//
//Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!
//
//You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").
//
//As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.
//
//The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
//
//For example:
//
//1abc2
//pqr3stu8vwx
//a1b2c3d4e5f
//treb7uchet
//In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.
//
//Consider your entire calibration document. What is the sum of all of the calibration values?
//
//To begin, get your puzzle input.
//
//Answer: 
//
//
//You can also [Share] this puzzle.
// process for solving this problem:
// Initialize a counter value at 0 to be used to store the sum of the calibration values
// read in the file using readInput
// put the file into an array... somehow
// take the first element in the array and read through it forwards, checking if the character is a number or a letter
// if it is a letter, check the next character; if it is a number, add the number into some variable A and then proceed to the next step
// then read the line backwards from the end of the line, check if it is a number of a letter. if it is a letter, check the next character, if it is a number, add the number to some variable b and then proceed to the next step
// Take A and B and concatinate them into string `AB` in variable N
// convert them from a string to a number
// take variable N and add it to the counter value
// check for a next element in the array
// if another element exists, repeat the checks above
// if no additional element exists, print the counter value


import { readInput } from "../utils/fileReader"; 

let total: number = 0
const input = readInput('day0');
const lineArray = input.split('\n');

// function to get the first digit
const findFirstDigit = (str: string): string | undefined => {
    for (const char of str) {
        if (!isNaN(Number(char))) {
            return char;
        }
    }
    return undefined;
};
// function to get the last digit
const findLastDigit = (str: string): string | undefined => {
    // reverse the string before checking
    const reverseString = str.split('').reverse().join('');
    for (const char of reverseString) {
        if (!isNaN(Number(char))) {
            return char;
        }
    }
    return undefined;
};

const getValue = (line: string) => { 
    console.log("the line value is: ", line);
    const firstDigit = findFirstDigit(line);
    const lastDigit = findLastDigit(line);
    const stringValue = firstDigit + lastDigit;
    console.log("from getValue Function: ", stringValue);
    return stringValue;
};

lineArray.forEach(line => {
    if (line.trim().length === 0) return;
    const value = getValue(line);
    console.log(value);
    console.log("this should print inbetween values");
    total += Number(value);
    console.log("current total is: ", total);
    return total;
});

console.log("Cumulative calibration value: ", total)
