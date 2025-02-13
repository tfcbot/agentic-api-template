import {
    apiKeysTable,
    deliverablesTable,
    ordersTable,
    usersTable
} from "./database";
import { secrets } from "./secrets";


usersTable.subscribe(`${$app.name}-OnboardingSub`, {
    handler: "./packages/functions/src/control-plane.api.handleOnboardingStream",
    link: [...secrets], 
    timeout: "900 seconds"
})



usersTable.subscribe(`${$app.name}-CreateApiKeyStreamProcessor`, {
    handler: "./packages/functions/src/control-plane.api.createApiKeyStreamHandler",
    link: [ apiKeysTable, ...secrets],
    timeout: "900 seconds"
})


apiKeysTable.subscribe(`${$app.name}-UpdateTokenKeyIdStreamProcessor`, {
    handler: "./packages/functions/src/control-plane.api.updateTokenKeyIdStreamHandler",
    link: [apiKeysTable, ...secrets], 
    timeout: "900 seconds"
})
    

deliverablesTable.subscribe(`${$app.name}-ProcessDeliverableStreamProcessor`, {
    handler: "./packages/functions/src/agent-plane.api.processDeliverableStreamHandler",
    link: [ordersTable, deliverablesTable, ...secrets], 
    timeout: "900 seconds"
})


