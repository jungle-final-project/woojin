package com.buildgraph.prototype.ticket;

import com.buildgraph.prototype.common.MockData;
import java.util.List;
import java.util.Map;

public final class TicketSeed {
    private TicketSeed() {
    }

    public static List<Map<String, Object>> tickets() {
        return List.of(
                MockData.map("id", "AS-1031", "user", "user@example.com", "symptom", "게임 중 프레임 급락", "status", "OPEN", "cause", "GPU 온도 과열 가능성"),
                MockData.map("id", "AS-1032", "user", "dev@example.com", "symptom", "IDE 실행 시 메모리 부족", "status", "IN_PROGRESS", "cause", "RAM 사용률 92% 반복")
        );
    }

    public static Map<String, Object> createTicket() {
        return MockData.map("ticketId", "AS-1031", "status", "OPEN");
    }

    public static Map<String, Object> userTicket(String id) {
        return MockData.map("id", id, "status", "OPEN", "symptom", "게임 중 프레임 급락", "causeCandidates", tickets());
    }

    public static Map<String, Object> adminTicket(String id) {
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
}
