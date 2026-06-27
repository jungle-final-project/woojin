package com.buildgraph.prototype.common;

import java.time.OffsetDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

public final class MockData {
    private MockData() {
    }

    public static Map<String, Object> map(Object... entries) {
        Map<String, Object> result = new LinkedHashMap<>();
        for (int i = 0; i < entries.length; i += 2) {
            result.put(String.valueOf(entries[i]), entries[i + 1]);
        }
        return result;
    }

    public static String now() {
        return OffsetDateTime.now().toString();
    }
}
