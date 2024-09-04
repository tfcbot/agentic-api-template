/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
    app(input) {
      return {
        name: "agentic-backend-template",
        removal: input?.stage === "production" ? "retain" : "remove",
        
        home: "aws",
        providers: { aws: {
          profile: input?.stage,
          region: "us-east-1",
        }, "aws-native": {
          profile: input?.stage,
          region: "us-east-1",
        }},
      };
    },
    async run() {
      const infra = await import("./infra");
      return {
        api: infra.api.url,
      };
    },
  });
  