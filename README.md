# rps-game

A simple Rock-Paper-Scissors game using an AI N-gram for pattern detection.

## How it works

This game uses a simple AI to try and predict your next move. 
The AI stores multiple [N-grams](https://en.wikipedia.org/wiki/N-gram) - it keeps count of various possible
sequences of turns (including both yours and the AI's own play) and what
you played next.

The AI keeps several such counts for different lengths of sequences (e.g. 
pairs, triplets and so on). The probabilities that they generate are then
combined with linear weights to make a final prediction.
After a play is made, the weights are updated based on the actual outcome,
to [maximize the cross-entropy
of the predicted and real distributions](https://en.wikipedia.org/wiki/Cross-entropy).

This allows the AI to pick up on simple repeated patterns in your play. If played
completely randomly, rock-paper-scissors should lead to a ~33% win rate for each
player. After playing enough turns (about 40 usually are enough), check
your score at the top of the page and see what happened. If your play is not
truly random, the AI will have exploited that to win more games than you.

To clear the AI's memory and start anew, simply refresh the page.

## How to develop

This repository was created and developed using [Bun](https://bun.sh/). It can be initialized for development easily by running `bun install`. 

Use `bun run build-watch` to live compile the Typescript source for development. It will be compiled in the `static` folder together with the HTML/CSS
files where they can be previewed together.

Use `bun run build` to build the final `dist` folder and `bun run publish` to upload it to the `gh-pages` branch.

Made with [Bun](https://bun.sh/) and [React](https://react.dev/).

