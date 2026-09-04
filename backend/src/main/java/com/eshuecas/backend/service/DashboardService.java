package com.eshuecas.backend.service;

import com.eshuecas.backend.dto.DashboardDTO;
import com.eshuecas.backend.repository.CategoriaRepository;
import com.eshuecas.backend.repository.HotelRepository;
import com.eshuecas.backend.repository.HuecaRepository;
import com.eshuecas.backend.repository.ResenaRepository;
import com.eshuecas.backend.repository.RutaRepository;
import com.eshuecas.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final HuecaRepository huecaRepository;
    private final HotelRepository hotelRepository;
    private final RutaRepository rutaRepository;
    private final CategoriaRepository categoriaRepository;
    private final UsuarioRepository usuarioRepository;
    private final ResenaRepository resenaRepository;

    public DashboardService(
            HuecaRepository huecaRepository,
            HotelRepository hotelRepository,
            RutaRepository rutaRepository,
            CategoriaRepository categoriaRepository,
            UsuarioRepository usuarioRepository,
            ResenaRepository resenaRepository
    ) {
        this.huecaRepository = huecaRepository;
        this.hotelRepository = hotelRepository;
        this.rutaRepository = rutaRepository;
        this.categoriaRepository = categoriaRepository;
        this.usuarioRepository = usuarioRepository;
        this.resenaRepository = resenaRepository;
    }

    public DashboardDTO obtenerEstadisticas() {

        long totalHuecas =
                huecaRepository.count();

        long totalHoteles =
                hotelRepository.count();

        long totalRutas =
                rutaRepository.count();

        long totalCategorias =
                categoriaRepository.count();

        long totalUsuarios =
                usuarioRepository.count();

        long totalResenas =
                resenaRepository.count();

        return new DashboardDTO(
                totalHuecas,
                totalHoteles,
                totalRutas,
                totalCategorias,
                totalUsuarios,
                totalResenas
        );
    }
}