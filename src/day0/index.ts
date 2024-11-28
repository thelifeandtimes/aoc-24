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

// Solution to part 1
//import { readInput } from "../utils/fileReader"; 
//
//let total: number = 0
//const input = readInput('day0');
//const lineArray = input.split('\n');
//
//// function to get the first digit
//const findFirstDigit = (str: string): string | undefined => {
//    for (const char of str) {
//        if (!isNaN(Number(char))) {
//            return char;
//        }
//    }
//    return undefined;
//};
//// function to get the last digit
//const findLastDigit = (str: string): string | undefined => {
//    // reverse the string before checking
//    const reverseString = str.split('').reverse().join('');
//    for (const char of reverseString) {
//        if (!isNaN(Number(char))) {
//            return char;
//        }
//    }
//    return undefined;
//};
//
//const getValue = (line: string) => { 
//    console.log("the line value is: ", line);
//    const firstDigit = findFirstDigit(line);
//    const lastDigit = findLastDigit(line);
//    const stringValue = firstDigit + lastDigit;
//    console.log("from getValue Function: ", stringValue);
//    return stringValue;
//};
//
//lineArray.forEach(line => {
//    if (line.trim().length === 0) return;
//    const value = getValue(line);
//    console.log(value);
//    console.log("this should print inbetween values");
//    total += Number(value);
//    console.log("current total is: ", total);
//    return total;
//});
//
//console.log("Cumulative calibration value: ", total)
//
// Then there was a part 2:
// --- Part Two ---
// Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".
//
// Equipped with this new information, you now need to find the real first and last digit on each line. For example:
//
// two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen
// In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.
//
// What is the sum of all of the calibration values?
// 
// How will I solve this? 
// I can do the same separating the string into an array
// and once each line is properly parsed, I can calculate the value the same way
// but I need to figure out how to parse each line for the digit value whether
// it is a numeral or written out as a word.
// I think this might be possible with an 'includes' function of some sort, perhaps?
//
// Attempt at solution for part 2:

import { reverse } from "dns";
import { readInput } from "../utils/fileReader"; 

let total: number = 0
const input = readInput('day0');
const lineArray = input.split('\n');

//const changeWordToNumber = (line: string): string => {
// check if the line includes any of the following:
    // one, two, three, four, five, six, seven, eight, nine
    // turn those into singular digits
    // then run the same check as previously
    // there are two issues with this current version:
    // it checks from the front of a string, and if there is an 'overlap' like
    // `oneight` it will turn it into `1ight` and the last digit check will 
    // pick up 1 instead of 8 as the last digit
    // and then it also only replaces the first instance of a word so a string
    // like seven13asevenone5asdseven will change just to 713aseven15asdseven
      // I think i can actually fix both of these by sticking the change word to number inside the findDigit functions
      // this is probably not the most 'elegant' solution, but it should work
//    console.log('original string is: ', line)
//    let numberedline = line
//        .replace('one', '1')
//        .replace('two', '2')
//        .replace('three', '3')
//        .replace('four', '4')
//        .replace('five', '5')
//        .replace('six', '6')
//        .replace('seven', '7')
//        .replace('eight', '8')
//        .replace('nine', '9');
//    console.log('string is now: ', numberedline);
//    return numberedline;
//};
//
// function to get the first digit
const findFirstDigit = (str: string): string | undefined => {
    console.log('for finding the first digit, the original string is: ', str);

    const regex = /(one|two|three|four|five|six|seven|eight|nine)/;
    const match = str.match(regex);
    let numeralLine = str;

    if (match) { 
        const numberMap: { [key: string]: string } = {
            'one': '1',
            'two': '2',
            'three': '3',
            'four': '4',
            'five': '5',
            'six': '6',
            'seven': '7',
            'eight': '8',
            'nine': '9'
        };
    
        numeralLine = str.replace(
            match[0],
            numberMap[match[0]]
        );
    }

    console.log('After changing words to numerals the string is now: ', numeralLine);

    for (const char of numeralLine) {
           if (!isNaN(Number(char))) {
                return char;
           }
    }

    return undefined;

};

// function to get the last digit
const findLastDigit = (str: string): string | undefined => {
    // reverse the string before checking
    console.log('for finding the last digit, original string is: ', str);
    
    const reverseString = str.split('').reverse().join('');

    console.log('the reversed string is now: ', reverseString);

    const reverseRegex = /(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/;
    const match = reverseString.match(reverseRegex);
    let reverseNumeralLine = reverseString;

    if (match) {
        const reverseNumberMap: { [key: string]: string } = {
            'eno': '1',
            'owt': '2',
            'eerht': '3',
            'ruof': '4',
            'evif': '5',
            'xis': '6',
            'neves': '7',
            'thgie': '8',
            'enin': '9'
        };

        reverseNumeralLine = reverseString.replace(
            match[0],
            reverseNumberMap[match[0]]
        );
    }

    console.log('after taking the reversed string and swapping in numerals for the first discovered number word, the string is now: ', reverseNumeralLine);

    for (const char of reverseNumeralLine) {
        if (!isNaN(Number(char))) {
            return char;
        }
    }

    return undefined;

};

const getValue = (line: string) => { 
    console.log("the line value is: ", line);
    const firstDigit = findFirstDigit(line);
    console.log('The first digit should be: ', firstDigit);
    const lastDigit = findLastDigit(line);
    console.log('The last digit should be: ', lastDigit);
    const stringValue = firstDigit + lastDigit;
    console.log("from getValue Function: ", stringValue);
    return stringValue;
};

lineArray.forEach(line => {
    if (line.trim().length === 0) return;
    const value = getValue(line);
    console.log(value);
    console.log("this should print inbetween calculated line values");
    total += Number(value);
    console.log("current total is: ", total);
    return total;
});

console.log("Cumulative calibration value: ", total)


