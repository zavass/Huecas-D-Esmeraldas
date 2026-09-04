package com.eshuecas.backend.service;

import com.eshuecas.backend.dto.HotelDTO;
import com.eshuecas.backend.entity.Hotel;
import com.eshuecas.backend.repository.HotelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    public HotelService(
            HotelRepository hotelRepository
    ) {
        this.hotelRepository = hotelRepository;
    }

    public List<HotelDTO> listar() {

        return hotelRepository.findAll()
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public List<HotelDTO> listarActivos() {

        return hotelRepository
                .findByActivoTrueOrderByCalificacionDesc()
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public HotelDTO buscarPorId(Long id) {

        return convertirDTO(
                buscarEntidad(id)
        );
    }

    public List<HotelDTO> buscar(String texto) {

        return hotelRepository
                .findByNombreContainingIgnoreCaseOrDescripcionContainingIgnoreCase(
                        texto,
                        texto
                )
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public HotelDTO crear(HotelDTO dto) {

        Hotel hotel = new Hotel();

        copiarDatos(dto, hotel);

        return convertirDTO(
                hotelRepository.save(hotel)
        );
    }

    public HotelDTO actualizar(
            Long id,
            HotelDTO dto
    ) {

        Hotel hotel = buscarEntidad(id);

        copiarDatos(dto, hotel);

        return convertirDTO(
                hotelRepository.save(hotel)
        );
    }

    public void eliminar(Long id) {

        if (!hotelRepository.existsById(id)) {
            throw new RuntimeException(
                    "Hotel no encontrado."
            );
        }

        hotelRepository.deleteById(id);
    }

    public HotelDTO cambiarEstado(
            Long id,
            Boolean activo
    ) {

        Hotel hotel = buscarEntidad(id);

        hotel.setActivo(activo);

        return convertirDTO(
                hotelRepository.save(hotel)
        );
    }

    private Hotel buscarEntidad(Long id) {

        return hotelRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Hotel no encontrado con ID: " + id
                        )
                );
    }

    private void copiarDatos(
            HotelDTO dto,
            Hotel hotel
    ) {

        hotel.setNombre(dto.getNombre());
        hotel.setDescripcion(dto.getDescripcion());
        hotel.setDireccion(dto.getDireccion());
        hotel.setTelefono(dto.getTelefono());
        hotel.setImagen(dto.getImagen());
        hotel.setPrecioDesde(dto.getPrecioDesde());

        hotel.setCalificacion(
                dto.getCalificacion() == null
                        ? 0.0
                        : dto.getCalificacion()
        );

        hotel.setLatitud(dto.getLatitud());
        hotel.setLongitud(dto.getLongitud());

        if (dto.getActivo() != null) {
            hotel.setActivo(dto.getActivo());
        }
    }

    private HotelDTO convertirDTO(Hotel hotel) {

        HotelDTO dto = new HotelDTO();

        dto.setId(hotel.getId());
        dto.setNombre(hotel.getNombre());
        dto.setDescripcion(hotel.getDescripcion());
        dto.setDireccion(hotel.getDireccion());
        dto.setTelefono(hotel.getTelefono());
        dto.setImagen(hotel.getImagen());
        dto.setPrecioDesde(hotel.getPrecioDesde());
        dto.setCalificacion(hotel.getCalificacion());
        dto.setLatitud(hotel.getLatitud());
        dto.setLongitud(hotel.getLongitud());
        dto.setActivo(hotel.getActivo());

        return dto;
    }
}