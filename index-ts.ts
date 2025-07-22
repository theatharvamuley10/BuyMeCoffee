import {
  createWalletClient,
  custom,
  createPublicClient,
  parseEther,
  defineChain,
  formatEther,
  WalletClient,
  PublicClient,
  Chain,
  Hex,
} from "viem";
import "viem/window";
import { contractAddress, abi } from "./constants-ts";

console.log("hi")

// TypeScript type casting for HTML elements
const connectButton = document.getElementById("connectButton") as HTMLButtonElement;
const buyCoffeeButton = document.getElementById("buyCoffeeButton") as HTMLButtonElement;
const getBalanceButton = document.getElementById("getBalanceButton") as HTMLButtonElement;
const ethAmountInput = document.getElementById("ethAmount") as HTMLInputElement;
const withdrawButton = document.getElementById("withdrawButton") as HTMLButtonElement;

// Type declarations
let walletClient: WalletClient | undefined;
let publicClient: PublicClient | undefined;

connectButton.onclick = connect;
buyCoffeeButton.onclick = buyCoffee;
getBalanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;

async function connect(): Promise<void> {
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
    await walletClient.requestAddresses();
    connectButton.innerHTML = "Connected Successfully!";
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

async function buyCoffee(): Promise<void> {
  const ethAmount = ethAmountInput.value;
  console.log(`Funding with amount ${ethAmount}...`);

  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });

    const [connectedAccount] = await walletClient.requestAddresses();
    const currentChain = await getCurrentChain(walletClient);

    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    });

    const { request } = await publicClient.simulateContract({
      address: contractAddress as `0x${string}`,
      abi: abi,
      functionName: "buyCoffee",
      account: connectedAccount,
      chain: currentChain,
      value: parseEther(ethAmount),
    });

    console.log("Request:", request);
    const hash: Hex = await walletClient.writeContract(request);
    console.log("Transaction hash:", hash);
  }
}

async function getBalance(): Promise<void> {
  if (typeof window.ethereum !== "undefined") {
    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    });

    const balance = await publicClient.getBalance({
      address: contractAddress as `0x${string}`,
    });

    console.log("Contract balance:", formatEther(balance));
  }
}

async function withdraw(): Promise<void> {
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });

    const [connectedAccount] = await walletClient.requestAddresses();
    const currentChain = await getCurrentChain(walletClient);

    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    });

    const { request } = await publicClient.simulateContract({
      address: contractAddress as `0x${string}`,
      abi: abi,
      functionName: "withdraw",
      account: connectedAccount,
      chain: currentChain,
    });

    const txHash: Hex = await walletClient.writeContract(request);
    console.log("Withdraw transaction hash:", txHash);
  }
}

// Helper to define custom chain
async function getCurrentChain(client: WalletClient): Promise<Chain> {
  const chainId = await client.getChainId();
  const customChain: Chain = defineChain({
    id: chainId,
    name: "Custom Chain",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["http://127.0.0.1:8545"],
      },
    },
  });
  return customChain;
}
