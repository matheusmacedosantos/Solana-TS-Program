import {
  Transaction,
  SystemProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";

import wallet from "./dev-wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));

const to = new PublicKey("8T9GcCqpjy3NJX1nMkhVPhzJW8zgFJhNxASn4whhRTX2");

const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: LAMPORTS_PER_SOL / 10, // 0.1 SOL
      })
    );

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;
    transaction.feePayer = from.publicKey;

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      from,
    ]);

    console.log(`Success! Confira sua transação aqui:
  https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (e) {
    console.error(`Algo deu errado: ${e}`);
  }
})();
