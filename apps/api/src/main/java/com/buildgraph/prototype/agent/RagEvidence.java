package com.buildgraph.prototype.agent;

public record RagEvidence(
        String id,
        String sourceId,
        String summary,
        double score,
        String usedBy,
        String owner
) {
}
