# Yin-yang cellular automaton

## Getting started

Download repository

### `git clone https://github.com/MichailSenc/yng-yang.git`

Install dependencies

### `npm install`

Run electron application

### `npm start`

## Description

The development of the game "Life" is the lesser-known cellular automaton Yin-Yang (woman - man), which reflects the life and reproduction of bisexual organisms. Imagine a plane divided into square cells, which can be in one of three states:
    1) empty (that is, dead) cell;
    2) living Yin cell;
    3) living cell Yang1.
    
The state of each cell at the next time step 𝑡 + 1 is determined by the state of the neighboring eight cells at the moment. The rules for switching the Yin-Yang spacecraft are set in such a way that the populations of Yin and Yang oppose, but cannot develop without each other. They are as follows:

1) birth occurs if an empty cell has exactly three living unequal neighbors: in the case when there is only one Yang among the neighbors, Yang is born; when there is only one Yin, Yin is born;

2) death from overpopulation or loneliness: if a living cell has more than four or less than two neighbors, it dies from overpopulation or loneliness;

3) death in unequal opposition: if a living cell has exactly four neighbors of the opposite sex, then it dies.
