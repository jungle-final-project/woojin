package com.buildgraph.prototype.agent;

import java.util.List;

public record ToolInvocationListResponse(
        List<ToolInvocation> items
) {
}
