package com.buildgraph.prototype.log;

import com.buildgraph.prototype.common.MockData;
import java.util.Map;

public final class LogSeed {
    private LogSeed() {
    }

    public static Map<String, Object> upload() {
        return MockData.map("logUploadId", "log-1001", "status", "UPLOADED", "rangeMinutes", 30);
    }

    public static Map<String, Object> detail(String id) {
        return MockData.map("id", id, "status", "UPLOADED", "summary", "GPU 88도, 사용률 96%, VRAM 89% 관측");
    }
}
