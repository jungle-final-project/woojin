package com.buildgraph.prototype.agent;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AgentRunnerConfig {
    @Bean
    AgentRunner agentRunner(AgentTraceService agentTraceService) {
        return new DeterministicAgentRunner(agentTraceService);
    }
}
