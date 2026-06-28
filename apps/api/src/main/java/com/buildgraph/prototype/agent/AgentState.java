package com.buildgraph.prototype.agent;

public record AgentState(
        String step,
        String state,
        String owner,
        String api,
        String output,
        String description
) {
}
