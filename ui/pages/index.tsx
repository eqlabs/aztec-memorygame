import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  compileNoirSource,
  createProof,
  verifyProof,
} from "../utils/compile_prove_verify";

const CIRCUIT_PATH = new URL("../../proofs/circuits/src/main.nr", import.meta.url).href;
const puzzleSize = 4;



export default function Home() {

  
const [userInput, setUserInput] = useState<number[]>(new Array<number>(puzzleSize).fill(0));

useEffect(() => {
  
}, []);

let inputs = {
  puzzle: [1,2, 1, 2],
  user_input: [0,2, 0, 2],
};

async function execute_procedure() {

  const cir = await fetch(CIRCUIT_PATH);
  const tex = await cir.text();

  const compiled_noir = await compileNoirSource(tex);

  const { verifier, proof} : { verifier: any, proof: Uint8Array }= await createProof(compiled_noir, inputs);

  console.log("starting verify with proof",  Array.from(proof).map(b => b.toString(16)))
  const bytes = Array.from(proof).map(a => a.toString(16)).reduce((prev, curr) => prev + curr);
  console.log("Proof bytes", bytes);

  const verified = await verifyProof(verifier, proof);

  console.log("verified: ", verified);
}

async function prove() {
  execute_procedure();
}

const clicked = (index : number) => {
  
  const revealed = inputs.puzzle[index];
  if (userInput.includes(revealed)) {
    // Second guess and we found a pair
  console.log("second and pair");
    const newInput = userInput.map((input, i) => i == index ? revealed : input);
    setUserInput(newInput);
  }
  else {

    var unique = userInput.filter(a => userInput.indexOf(a) == userInput.lastIndexOf(a))[0];
    if (!unique || unique == 0) {
      console.log("first guess");
      // First guess
      const newInput = userInput.map((input, i) => i == index ? revealed : input);
      setUserInput(newInput);
    }
    else {
      console.log("second but no pair");
          // Second guess but no pair
      const ind = userInput.indexOf(unique);
      const newInput = userInput.map((input, i) => i == ind ? 0 : input);
      setUserInput(newInput);
    }
    
  }
  
  //console.log("Clicked index", index, newInput);
  
}

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Memory card game
        </h1>

        <p className={styles.description}>
          Try to find pairs! It's all protected by Zero Knowledge.
        </p>

        <button onClick={prove}>Verify (partial) solution</button>

        <div className={styles.grid}>
          {userInput.map((item,i) => 
          <p key={i} className={styles.card} onClick={() => clicked(i)}>{item}</p>  )}
          
         
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
