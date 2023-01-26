# <h1 align="center"> Memory card game </h1>

## Step-by-Step

0. `git submodule update --init --recursive`
1. `forge install`
2. `npm install`
3. `npm run test:full`

## Project

### Example puzzle
A 2 times 2 memory card puzzle with numbers instead of pictures:
```
2 1
1 2
``` 

### Implementation phase 1
1. A verifier contract is deployed to Goerli
1. Crude website
1. Browser generates a new puzzle
1. User plays in browser until a pair is found
1. A Noir function `solve` is used for checking a (partial) solution to the puzzle
    1. It takes the following inputs:
        1. Full puzzle solution in flattened format: `2 1 1 2`
        1. The pairs the user has found: for example `2 0 0 2` or then the full solution if all pairs are found
    1. It generates a proof based on the puzzle and (partial) solution
    1. The proof is sent to the verifier contract for verification

### Phase 2
The puzzle is not sent along with the (partial) solution by the user. Preferably sent by someone else, or possibly even somehow stored in Aztec network by some other entity - or generated upon request somehow. Figure out a way to accomplish this.

### Phase 3
- Add real images to frontend
- Add styling.
- Add more entries (not just 2x2)

---

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
