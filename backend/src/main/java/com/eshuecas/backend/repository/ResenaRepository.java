// ResenaRepository.java
package com.eshuecas.backend.repository;

import com.eshuecas.backend.entity.Resena;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResenaRepository extends JpaRepository<Resena, Long> {

    List<Resena> findByHuecaId(Long huecaId);

    List<Resena> findByUsuarioId(Long usuarioId);

    List<Resena> findByActivoTrue();

    long countByHuecaId(Long huecaId);
}