//--- Day 6: Guard Gallivant ---
//The Historians use their fancy device again, this time to whisk you all away to the North Pole prototype suit manufacturing lab... in the year 1518! It turns out that having direct access to history is very convenient for a group of historians.
//
//You still have to be careful of time paradoxes, and so it will be important to avoid anyone from 1518 while The Historians search for the Chief. Unfortunately, a single guard is patrolling this part of the lab.
//
//Maybe you can work out where the guard will go ahead of time so that The Historians can search safely?
//
//You start by making a map (your puzzle input) of the situation. For example:
//
//....#.....
//.........#
//..........
//..#.......
//.......#..
//..........
//.#..^.....
//........#.
//#.........
//......#...
//The map shows the current position of the guard with ^ (to indicate the guard is currently facing up from the perspective of the map). Any obstructions - crates, desks, alchemical reactors, etc. - are shown as #.
//
//Lab guards in 1518 follow a very strict patrol protocol which involves repeatedly following these steps:
//
//If there is something directly in front of you, turn right 90 degrees.
//Otherwise, take a step forward.
//Following the above protocol, the guard moves up several times until she reaches an obstacle (in this case, a pile of failed suit prototypes):
//
//....#.....
//....^....#
//..........
//..#.......
//.......#..
//..........
//.#........
//........#.
//#.........
//......#...
//Because there is now an obstacle in front of the guard, she turns right before continuing straight in her new facing direction:
//
//....#.....
//........>#
//..........
//..#.......
//.......#..
//..........
//.#........
//........#.
//#.........
//......#...
//Reaching another obstacle (a spool of several very long polymers), she turns right again and continues downward:
//
//....#.....
//.........#
//..........
//..#.......
//.......#..
//..........
//.#......v.
//........#.
//#.........
//......#...
//This process continues for a while, but the guard eventually leaves the mapped area (after walking past a tank of universal solvent):
//
//....#.....
//.........#
//..........
//..#.......
//.......#..
//..........
//.#........
//........#.
//#.........
//......#v..
//By predicting the guard's route, you can determine which specific positions in the lab will be in the patrol path. Including the guard's starting position, the positions visited by the guard before leaving the area are marked with an X:
//
//....#.....
//....XXXXX#
//....X...X.
//..#.X...X.
//..XXXXX#X.
//..X.X.X.X.
//.#XXXXXXX.
//.XXXXXXX#.
//#XXXXXXX..
//......#X..
//In this example, the guard will visit 41 distinct positions on your map.
//
//Predict the path of the guard. How many distinct positions will the guard visit before leaving the mapped area?
//
//How would I approach solving this problem?
//First I need to intake the input, then break it into a matrix.
//after that I need to define some directions.
//I think here probably the right thing to do
//is separately define each of the actions of the guard. Maybe it could make
//sense to define the guard as a 'type' with a direction and a set of possible
//actions?
//then I want to define the bounds of the matrix. The point here will
//be to check if the guard leaves the matrix and if so, exit and return the
//result.

import { readInput } from '../utils/fileReader';

const file = readInput('day6');
//console.log('file is: ', file);

type AreaMap = string[][];
type Position = {
    row: number;
    col: number;
};
type Direction = 'up' | 'down' | 'right' | 'left';
type Guard = '<' | '^' | 'v' | '>';
type MovementRule = (
    area: AreaMap,
    location: Position,
    guard: Guard
) => { location: Position; guard: Guard };

const DIRECTION: Record<Direction, [number, number]> = {
    up: [-1, 0],
    down: [1, 0],
    right: [0, 1],
    left: [1, 0],
};

let guardLocation: Position = { row: 0, col: 0 };
console.log('guardLocation is: ', guardLocation);

let guardDirection: Guard = '^';
console.log('guardDirection is: ', guardDirection);

// if the guard is '^', check up. if up is #, become '>' and recheck.
// if the guard is '>', check right. if right is #, become 'v' and recheck.
// if the guard is 'v', check down. if down is #, become '<' and recheck.
// if the guard is '<', check left. if left is #, become '^' and recheck.

// if <direction> is not #, move to element, replacing yourself with X.

const isInBounds = (area: AreaMap, location: Position): boolean => {
    return (
        location.row >= 0 &&
        location.row < area.length &&
        location.col >= 0 &&
        location.col < area[0].length
    );
};
const areaMap: AreaMap = file
    .trim()
    .split('\n')
    .map((row) => row.split(''));

//console.log('areaMap is: ', areaMap);
//console.log('areaMap length is: ', areaMap[0].length);

// I need to find the starting point and set the guard location and direction

// After finding the starting point, I should run the defined check function on that point
// the check function should run in a while loop if 'isInBounds' is true. when
// it exits, I should count the number of X's in the matrix and print that value
