package com.eshuecas.backend.config;

import com.eshuecas.backend.entity.*;
import com.eshuecas.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(
            RolRepository rolRepository,
            UsuarioRepository usuarioRepository,
            CategoriaRepository categoriaRepository,
            HuecaRepository huecaRepository,
            HotelRepository hotelRepository,
            RutaRepository rutaRepository,
            PasswordEncoder passwordEncoder
    ) {

        return args -> {

            /*
             * ==========================
             * ROLES
             * ==========================
             */

            Rol rolAdmin =
                    rolRepository
                            .findByNombre("ADMIN")
                            .orElseGet(() -> {

                                Rol rol = new Rol();
                                rol.setNombre("ADMIN");

                                return rolRepository.save(rol);
                            });

            Rol rolUsuario =
                    rolRepository
                            .findByNombre("USUARIO")
                            .orElseGet(() -> {

                                Rol rol = new Rol();
                                rol.setNombre("USUARIO");

                                return rolRepository.save(rol);
                            });


            /*
             * ==========================
             * ADMINISTRADOR
             * ==========================
             */

            String correoAdmin =
                    "admin@lashuecas.ec";

            if (!usuarioRepository
                    .existsByCorreo(correoAdmin)) {

                Usuario admin =
                        new Usuario();

                admin.setNombre(
                        "Administrador"
                );

                admin.setCorreo(
                        correoAdmin
                );

                admin.setPassword(
                        passwordEncoder.encode(
                                "Admin123*"
                        )
                );

                admin.setTelefono(
                        "0999999999"
                );

                admin.setRol(
                        rolAdmin
                );

                admin.setActivo(
                        true
                );

                usuarioRepository.save(
                        admin
                );
            }


            /*
             * ==========================
             * CATEGORÍAS
             * ==========================
             */

            if (categoriaRepository.count() == 0) {

                categoriaRepository.save(
                        new Categoria(
                                "Comida típica",
                                "utensils",
                                "Gastronomía tradicional de Esmeraldas.",
                                "/images/huecas/comida-tipica.jpg"
                        )
                );

                categoriaRepository.save(
                        new Categoria(
                                "Bolones",
                                "circle",
                                "Bolones de verde con queso, chicharrón y otros acompañantes.",
                                "/images/huecas/bolon.jpg"
                        )
                );

                categoriaRepository.save(
                        new Categoria(
                                "Asados",
                                "flame",
                                "Carnes y preparaciones a la parrilla.",
                                "/images/huecas/asados.jpg"
                        )
                );

                categoriaRepository.save(
                        new Categoria(
                                "Pizza",
                                "pizza",
                                "Pizzerías y comida italiana.",
                                "/images/huecas/pizza.jpg"
                        )
                );

                categoriaRepository.save(
                        new Categoria(
                                "Desayunos",
                                "coffee",
                                "Opciones para desayunar en Esmeraldas.",
                                "/images/huecas/desayunos.jpg"
                        )
                );
            }


            /*
             * ==========================
             * HUECAS
             * ==========================
             */

            if (huecaRepository.count() == 0) {

                Categoria comidaTipica =
                        categoriaRepository
                                .findByNombreIgnoreCase(
                                        "Comida típica"
                                )
                                .orElseThrow();

                Categoria bolones =
                        categoriaRepository
                                .findByNombreIgnoreCase(
                                        "Bolones"
                                )
                                .orElseThrow();

                Categoria asados =
                        categoriaRepository
                                .findByNombreIgnoreCase(
                                        "Asados"
                                )
                                .orElseThrow();

                Categoria pizza =
                        categoriaRepository
                                .findByNombreIgnoreCase(
                                        "Pizza"
                                )
                                .orElseThrow();


                Hueca hueca1 =
                        new Hueca();

                hueca1.setNombre(
                        "Sazón Esmeraldeña"
                );

                hueca1.setCategoria(
                        comidaTipica
                );

                hueca1.setDescripcion(
                        "Comida tradicional esmeraldeña con sabores del Pacífico."
                );

                hueca1.setDireccion(
                        "Esmeraldas, Ecuador"
                );

                hueca1.setTelefono(
                        "0990000001"
                );

                hueca1.setHorario(
                        "08:00 - 20:00"
                );

                hueca1.setImagen(
                        "/images/huecas/sazon-esmeraldena.jpg"
                );

                hueca1.setEtiqueta(
                        "Recomendado"
                );

                hueca1.setCalificacion(
                        4.8
                );

                hueca1.setActivo(
                        true
                );

                huecaRepository.save(
                        hueca1
                );


                Hueca hueca2 =
                        new Hueca();

                hueca2.setNombre(
                        "El Rincón del Bolón"
                );

                hueca2.setCategoria(
                        bolones
                );

                hueca2.setDescripcion(
                        "Bolones de verde preparados al estilo esmeraldeño."
                );

                hueca2.setDireccion(
                        "Esmeraldas, Ecuador"
                );

                hueca2.setTelefono(
                        "0990000002"
                );

                hueca2.setHorario(
                        "06:30 - 13:00"
                );

                hueca2.setImagen(
                        "/images/huecas/rincon-bolon.jpg"
                );

                hueca2.setEtiqueta(
                        "Popular"
                );

                hueca2.setCalificacion(
                        4.7
                );

                hueca2.setActivo(
                        true
                );

                huecaRepository.save(
                        hueca2
                );


                Hueca hueca3 =
                        new Hueca();

                hueca3.setNombre(
                        "La Brasa del Norte"
                );

                hueca3.setCategoria(
                        asados
                );

                hueca3.setDescripcion(
                        "Carnes y platos preparados a la parrilla."
                );

                hueca3.setDireccion(
                        "Esmeraldas, Ecuador"
                );

                hueca3.setTelefono(
                        "0990000003"
                );

                hueca3.setHorario(
                        "12:00 - 22:00"
                );

                hueca3.setImagen(
                        "/images/huecas/brasa-norte.jpg"
                );

                hueca3.setEtiqueta(
                        "Asados"
                );

                hueca3.setCalificacion(
                        4.6
                );

                hueca3.setActivo(
                        true
                );

                huecaRepository.save(
                        hueca3
                );


                Hueca hueca4 =
                        new Hueca();

                hueca4.setNombre(
                        "Pizza del Pacífico"
                );

                hueca4.setCategoria(
                        pizza
                );

                hueca4.setDescripcion(
                        "Pizzas artesanales en Esmeraldas."
                );

                hueca4.setDireccion(
                        "Esmeraldas, Ecuador"
                );

                hueca4.setTelefono(
                        "0990000004"
                );

                hueca4.setHorario(
                        "16:00 - 23:00"
                );

                hueca4.setImagen(
                        "/images/huecas/pizza-pacifico.jpg"
                );

                hueca4.setEtiqueta(
                        "Pizza"
                );

                hueca4.setCalificacion(
                        4.5
                );

                hueca4.setActivo(
                        true
                );

                huecaRepository.save(
                        hueca4
                );
            }


            /*
             * ==========================
             * HOTELES
             * ==========================
             */

            if (hotelRepository.count() == 0) {

                Hotel hotel1 = new Hotel();

                hotel1.setNombre(
                        "Hotel Las Palmas"
                );

                hotel1.setDescripcion(
                        "Hospedaje cercano a la playa de Las Palmas."
                );

                hotel1.setDireccion(
                        "Las Palmas, Esmeraldas"
                );

                hotel1.setTelefono(
                        "0991000001"
                );

                hotel1.setImagen(
                        "/images/hoteles/hotel-las-palmas.jpg"
                );

                hotel1.setPrecioDesde(
                        45.0
                );

                hotel1.setCalificacion(
                        4.5
                );

                hotel1.setActivo(
                        true
                );

                hotelRepository.save(
                        hotel1
                );


                Hotel hotel2 = new Hotel();

                hotel2.setNombre(
                        "Hotel Costa Verde"
                );

                hotel2.setDescripcion(
                        "Hotel para visitantes y turistas de Esmeraldas."
                );

                hotel2.setDireccion(
                        "Esmeraldas, Ecuador"
                );

                hotel2.setTelefono(
                        "0991000002"
                );

                hotel2.setImagen(
                        "/images/hoteles/costa-verde.jpg"
                );

                hotel2.setPrecioDesde(
                        55.0
                );

                hotel2.setCalificacion(
                        4.4
                );

                hotel2.setActivo(
                        true
                );

                hotelRepository.save(
                        hotel2
                );


                Hotel hotel3 = new Hotel();

                hotel3.setNombre(
                        "Hotel Pacífico"
                );

                hotel3.setDescripcion(
                        "Hospedaje cómodo para conocer la ciudad."
                );

                hotel3.setDireccion(
                        "Esmeraldas, Ecuador"
                );

                hotel3.setTelefono(
                        "0991000003"
                );

                hotel3.setImagen(
                        "/images/hoteles/hotel-pacifico.jpg"
                );

                hotel3.setPrecioDesde(
                        40.0
                );

                hotel3.setCalificacion(
                        4.3
                );

                hotel3.setActivo(
                        true
                );

                hotelRepository.save(
                        hotel3
                );
            }


            /*
             * ==========================
             * RUTAS
             * ==========================
             */

            if (rutaRepository.count() == 0) {

                Ruta ruta1 = new Ruta();

                ruta1.setTitulo(
                        "Quito - Esmeraldas"
                );

                ruta1.setDescripcion(
                        "Ruta terrestre desde Quito hacia la ciudad de Esmeraldas."
                );

                ruta1.setOrigen(
                        "Quito"
                );

                ruta1.setDestino(
                        "Esmeraldas"
                );

                ruta1.setDuracion(
                        "5 horas aproximadamente"
                );

                ruta1.setDistanciaKm(
                        300.0
                );

                ruta1.setIcono(
                        "car"
                );

                ruta1.setGoogleMapsUrl(
                        "https://www.google.com/maps/dir/Quito/Esmeraldas"
                );

                ruta1.setActivo(
                        true
                );

                rutaRepository.save(
                        ruta1
                );


                Ruta ruta2 = new Ruta();

                ruta2.setTitulo(
                        "Santo Domingo - Esmeraldas"
                );

                ruta2.setDescripcion(
                        "Ruta terrestre desde Santo Domingo hacia Esmeraldas."
                );

                ruta2.setOrigen(
                        "Santo Domingo"
                );

                ruta2.setDestino(
                        "Esmeraldas"
                );

                ruta2.setDuracion(
                        "3 horas aproximadamente"
                );

                ruta2.setDistanciaKm(
                        180.0
                );

                ruta2.setIcono(
                        "car"
                );

                ruta2.setGoogleMapsUrl(
                        "https://www.google.com/maps/dir/Santo+Domingo/Esmeraldas"
                );

                ruta2.setActivo(
                        true
                );

                rutaRepository.save(
                        ruta2
                );


                Ruta ruta3 = new Ruta();

                ruta3.setTitulo(
                        "Centro de Esmeraldas - Las Palmas"
                );

                ruta3.setDescripcion(
                        "Ruta desde el centro de la ciudad hacia la playa de Las Palmas."
                );

                ruta3.setOrigen(
                        "Centro de Esmeraldas"
                );

                ruta3.setDestino(
                        "Las Palmas"
                );

                ruta3.setDuracion(
                        "15 minutos aproximadamente"
                );

                ruta3.setDistanciaKm(
                        5.0
                );

                ruta3.setIcono(
                        "map"
                );

                ruta3.setGoogleMapsUrl(
                        "https://www.google.com/maps"
                );

                ruta3.setActivo(
                        true
                );

                rutaRepository.save(
                        ruta3
                );
            }


            System.out.println(
                    "=========================================="
            );

            System.out.println(
                    " Las Huecas de Esmeraldas - Backend listo "
            );

            System.out.println(
                    " Admin: admin@lashuecas.ec"
            );

            System.out.println(
                    "=========================================="
            );
        };
    }
}