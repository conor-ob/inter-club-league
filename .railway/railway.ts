import { defineRailway, github, group, project, service } from "railway/iac";

export default defineRailway(() => {
  const server = service("server", {
    source: github("conor-ob/inter-club-league", { checkSuites: false }),
    env: {
      PORT: "8080",
    },
    build: {
      buildEnvironment: "V3",
      builder: "RAILPACK",
      buildCommand: "yarn turbo run build --filter=@inter-club-league/server",
    },
    deploy: {
      startCommand: "yarn workspace @inter-club-league/server start",
      healthcheckPath: "/healthcheck",
      // Sleep when idle; the next request wakes it with a cold start
      sleepApplication: true,
      multiRegionConfig: { "europe-west4-drams3a": { numReplicas: 1 } },
    },
  });

  const backend = group("backend", [server]);

  return project("inter-club-league", {
    resources: [backend],
  });
});
