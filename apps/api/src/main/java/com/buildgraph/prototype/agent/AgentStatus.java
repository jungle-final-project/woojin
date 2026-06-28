package com.buildgraph.prototype.agent;

public enum AgentStatus {
    QUEUED,
    RUNNING,
    RAG_SEARCHED,
    TOOLS_CALLED,
    SUMMARY_READY,
    FAILED,
    FALLBACK_READY
}
