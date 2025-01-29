import {
    apiKeysTable,
    deliverablesTable,
    ordersTable,
    usersTable
} from "./database";
import { secrets } from "./secrets";


usersTable.subscribe("OnboardingSub", {
    handler: "./packages/functions/src/control-plane.api.handleOnboardingStream",
    link: [...secrets], 
    timeout: "900 seconds"
})



apiKeysTable.subscribe("CreateApiKeyStreamProcessor", {
    handler: "./packages/functions/src/control-plane.api.createApiKeyStreamHandler",
    link: [usersTable, apiKeysTable, ...secrets],
    timeout: "900 seconds"
})


apiKeysTable.subscribe("UpdateTokenKeyIdStreamProcessor", {
    handler: "./packages/functions/src/control-plane.api.updateTokenKeyIdStreamHandler",
    link: [apiKeysTable, ...secrets], 
    timeout: "900 seconds"
})
    

deliverablesTable.subscribe("ProcessDeliverableStreamProcessor", {
    handler: "./packages/functions/src/agent-plane.api.processDeliverableStreamHandler",
    link: [ordersTable, deliverablesTable, ...secrets], 
    timeout: "900 seconds"
})



