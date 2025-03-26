import bs58 from 'bs58';
import promptSync from 'prompt-sync';

const prompt = promptSync();

function base58ToWallet() {
  const base58 = prompt("Digite a chave privada (base58 - Phantom): ");
  const walletArray = bs58.decode(base58);
  console.log("Chave privada em formato Array (para dev-wallet.json):");
  console.log(`[${walletArray}]`);
}

function walletToBase58() {
  const walletString = prompt("Digite a chave privada (formato Array - dev-wallet.json): ");
  const walletArray = JSON.parse(walletString);
  const base58 = bs58.encode(walletArray);
  console.log("Chave privada em formato base58 (para Phantom):");
  console.log(base58);
}

const option = prompt("Digite '1' para converter Base58→Array ou '2' para converter Array→Base58: ");

if (option === '1') {
  base58ToWallet();
} else if (option === '2') {
  walletToBase58();
} else {
  console.log("Opção inválida!");
}