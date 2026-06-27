package com.buildgraph.prototype.rag;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RagController {
    @GetMapping("/rag/search")
    Map<String, Object> search() {
        return RagSeed.search();
    }

    @GetMapping("/rag/evidence/{id}")
    Map<String, Object> evidence(@PathVariable String id) {
        return RagSeed.evidence(id);
    }
}
