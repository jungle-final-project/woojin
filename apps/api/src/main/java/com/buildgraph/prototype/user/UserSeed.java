package com.buildgraph.prototype.user;

import com.buildgraph.prototype.common.MockData;
import java.util.Map;

public final class UserSeed {
    private UserSeed() {
    }

    public static Map<String, Object> login(String email) {
        String role = email.startsWith("admin") ? "ADMIN" : "USER";
        return MockData.map(
                "token", "demo-jwt-" + role.toLowerCase(),
                "user", MockData.map("id", role.equals("ADMIN") ? "admin-001" : "user-1004", "email", email, "role", role)
        );
    }

    public static Map<String, Object> signup(String name, String email) {
        return MockData.map("id", "user-1004", "email", email, "name", name, "role", "USER", "createdAt", MockData.now());
    }

    public static Map<String, Object> me(String authorization) {
        boolean admin = authorization != null && authorization.contains("admin");
        return MockData.map("id", admin ? "admin-001" : "user-1004", "email", admin ? "admin@example.com" : "user@example.com", "role", admin ? "ADMIN" : "USER");
    }
}
