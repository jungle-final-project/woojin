package com.buildgraph.prototype.agent;

import java.util.List;

public record AgentSession(
        String id,
        AgentStatus status,
        String mode,
        List<AgentState> stateTimeline,
        List<ToolInvocation> toolInvocations,
        List<RagEvidence> ragEvidence,
        String fallbackPolicy,
        String summary,
        String nextAction
) {
}
