package com.buildgraph.prototype.price;

import com.buildgraph.prototype.common.MockData;
import java.util.List;
import java.util.Map;

public final class PriceSeed {
    private PriceSeed() {
    }

    public static Map<String, Object> alerts() {
        return MockData.map("items", List.of(MockData.map("id", "alert-001", "partId", "gpu-4070s", "targetPrice", 850000, "status", "ACTIVE")));
    }

    public static Map<String, Object> createAlert() {
        return MockData.map("priceAlertId", "alert-001", "status", "ACTIVE");
    }

    public static Map<String, Object> collectSnapshots() {
        return MockData.map(
                "jobId", "price-job-001",
                "status", "QUEUED",
                "policy", "하루 1회 표시 가격 기준으로 수집하고 실패 시 이전 가격을 임시 사용합니다."
        );
    }

    public static Map<String, Object> priceJobs() {
        return MockData.map("items", List.of(MockData.map("id", "price-job-001", "status", "IDLE", "lastRunAt", MockData.now())));
    }

    public static Map<String, Object> runPriceJob() {
        return MockData.map("jobId", "price-job-001", "status", "QUEUED");
    }
}
