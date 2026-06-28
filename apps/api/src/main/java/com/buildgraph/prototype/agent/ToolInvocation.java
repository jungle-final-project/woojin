package com.buildgraph.prototype.agent;

import java.util.Map;

public record ToolInvocation(
        String id,
        String sessionId,
        String tool,
        ToolStatus status,
        ConfidenceLevel confidence,
        int latencyMs,
        Map<String, Object> request,
        ToolResult result
) {
}
