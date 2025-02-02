import {
    ActionExample,
    Content,
    generateText,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
    type Action,
} from "@elizaos/core";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config()

const intentNFTAddress = '0x5a583a2DD9Ace61aE4635681b60DB048B1e98392'
const poolsNFTAddress = '0xCc35D16e0463baE919bDC5eeB39ca2d458EEf9B0'

const grinderPrivateKey = process.env.GRINDER_AI_WALLET_PRIVATE_KEY;
const intentNFTABI = [
    "function getIntent(address _account) public view returns (address, uint256, uint256[])"
];
const poolsNFTABI = [
    "function grind(uint256 poolId) public"
];

const provider = new ethers.providers.JsonRpcProvider("https://arb1.arbitrum.io/rpc");

const intentNFT = new ethers.Contract(intentNFTAddress, intentNFTABI, provider);
const grinderWallet = new ethers.Wallet(grinderPrivateKey, provider);
const poolsNFT = new ethers.Contract(poolsNFTAddress, poolsNFTABI, grinderWallet);

export const grindAction: Action = {
    name: "GRIND_ACTION",
    similes: ["GRIND_ACTION"],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true
    },
    description: "Grind the pools behalve to user",
    handler: async (
        _runtime: IAgentRuntime,
        _message: Memory,
        _state: State,
        _options: { [key: string]: unknown; },
        _callback: HandlerCallback,
    ): Promise<boolean> => {
        console.log("Executing GRIND_ACTION on Arbitrum...");
        
        try {
            // 1. receive wallet of user from message
            const userWallet = "0xC185CDED750dc34D1b289355Fe62d10e86BEDDee";
            
            // 2. Call getIntent() on IntentNFT
            const [account, expire, poolIds] = await intentNFT.getIntent(userWallet);
            console.log("Intent info:", { account, expire, poolIds });
            console.log(grinderWallet.address)
            
            // 3. parse intents poolId
            if (poolIds.length > 0) {
                const poolId = poolIds[0];
                console.log(poolId)
                
                // 4. send transaction grind(poolId)
                const tx = await poolsNFT.grind(poolIds[0]);  // Берём первый пул
                console.log("📡 Transaction is sent...", tx.hash);
    
                await tx.wait();
                console.log("✅ Transaction confirmed!", tx.hash);
    
                _callback({
                    text: `I grinded your pool on Arbitrum! TX hash: ${tx.hash} on intent {${account}, ${expire}, ${poolIds}}`,
                    content: {
                        action: "GRIND_ACTION"
                    }
                });

                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.error("❌  GRIND_ACTION:", error);
            return false;
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "grind pools on my wallet 0xC185CDED750dc34D1b289355Fe62d10e86BEDDee" },
            },
            {
                user: "{{agent}}",
                content: { 
                    text: "I grinded your pool by this tx hash: 0x21b92bf43ea9cc49cfcdbbd6d17a3144f762e8c77c1ca66bdf95cbf6c2098d7c",
                    action: "GRIND_ACTION"
                },
            },
        ],
    ] as ActionExample[][],
} as Action;