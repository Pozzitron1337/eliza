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
import { config } from "../config"

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
  
        // call grind transaction on PoolsNFT
        // config.

        console.log("ACTIONNNNN")

        return true;
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