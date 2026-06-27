package com.buildgraph.prototype.admin;

import com.buildgraph.prototype.common.MockData;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @GetMapping("/dashboard")
    Map<String, Object> dashboard() {
        return MockData.map("llmQueueP95", "18s", "apiP95", "420ms", "asOpen", 12, "recommendationSuccess", "94%");
    }

    @GetMapping("/agent-sessions/{id}")
    Map<String, Object> agentSession(@PathVariable String id) {
        return MockData.map("id", id, "toolInvocations", List.of(MockData.toolResult("compatibility"), MockData.toolResult("power")), "ragEvidence", List.of(MockData.map("sourceId", "psu-rule-001", "summary", "PSU rule seed")));
    }

    @GetMapping("/tool-invocations")
    Map<String, Object> toolInvocations() {
        return MockData.map("items", List.of(MockData.toolResult("compatibility"), MockData.toolResult("power"), MockData.toolResult("price")));
    }

    @GetMapping("/tool-invocations/{id}")
    Map<String, Object> toolInvocation(@PathVariable String id) {
        return MockData.map(
                "id", id,
                "sessionId", "demo-session",
                "tool", "power",
                "status", "WARN",
                "confidence", "MEDIUM",
                "latencyMs", 168,
                "request", MockData.map("cpuId", "cpu-7600", "gpuId", "gpu-4070s", "psuId", "psu-750"),
                "result", MockData.toolResult("power")
        );
    }

    @GetMapping("/rag-evidence/{id}")
    Map<String, Object> ragEvidence(@PathVariable String id) {
        return MockData.map(
                "id", id,
                "sourceId", "psu-rule-001",
                "summary", "GPU 피크 전력과 CPU TDP 합산 후 여유율 적용",
                "score", 0.91,
                "usedBy", "tool-power-001"
        );
    }

    @GetMapping("/as-tickets")
    Map<String, Object> tickets() {
        return MockData.map("items", MockData.tickets());
    }

    @GetMapping("/as-tickets/{id}")
    Map<String, Object> ticket(@PathVariable String id) {
        return MockData.map(
                "id", id,
                "user", "user@example.com",
                "symptom", "게임 중 프레임 급락",
                "status", "OPEN",
                "logRangeMinutes", 30,
                "consentRequired", true,
                "retentionDays", 30,
                "causeCandidates", List.of("GPU 온도 과열 가능성", "드라이버 오류 이벤트 반복 가능성"),
                "upgradeCandidates", List.of("케이스 쿨링 개선", "GPU 상위 모델 후보")
        );
    }

    @GetMapping("/price-jobs")
    Map<String, Object> priceJobs() {
        return MockData.map("items", List.of(MockData.map("id", "price-job-001", "status", "IDLE", "lastRunAt", MockData.now())));
    }

    @PostMapping("/price-jobs/run")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Map<String, Object> runPriceJob() {
        return MockData.map("jobId", "price-job-001", "status", "QUEUED");
    }
}
