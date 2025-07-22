export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const abi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "buyCoffee",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getBalance",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  { type: "error", name: "PayMoreEther", inputs: [] },
  { type: "error", name: "WithdrawFailed", inputs: [] },
];
