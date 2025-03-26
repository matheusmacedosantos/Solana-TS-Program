import {
  Transaction,
  SystemProgram,
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";

import wallet from "./dev-wallet.json";

// Carrega sua carteira dev-wallet.json (origem)
const from = Keypair.fromSecretKey(new Uint8Array(wallet));

// Insira aqui SEU endereço Turbin3 fornecido anteriormente
const to = new PublicKey("8T9GcCqpjy3NJX1nMkhVPhzJW8zgFJhNxASn4whhRTX2");

// Conexão com a rede Solana Devnet
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    // Obtém saldo total da carteira devnet
    const balance = await connection.getBalance(from.publicKey);

    // Cria uma transação teste para calcular a taxa (fee)
    let transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance,
      })
    );

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;
    transaction.feePayer = from.publicKey;

    // Calcula a taxa exata que será descontada da transação
    const fee =
      (
        await connection.getFeeForMessage(
          transaction.compileMessage(),
          "confirmed"
        )
      ).value || 0;

    // Remove a instrução inicial para substituí-la com o valor exato
    transaction.instructions.pop();

    // Adiciona a instrução novamente com o saldo correto, descontando a taxa
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance - fee,
      })
    );

    // Assina e envia a transação
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      from,
    ]);

    console.log(`Success! Confira sua transação aqui:
  https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (e) {
    console.error(`Algo deu errado: ${e}`);
  }
})();
