# <h1 align="center"> Memory card game </h1>

## Project

The project is a memory card puzzle game utilizing Aztec network's Zero Knowledge properties.

### MVP example puzzle
Create a 2 times 2 memory puzzle with numbers instead of pictures. The board is visible but the items are hidden. The player can choose two cards to reveal - if they are the same, they are left revealed. A fresh puzzle looks like this:

```
0 0
0 0
``` 

Once all the pairs have been found, the puzzle looks for example like this:

```
2 1
1 2
``` 

### Research phase

Research Noir, Aztec network, Aztec Connect, zk.money and available DeFi integrations.

### Implementation Phase A - PoC
1. Create Noir circuit for verifying puzzle solutions (pairs found)
1. A verifier contract is deployed to Goerli
1. Create a crude website which user uses to generate a new puzzle
1. User plays at the website until a pair is found
1. A Noir circuit is used for checking a (partial) solution to the puzzle
    1. It takes the following inputs:
        1. Full puzzle solution in flattened format: `2 1 1 2`
        1. The pairs the user has found: for example `2 0 0 2` or then the full solution if all pairs are found
    1. It generates a proof based on the puzzle and user input
    1. The proof is sent to the verifier contract for verification

### Implementation Phase B - Aztec Privacy Magic
Since phase 1 does not add any real privacy (the browser has all of the information), this phase is aimed at fixing that.

The puzzle is not sent along with the (partial) solution by the user. Preferably sent by someone else, or possibly even somehow stored in Aztec network by some other entity - or generated upon request somehow. Figuring out a way to accomplish this

### Implementation Phase C - Making it Real + Publish

Making the game actually real and playable. Creating stylized frontend and creating game assets. 2x2 was just for the test - a real game would be at least 4x4.
Publishing the final project, and writing a blog post about it, as well as posting on social media to increase Noir awareness.

---

## Installation instructions

0. `git submodule update --init --recursive`
1. `forge install`
2. `npm install`
3. `npm run test:full`

**Template repository for getting started quickly with Hardhat and Foundry in one project**

![Github Actions](https://github.com/devanonon/hardhat-foundry-template/workflows/test/badge.svg)

### Getting Started

 * Use Foundry: 
```bash
forge install
forge test
```

 * Use Hardhat:
```bash
npm install
npx hardhat test
```

### Features

 * Write / run tests with either Hardhat or Foundry:
```bash
forge test
# or
npx hardhat test
```

 * Use Hardhat's task framework
```bash
npx hardhat example
```

 * Install libraries with Foundry which work with Hardhat.
```bash
forge install rari-capital/solmate # Already in this repo, just an example
```

### Notes

Whenever you install new libraries using Foundry, make sure to update your `remappings.txt` file by running `forge remappings > remappings.txt`. This is required because we use `hardhat-preprocessor` and the `remappings.txt` file to allow Hardhat to resolve libraries you install with Foundry.
