package com.eshuecas.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration}")
    private long expiration;

    public String generarToken(UserDetails userDetails) {

        Date ahora = new Date();

        Date expiracion = new Date(
                ahora.getTime() + expiration
        );

        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(ahora)
                .expiration(expiracion)
                .signWith(obtenerClave())
                .compact();
    }

    public String extraerCorreo(String token) {
        return extraerClaim(
                token,
                Claims::getSubject
        );
    }

    public boolean tokenValido(
            String token,
            UserDetails userDetails
    ) {

        try {

            String correo = extraerCorreo(token);

            return correo.equals(
                    userDetails.getUsername()
            ) && !tokenExpirado(token);

        } catch (Exception e) {
            return false;
        }
    }

    private boolean tokenExpirado(String token) {

        Date expiracion = extraerClaim(
                token,
                Claims::getExpiration
        );

        return expiracion.before(new Date());
    }

    private <T> T extraerClaim(
            String token,
            Function<Claims, T> resolver
    ) {

        Claims claims = extraerTodosLosClaims(token);

        return resolver.apply(claims);
    }

    private Claims extraerTodosLosClaims(
            String token
    ) {

        return Jwts.parser()
                .verifyWith(obtenerClave())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey obtenerClave() {

        return Keys.hmacShaKeyFor(
                secret.getBytes(
                        StandardCharsets.UTF_8
                )
        );
    }
}