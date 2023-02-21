import { expect } from "chai";
import { ethers } from "hardhat";
import path from "path";

import { compile, acir_to_bytes } from "@noir-lang/noir_wasm";
import {
  setup_generic_prover_and_verifier,
  create_proof,
  verify_proof,
} from "@noir-lang/barretenberg/dest/client_proofs";
import { getCircuitSize } from "@noir-lang/barretenberg/dest/client_proofs/generic_proof/standard_example_prover";
import { serialise_acir_to_barrtenberg_circuit } from "@noir-lang/aztec_backend";
import { BarretenbergWasm } from "@noir-lang/barretenberg/dest/wasm";
import { writeFileSync } from "fs";

describe("TurboVerifier check verification in nargo and in contract", function () {
  let verifierContract: any;
  let acir: any;
  let abi: any;
  let prover: any;
  let verifier: any;

  const PUZZLE = [1, 2, 2, 1];

  before(async function () {
    const Verifier = await ethers.getContractFactory("TurboVerifier");
    verifierContract = await Verifier.deploy();
    await verifierContract.deployed();

    const compiled_program = compile(
      path.resolve(__dirname, "../circuits/src/main.nr")
    );

    acir = compiled_program.circuit;
    abi = compiled_program.abi;

    const serialised_circuit = serialise_acir_to_barrtenberg_circuit(acir);
    const barretenberg = await BarretenbergWasm.new();
    const circSize = await getCircuitSize(barretenberg, serialised_circuit);
    console.log("circSize", circSize);

    [prover, verifier] = await setup_generic_prover_and_verifier(acir);

    // console.log(serialised_circuit);
    writeFileSync(
      path.resolve(__dirname, "../circuits/src/main.acir"),
      Buffer.from(serialised_circuit)
    );

    // console.log(acir_to_bytes(acir));
    writeFileSync(
      path.resolve(__dirname, "../circuits/src/acir.acir"),
      Buffer.from(acir_to_bytes(acir))
    );
  });

  it("Should verify proof", async function () {
    abi.user_input = [1, 2, 2, 1];
    abi.puzzle = PUZZLE;

    const proof = await create_proof(prover, acir, abi);
    const verified = await verify_proof(verifier, proof);
    const sc_verified = await verifierContract.verify(proof);

    expect(verified).eq(true);
    expect(sc_verified).eq(true);
  });

  it("Should verify partial solution", async function () {
    abi.user_input = [0, 2, 2, 0];
    abi.puzzle = PUZZLE;

    const proof = await create_proof(prover, acir, abi);
    const verified = await verify_proof(verifier, proof);
    const sc_verified = await verifierContract.verify(proof);

    console.log("PROOF", proof.toString(), " other ");

    expect(verified).eq(true);
    expect(sc_verified).eq(true);
  });

  it("Should reject false proof", async function () {
    abi.user_input = [2, 1, 2, 1];
    abi.puzzle = PUZZLE;

    const proof = await create_proof(prover, acir, abi);
    const verified = await verify_proof(verifier, proof);
    await expect(verifierContract.verify(proof)).to.be.revertedWith(
      "Proof failed"
    );

    expect(verified).eq(false);
  });

  it("Should reject false partial solution", async function () {
    abi.user_input = [0, 1, 0, 1];
    abi.puzzle = PUZZLE;

    const proof = await create_proof(prover, acir, abi);
    const verified = await verify_proof(verifier, proof);
    await expect(verifierContract.verify(proof)).to.be.revertedWith(
      "Proof failed"
    );

    expect(verified).eq(false);
  });
});
