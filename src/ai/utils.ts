export function maxIndex(probs: number[]): number {
    // Find the maximum
    const maxProb = Math.max(...probs);
    // Find all the indices that have the maximum value
    const maxIndices = probs.reduce((acc: number[], p: number, i: number) => p === maxProb ? acc.concat(i) : acc, []);
    // Choose one of the indices at random
    return maxIndices[Math.floor(Math.random()*maxIndices.length)];
}