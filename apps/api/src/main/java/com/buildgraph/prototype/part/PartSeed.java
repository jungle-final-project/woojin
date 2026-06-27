package com.buildgraph.prototype.part;

import com.buildgraph.prototype.common.MockData;
import java.util.List;
import java.util.Map;

public final class PartSeed {
    private PartSeed() {
    }

    public static List<Map<String, Object>> parts() {
        return List.of(
                MockData.map("id", "cpu-7600", "category", "CPU", "name", "AMD Ryzen 5 7600", "price", 259000, "status", "ACTIVE"),
                MockData.map("id", "mb-b650", "category", "MAINBOARD", "name", "B650M WiFi", "price", 179000, "status", "ACTIVE"),
                MockData.map("id", "ram-32", "category", "RAM", "name", "DDR5 32GB 5600", "price", 128000, "status", "ACTIVE"),
                MockData.map("id", "gpu-4070s", "category", "GPU", "name", "RTX 4070 SUPER 12GB", "price", 890000, "status", "ACTIVE"),
                MockData.map("id", "ssd-1tb", "category", "SSD", "name", "NVMe Gen4 1TB", "price", 99000, "status", "ACTIVE"),
                MockData.map("id", "psu-750", "category", "PSU", "name", "750W 80+ Gold", "price", 126000, "status", "ACTIVE")
        );
    }

    public static Map<String, Object> part(String id) {
        return parts().stream()
                .filter(part -> id.equals(part.get("id")))
                .findFirst()
                .orElse(MockData.map("id", id, "status", "NOT_FOUND"));
    }
}
