# aoc-24
Advent of Code 2024 with TypeScript

## Notes to self
This is my first swag at doing Advent of Code. I am doing it because I think that long run it will be beneficial to sharpen my problem solving skills and help get me in the practice of doing daily programming tasks. To this end, I am going to do it using Typescript.

I am using TypeScript because it gives me a typed language and I find that particularly useful, but also it is JavaScript adjacent and my core interest, or more generally the thing that gives me a hook into understanding programming, is creating and manipulating user interfaces. By having a mechanism to modify the tangible/visual element of a program, I can much better 'feel' the system and learn about how it works. From there I can work my way into manipulating the back end. 

### How to approach the problems
For each puzzle, I am going to take the following steps:
1. Read the problem in full
2. Copy it into a file in this repository and turn it into a code comment
3. Make notes of any portions of the puzzle that are confusing to me, and why.
4. Write out the steps that I will take to solve the problem, including breaking down the problem into sub problems or drafting pseudocode
5. After 'solving' the problem in pseudocode I will then try to write the solution in TypeScript
6. As a part of this process, I am allowed to ask AI how to do specific tasks in the language, such as:
- Set up my dev environment to run a script, take an input, etc.
- How to create a function or use a library, but if I use a library I need to go and read the function that I am calling and put it in my notes
- I will not copy paste anything from my AI convo into my solution. 
- If I fully understand what is being presented, I may type out the solution but I should try to frame my questions in the smallest possible context such that what is presented by an LLM is just a narrow subset of the larger solution

## About this repository
I'll make notes here about how this repo works, i.e. if I add any packages, key scripts, etc.

### Things about Typescript
#### Running `.ts` files in this repo
Node runs stuff using the scripts in `package.json`. In this repo because I'll be having a lot of similarly structured files I have set up `npm run day` to be run like `npm run day day0` where `day0` is the directory containing that day's files.

#### Import statements
These pull in functions from my node modules to give me access to additional functionality.

A few important things to node about imports:
- You can only have one default export per file. This means that generally I should use 'named exports' because if I have a util file it will probably want to have multiple functions in it.
- Named exports are supposedly better for typescript because they have better type inference. TODO I should learn about waht this really means in practice and what makes it true.

#### Function Declarations
```
export const someName = (parameter: type): string => {...}
```
- `Export` makes the declared function available to import in other files
- `const someName` declares a constant function with the name `someName`
- `(parameter: type)` defines a parameter of name `parameter` that must by of type `type` (TODO: Learn possible types; is this a set list or something that I can define?)
- `: string` is an indication of the type that is expected out of this function
- `=>` indicates this is an arrow function. Presumably this allows more concise syntax. (TODO: Learn more about different sorts of functions in typescrpt and where they are best used)

#### Running Typescript programs
I can do this most straightforwardly by using `ts-node` directly. To run `index.ts` I can run:
```
npx ts-node path/to/file/index.ts
```

Or I can TODO Learn how to set this up by running an npm script but I will figure out how to do that later.
