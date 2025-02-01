import { Plugin } from "@elizaos/core";
import { grindAction } from "./actions/grindAction";
import { getIntentProvider } from "./providers/getIntentProvider"

export const grindurusPlugin: Plugin = {
    name: "grindurus",
    description: "GrindURUS plugin for Eliza from executing grind",
    actions: [grindAction],
    providers: [getIntentProvider]
};

export default grindurusPlugin;
