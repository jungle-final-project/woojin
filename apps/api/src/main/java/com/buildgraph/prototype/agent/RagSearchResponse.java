package com.buildgraph.prototype.agent;

import java.util.List;

public record RagSearchResponse(
        String query,
        List<RagEvidence> items
) {
}
