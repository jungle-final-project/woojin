package com.buildgraph.prototype.admin;

import com.buildgraph.prototype.price.PriceSeed;
import com.buildgraph.prototype.ticket.TicketSeed;
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
        return AdminSeed.dashboard();
    }

    @GetMapping("/agent-sessions/{id}")
    Map<String, Object> agentSession(@PathVariable String id) {
        return AdminSeed.agentSession(id);
    }

    @GetMapping("/tool-invocations")
    Map<String, Object> toolInvocations() {
        return AdminSeed.toolInvocations();
    }

    @GetMapping("/tool-invocations/{id}")
    Map<String, Object> toolInvocation(@PathVariable String id) {
        return AdminSeed.toolInvocation(id);
    }

    @GetMapping("/rag-evidence/{id}")
    Map<String, Object> ragEvidence(@PathVariable String id) {
        return AdminSeed.ragEvidence(id);
    }

    @GetMapping("/as-tickets")
    Map<String, Object> tickets() {
        return Map.of("items", TicketSeed.tickets());
    }

    @GetMapping("/as-tickets/{id}")
    Map<String, Object> ticket(@PathVariable String id) {
        return TicketSeed.adminTicket(id);
    }

    @GetMapping("/price-jobs")
    Map<String, Object> priceJobs() {
        return PriceSeed.priceJobs();
    }

    @PostMapping("/price-jobs/run")
    @ResponseStatus(HttpStatus.ACCEPTED)
    Map<String, Object> runPriceJob() {
        return PriceSeed.runPriceJob();
    }
}
