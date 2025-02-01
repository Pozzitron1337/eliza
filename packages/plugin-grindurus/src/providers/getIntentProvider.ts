// src/providers/getIntent.ts
import type { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { config } from "../config";

export const getIntentProvider: Provider = {
    async get(
        runtime: IAgentRuntime,
        _message: Memory,
        _state?: State
    ): Promise<any> {
        
        config.intentNFTAddress;
        
        console.log("GET INTENT")
        return {
            account: '0xC185CDED750dc34D1b289355Fe62d10e86BEDDee',
            expire: 91738413232,
            poolIds: [0]
        }
    },
};