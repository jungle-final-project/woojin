package com.buildgraph.prototype.agent;

import com.buildgraph.prototype.common.MockData;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AgentController {
    @PostMapping("/agent/sessions")
    Map<String, Object> createSession() {
        return MockData.map(
                "id", "demo-session",
                "status", "QUEUED",
                "mode", "LIMITED_ORCHESTRATOR",
                "nextAction", "POST /api/agent/sessions/demo-session/run"
        );
    }

    @PostMapping("/agent/sessions/{id}/run")
    Map<String, Object> runSession(@PathVariable String id) {
        return MockData.map(
                "id", id,
                "status", "SUMMARY_READY",
                "stateTimeline", stateTimeline(),
                "toolInvocations", List.of(MockData.toolResult("compatibility"), MockData.toolResult("power"), MockData.toolResult("price")),
                "fallbackPolicy", "LLM 실패 시 Tool 결과와 seed 설명을 유지합니다."
        );
    }

    @GetMapping("/agent/sessions/{id}")
    Map<String, Object> getSession(@PathVariable String id) {
        return MockData.map(
                "id", id,
                "status", "SUMMARY_READY",
                "stateTimeline", stateTimeline(),
                "summary", "제한된 오케스트레이터 seed 실행 결과",
                "ragEvidence", List.of(MockData.map("id", "rag-psu-001", "sourceId", "psu-rule-001", "score", 0.91))
        );
    }

    private List<Map<String, Object>> stateTimeline() {
        return List.of(
                MockData.map("state", "QUEUED", "owner", "Backend", "description", "Agent job queued"),
                MockData.map("state", "RUNNING", "owner", "Agent", "description", "Limited orchestration started"),
                MockData.map("state", "RAG_SEARCHED", "owner", "RAG Service", "description", "Evidence candidates retrieved"),
                MockData.map("state", "TOOLS_CALLED", "owner", "Tool Services", "description", "Compatibility, power, size, performance, price checked"),
                MockData.map("state", "SUMMARY_READY", "owner", "LLM/Fallback", "description", "Explanation ready")
        );
    }
}
