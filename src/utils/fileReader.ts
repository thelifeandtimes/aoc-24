import { readFileSync } from 'fs';
import { join } from 'path';

// feed in the puzzle directory name from `/src` and it will read from `input.txt` in that directory
export const readInput = (puzzle: string) => {
    return readFileSync(join(__dirname, '..', puzzle, 'input.txt'), 'utf-8');
};
