package com.eshuecas.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class NoticiasSecurityConfig {

    // Solo GET /api/noticias es público.
    // El resto de las rutas continúa bajo la seguridad original del proyecto.
    @Bean
    @Order(1)
    public SecurityFilterChain noticiasPublicas(HttpSecurity http) throws Exception {
        http.securityMatcher(new AntPathRequestMatcher("/api/noticias", "GET"))
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }
}
