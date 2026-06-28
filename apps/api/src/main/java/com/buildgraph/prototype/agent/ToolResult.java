package com.buildgraph.prototype.agent;

import java.util.List;

public record ToolResult(
        String tool,
        ToolStatus status,
        double score,
        ConfidenceLevel confidence,
        String summary,
        List<String> warnings,
        List<RagEvidence> evidence
) {
}
