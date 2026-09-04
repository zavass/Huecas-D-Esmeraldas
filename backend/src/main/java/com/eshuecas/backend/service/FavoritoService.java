package com.eshuecas.backend.service;

import com.eshuecas.backend.entity.Favorito;
import com.eshuecas.backend.entity.Hueca;
import com.eshuecas.backend.entity.Usuario;
import com.eshuecas.backend.repository.FavoritoRepository;
import com.eshuecas.backend.repository.HuecaRepository;
import com.eshuecas.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritoService {

    private final FavoritoRepository favoritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final HuecaRepository huecaRepository;

    public FavoritoService(
            FavoritoRepository favoritoRepository,
            UsuarioRepository usuarioRepository,
            HuecaRepository huecaRepository
    ) {
        this.favoritoRepository = favoritoRepository;
        this.usuarioRepository = usuarioRepository;
        this.huecaRepository = huecaRepository;
    }

    public List<Favorito> listarPorUsuario(
            Long usuarioId
    ) {

        return favoritoRepository
                .findByUsuarioId(usuarioId);
    }

    public Favorito agregar(
            Long usuarioId,
            Long huecaId
    ) {

        if (favoritoRepository
                .existsByUsuarioIdAndHuecaId(
                        usuarioId,
                        huecaId
                )) {

            throw new RuntimeException(
                    "La hueca ya está en favoritos."
            );
        }

        Usuario usuario = usuarioRepository
                .findById(usuarioId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Usuario no encontrado."
                        )
                );

        Hueca hueca = huecaRepository
                .findById(huecaId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Hueca no encontrada."
                        )
                );

        Favorito favorito = new Favorito();

        favorito.setUsuario(usuario);
        favorito.setHueca(hueca);

        return favoritoRepository.save(favorito);
    }

    public void quitar(
            Long usuarioId,
            Long huecaId
    ) {

        Favorito favorito =
                favoritoRepository
                        .findByUsuarioIdAndHuecaId(
                                usuarioId,
                                huecaId
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "El favorito no existe."
                                )
                        );

        favoritoRepository.delete(favorito);
    }

    public boolean esFavorito(
            Long usuarioId,
            Long huecaId
    ) {

        return favoritoRepository
                .existsByUsuarioIdAndHuecaId(
                        usuarioId,
                        huecaId
                );
    }
}