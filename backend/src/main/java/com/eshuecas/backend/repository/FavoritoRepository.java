// FavoritoRepository.java
package com.eshuecas.backend.repository;

import com.eshuecas.backend.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoritoRepository extends JpaRepository<Favorito, Long> {

    List<Favorito> findByUsuarioId(Long usuarioId);

    Optional<Favorito> findByUsuarioIdAndHuecaId(
            Long usuarioId,
            Long huecaId
    );

    boolean existsByUsuarioIdAndHuecaId(
            Long usuarioId,
            Long huecaId
    );
}