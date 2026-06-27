package com.buildgraph.prototype.part;

import com.buildgraph.prototype.common.MockData;
import java.util.List;
import java.util.Map;

public final class ToolSeed {
    private ToolSeed() {
    }

    public static Map<String, Object> toolResult(String tool) {
        return MockData.map(
                "tool", tool,
                "status", "compatibility".equals(tool) || "size".equals(tool) ? "PASS" : "WARN",
                "score", 0.82,
                "confidence", "MEDIUM",
                "summary", "Prototype seed result for " + tool,
                "warnings", List.of("seed 기반 결과입니다"),
                "evidence", List.of(MockData.map("source_id", tool + "-rule-001", "summary", "Tool 검증 근거 seed"))
        );
    }
}
