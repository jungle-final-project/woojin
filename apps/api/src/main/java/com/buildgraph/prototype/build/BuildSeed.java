package com.buildgraph.prototype.build;

import com.buildgraph.prototype.common.MockData;
import com.buildgraph.prototype.part.PartSeed;
import com.buildgraph.prototype.part.ToolSeed;
import java.util.List;
import java.util.Map;

public final class BuildSeed {
    private BuildSeed() {
    }

    public static Map<String, Object> parsedRequirement(Map<String, Object> request) {
        return MockData.map(
                "id", "req-1001",
                "rawMessage", request.getOrDefault("message", "QHD 게임용 PC"),
                "budget", request.getOrDefault("budget", 2000000),
                "usage", List.of("gaming", "development"),
                "targetResolution", "QHD",
                "brandPreference", List.of("NVIDIA"),
                "missingFields", List.of()
        );
    }

    public static List<Map<String, Object>> builds() {
        return List.of(
                MockData.map("id", "bg-1001", "name", "QHD 게임 균형형", "totalPrice", 1980000, "confidence", "MEDIUM", "warnings", List.of("PSU 여유율 확인 필요")),
                MockData.map("id", "bg-1002", "name", "개발 + 게임 혼합형", "totalPrice", 2120000, "confidence", "HIGH", "warnings", List.of("RAM 32GB 권장")),
                MockData.map("id", "bg-1003", "name", "AI 실습 입문형", "totalPrice", 1620000, "confidence", "MEDIUM", "warnings", List.of("VRAM 한계 가능성"))
        );
    }

    public static Map<String, Object> buildDetail(String id) {
        return MockData.map(
                "id", id,
                "name", "QHD 게임 균형형",
                "totalPrice", 1980000,
                "items", PartSeed.parts(),
                "toolResults", List.of(ToolSeed.toolResult("compatibility"), ToolSeed.toolResult("power"))
        );
    }

    public static Map<String, Object> changePart(String id) {
        return MockData.map(
                "buildId", id,
                "status", "WARN",
                "summary", "GPU 성능은 개선되지만 PSU 여유율 확인이 필요합니다.",
                "diff", List.of(
                        MockData.map("metric", "price", "before", 1662000, "after", 1980000, "delta", 318000),
                        MockData.map("metric", "qhdPerformance", "before", "1.0x", "after", "1.42x", "delta", "+42%")
                )
        );
    }
}
