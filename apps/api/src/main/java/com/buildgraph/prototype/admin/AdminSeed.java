package com.buildgraph.prototype.admin;

import com.buildgraph.prototype.common.MockData;
import com.buildgraph.prototype.part.ToolSeed;
import java.util.List;
import java.util.Map;

public final class AdminSeed {
    private AdminSeed() {
    }

    public static Map<String, Object> dashboard() {
        return MockData.map("llmQueueP95", "18s", "apiP95", "420ms", "asOpen", 12, "recommendationSuccess", "94%");
    }

    public static Map<String, Object> agentSession(String id) {
        return MockData.map(
                "id", id,
                "toolInvocations", List.of(ToolSeed.toolResult("compatibility"), ToolSeed.toolResult("power")),
                "ragEvidence", List.of(MockData.map("sourceId", "psu-rule-001", "summary", "PSU rule seed"))
        );
    }

    public static Map<String, Object> toolInvocations() {
        return MockData.map("items", List.of(ToolSeed.toolResult("compatibility"), ToolSeed.toolResult("power"), ToolSeed.toolResult("price")));
    }

    public static Map<String, Object> toolInvocation(String id) {
        return MockData.map(
                "id", id,
                "sessionId", "demo-session",
                "tool", "power",
                "status", "WARN",
                "confidence", "MEDIUM",
                "latencyMs", 168,
                "request", MockData.map("cpuId", "cpu-7600", "gpuId", "gpu-4070s", "psuId", "psu-750"),
                "result", ToolSeed.toolResult("power")
        );
    }

    public static Map<String, Object> ragEvidence(String id) {
        return MockData.map(
                "id", id,
                "sourceId", "psu-rule-001",
                "summary", "GPU 피크 전력과 CPU TDP 합산 후 여유율 적용",
                "score", 0.91,
                "usedBy", "tool-power-001"
        );
    }
}
