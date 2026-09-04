package com.eshuecas.backend.config;

import com.eshuecas.backend.security.JwtAuthenticationFilter;
import com.eshuecas.backend.service.CustomUserDetailsService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            CustomUserDetailsService userDetailsService
    ) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> {
                })

                .sessionManagement(
                        session -> session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // ERROR DE SPRING
                        // Importante para que un error real no
                        // termine apareciendo falsamente como 403.
                        .requestMatchers("/error").permitAll()

                        // LOGIN
                        .requestMatchers("/api/auth/**").permitAll()

                        // ====================================
                        // ADMIN
                        // ====================================

                        .requestMatchers(
                                "/api/dashboard/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                "/api/usuarios/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/huecas/admin"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/hoteles/admin"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/rutas/admin"
                        ).hasRole("ADMIN")

                        // ====================================
                        // CONSULTAS PÚBLICAS
                        // ====================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/huecas"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/huecas/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/categorias"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/categorias/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/hoteles"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/hoteles/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/rutas"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/rutas/**"
                        ).permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/resenas/hueca/**"
                        ).permitAll()

                        // ====================================
                        // HUECAS - SOLO ADMIN
                        // ====================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/huecas/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/huecas/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/huecas/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/huecas/**"
                        ).hasRole("ADMIN")

                        // ====================================
                        // CATEGORÍAS - SOLO ADMIN
                        // ====================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/categorias/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/categorias/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/categorias/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/categorias/**"
                        ).hasRole("ADMIN")

                        // ====================================
                        // HOTELES - SOLO ADMIN
                        // ====================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/hoteles/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/hoteles/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/hoteles/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/hoteles/**"
                        ).hasRole("ADMIN")

                        // ====================================
                        // RUTAS - SOLO ADMIN
                        // ====================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/rutas/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/rutas/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/rutas/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/rutas/**"
                        ).hasRole("ADMIN")

                        // ====================================
                        // FAVORITOS Y RESEÑAS
                        // ====================================

                        .requestMatchers(
                                "/api/favoritos/**"
                        ).authenticated()

                        .requestMatchers(
                                "/api/resenas/**"
                        ).authenticated()

                        .anyRequest()
                        .authenticated()
                )

                .authenticationProvider(
                        authenticationProvider()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(
                        userDetailsService
                );

        provider.setPasswordEncoder(
                passwordEncoder()
        );

        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}