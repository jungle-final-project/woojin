package com.buildgraph.prototype.agent;

import com.buildgraph.prototype.common.MockData;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

public class DeterministicAgentRunner implements AgentRunner {
    private final AgentTraceService agentTraceService;

    public DeterministicAgentRunner(AgentTraceService agentTraceService) {
        this.agentTraceService = agentTraceService;
    }

    @Override
    @Transactional
    public void run(String sessionId, AgentSessionRoot root, AgentRunProfile profile) {
        recordEvidence(sessionId, root, profile);
        agentTraceService.advanceStatus(sessionId, AgentStatus.RAG_SEARCHED, "SYSTEM", "RAG evidence retrieved for " + profile.purpose());

        recordToolInvocations(sessionId, root, profile);
        agentTraceService.advanceStatus(sessionId, AgentStatus.TOOLS_CALLED, "SYSTEM", "tool invocations completed for " + profile.purpose());

        agentTraceService.updateSummary(sessionId, summary(profile));
        agentTraceService.advanceStatus(sessionId, AgentStatus.SUMMARY_READY, "SYSTEM", "summary generated for " + profile.summaryTarget());
        agentTraceService.advanceStatus(sessionId, AgentStatus.SUCCEEDED, "SYSTEM", "agent run completed");
    }

    private void recordEvidence(String sessionId, AgentSessionRoot root, AgentRunProfile profile) {
        AgentRagEvidenceDraft draft = switch (profile.purpose()) {
            case BUILD_RECOMMEND -> evidence(
                    "internal-rule-qhd-gaming-seed",
                    "QHD gaming recommendations prioritize GPU class, CPU balance, power margin, and current price.",
                    "QHD gaming build recommendation rule used by deterministic runner.",
                    BigDecimal.valueOf(0.92),
                    root,
                    profile
            );
            case BUILD_EXPLAIN -> evidence(
                    "benchmark-build-explain-seed",
                    "Build explanations compare changed parts by expected bottleneck, price delta, and workload fit.",
                    "Benchmark and price reasoning used for build explanation.",
                    BigDecimal.valueOf(0.88),
                    root,
                    profile
            );
            case AS_ANALYZE -> evidence(
                    "support-guide-gpu-thermal-seed",
                    "Sustained GPU temperature spikes with frame time drops can indicate throttling or driver instability.",
                    "Troubleshooting evidence used for AS analysis.",
                    BigDecimal.valueOf(0.86),
                    root,
                    profile
            );
        };
        agentTraceService.recordRagEvidence(sessionId, draft);
    }

    private AgentRagEvidenceDraft evidence(
            String sourceId,
            String chunkText,
            String summary,
            BigDecimal score,
            AgentSessionRoot root,
            AgentRunProfile profile
    ) {
        return new AgentRagEvidenceDraft(
                sourceId,
                chunkText,
                summary,
                score,
                MockData.map(
                        "sourceTypes", profile.ragSourceTypes(),
                        "purpose", profile.purpose().name(),
                        "rootType", root.type().name(),
                        "rootId", root.publicId(),
                        "retrievedAt", MockData.now()
                )
        );
    }

    private void recordToolInvocations(String sessionId, AgentSessionRoot root, AgentRunProfile profile) {
        for (String toolName : profile.toolNames()) {
            agentTraceService.recordToolInvocation(sessionId, toolInvocation(toolName, root, profile));
        }
    }

    private AgentToolInvocationDraft toolInvocation(String toolName, AgentSessionRoot root, AgentRunProfile profile) {
        ToolStatus status = toolStatus(toolName, profile.purpose());
        ConfidenceLevel confidence = toolConfidence(toolName, profile.purpose());
        return new AgentToolInvocationDraft(
                toolName,
                status,
                confidence,
                toolSummary(toolName, status, profile.purpose()),
                MockData.map(
                        "toolName", toolName,
                        "rootType", root.type().name(),
                        "rootId", root.publicId(),
                        "purpose", profile.purpose().name(),
                        "context", MockData.map("summaryTarget", profile.summaryTarget())
                ),
                MockData.map(
                        "status", status.name(),
                        "confidence", confidence.name(),
                        "summary", toolSummary(toolName, status, profile.purpose()),
                        "details", MockData.map(
                                "deterministic", true,
                                "checkedAt", MockData.now(),
                                "evidenceSourceTypes", profile.ragSourceTypes()
                        )
                ),
                latencyMs(toolName)
        );
    }

    private static ToolStatus toolStatus(String toolName, AgentPurpose purpose) {
        if (purpose == AgentPurpose.AS_ANALYZE && "performance".equals(toolName)) {
            return ToolStatus.WARN;
        }
        if (purpose == AgentPurpose.BUILD_RECOMMEND && "price".equals(toolName)) {
            return ToolStatus.WARN;
        }
        return ToolStatus.PASS;
    }

    private static ConfidenceLevel toolConfidence(String toolName, AgentPurpose purpose) {
        if (purpose == AgentPurpose.AS_ANALYZE || "price".equals(toolName)) {
            return ConfidenceLevel.MEDIUM;
        }
        return ConfidenceLevel.HIGH;
    }

    private static String toolSummary(String toolName, ToolStatus status, AgentPurpose purpose) {
        return switch (purpose) {
            case BUILD_RECOMMEND -> "Seed " + toolName + " check for build recommendation returned " + status + ".";
            case BUILD_EXPLAIN -> "Seed " + toolName + " check for build explanation returned " + status + ".";
            case AS_ANALYZE -> "Seed " + toolName + " check for AS analysis returned " + status + ".";
        };
    }

    private static Integer latencyMs(String toolName) {
        List<String> order = List.of("compatibility", "power", "size", "performance", "price");
        int index = order.indexOf(toolName);
        return index < 0 ? 60 : 40 + (index * 11);
    }

    private static String summary(AgentRunProfile profile) {
        return switch (profile.purpose()) {
            case BUILD_RECOMMEND -> "Agent completed a build recommendation trace with RAG evidence and Tool checks.";
            case BUILD_EXPLAIN -> "Agent completed a build explanation trace with benchmark and price evidence.";
            case AS_ANALYZE -> "Agent completed an AS analysis trace with troubleshooting evidence and Tool checks.";
        };
    }
}
