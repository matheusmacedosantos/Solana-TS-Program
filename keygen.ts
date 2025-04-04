import { Keypair } from "@solana/web3.js";

let kp = Keypair.generate();

console.log(`You've generated a new Solana wallet:
${kp.publicKey.toBase58()}

To save your wallet, copy and paste your private key into a JSON file:`);

console.log(`[${kp.secretKey}]`);