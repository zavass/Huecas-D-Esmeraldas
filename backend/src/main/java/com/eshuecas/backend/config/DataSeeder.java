package com.eshuecas.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.eshuecas.backend.entity.Categoria;
import com.eshuecas.backend.entity.Hotel;
import com.eshuecas.backend.entity.Hueca;
import com.eshuecas.backend.entity.Rol;
import com.eshuecas.backend.entity.Ruta;
import com.eshuecas.backend.entity.Usuario;
import com.eshuecas.backend.repository.CategoriaRepository;
import com.eshuecas.backend.repository.HotelRepository;
import com.eshuecas.backend.repository.HuecaRepository;
import com.eshuecas.backend.repository.RolRepository;
import com.eshuecas.backend.repository.RutaRepository;
import com.eshuecas.backend.repository.UsuarioRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RolRepository rolRepository;
    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;
    private final HuecaRepository huecaRepository;
    private final HotelRepository hotelRepository;
    private final RutaRepository rutaRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(
            RolRepository rolRepository,
            UsuarioRepository usuarioRepository,
            CategoriaRepository categoriaRepository,
            HuecaRepository huecaRepository,
            HotelRepository hotelRepository,
            RutaRepository rutaRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.rolRepository = rolRepository;
        this.usuarioRepository = usuarioRepository;
        this.categoriaRepository = categoriaRepository;
        this.huecaRepository = huecaRepository;
        this.hotelRepository = hotelRepository;
        this.rutaRepository = rutaRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        System.out.println();
        System.out.println("==========================================");
        System.out.println(" INICIANDO DATOS LAS HUECAS");
        System.out.println("==========================================");

        // =====================================================
        // ROLES Y ADMIN
        // =====================================================

        Rol rolAdmin = obtenerOCrearRol("ADMIN");
        obtenerOCrearRol("USUARIO");

        crearAdministradorSiNoExiste(rolAdmin);

        // =====================================================
        // CATEGORÍAS
        // =====================================================

        Categoria mariscos = obtenerOCrearCategoria(
                "Mariscos",
                "🦐",
                "Mariscos frescos y sabores del Pacífico.",
                "/images/marisco/fernando.jpg"
        );

        Categoria encocados = obtenerOCrearCategoria(
                "Encocados",
                "🥥",
                "Encocados tradicionales preparados con coco, mariscos y pescado.",
                "/images/encocados/encocado.jpg"
        );

        Categoria bolones = obtenerOCrearCategoria(
                "Bolones",
                "🫓",
                "Bolones, tigrillos y desayunos tradicionales preparados con verde.",
                "/images/bolones/lorejon.jpg"
        );

        Categoria platosTipicos = obtenerOCrearCategoria(
                "Platos típicos",
                "🍲",
                "Platos tradicionales de la gastronomía esmeraldeña.",
                "/images/gastronomia/Gastronomía Esmeraldeña.jpg"
        );

        Categoria parrilladas = obtenerOCrearCategoria(
                "Parrilladas",
                "🔥",
                "Cortes de carne, brochetas y asados al carbón.",
                "/images/huecas/va la vaca.jpg"
        );

        obtenerOCrearCategoria(
                "Ceviches",
                "🐟",
                "Ceviches y preparaciones frescas del mar.",
                "/images/gastronomia/Ceviche Langostinos (2).jpg"
        );

        Categoria bebidas = obtenerOCrearCategoria(
                "Bebidas",
                "🥤",
                "Bares, restobares, discotecas, karaoke y espacios para disfrutar la vida nocturna de Esmeraldas.",
                "/images/bebidas/point.jpg"
        );

        Categoria postres = obtenerOCrearCategoria(
                "Postres",
                "🍰",
                "Cafeterías, pastelerías, helados y dulces tradicionales de Esmeraldas.",
                "/images/postres/galy.png"
        );

        // =====================================================
        // HUECAS
        // =====================================================

        crearParrilladas(parrilladas);
        crearMariscos(mariscos);
        crearEncocados(encocados);
        crearBolones(bolones);
        crearBebidas(bebidas);
        crearPostres(postres);
        crearZuri(platosTipicos);

        // Redes sociales oficiales de las huecas
        actualizarRedesSociales();

        // =====================================================
        // HOTELES Y RUTAS
        // =====================================================

        crearHotelesIniciales();
        crearRutasIniciales();

        System.out.println();
        System.out.println("==========================================");
        System.out.println(" BACKEND LISTO");
        System.out.println("==========================================");
        System.out.println(" Admin: admin@lashuecas.ec");
        System.out.println("==========================================");
        System.out.println();
    }

    // =========================================================
    // ROLES
    // =========================================================

    private Rol obtenerOCrearRol(String nombre) {

        return rolRepository.findByNombre(nombre)
                .orElseGet(() -> {

                    Rol rol = new Rol();
                    rol.setNombre(nombre);

                    Rol guardado = rolRepository.save(rol);

                    System.out.println("Rol creado: " + nombre);

                    return guardado;
                });
    }

    // =========================================================
    // ADMIN
    // =========================================================

    private void crearAdministradorSiNoExiste(Rol rolAdmin) {

        String correo = "admin@lashuecas.ec";

        if (usuarioRepository.existsByCorreo(correo)) {
            return;
        }

        Usuario usuario = new Usuario();

        usuario.setNombre("Administrador");
        usuario.setCorreo(correo);
        usuario.setPassword(
                passwordEncoder.encode("Admin123*")
        );
        usuario.setTelefono("0999999999");
        usuario.setRol(rolAdmin);
        usuario.setActivo(true);

        usuarioRepository.save(usuario);

        System.out.println("Administrador creado.");
    }

    // =========================================================
    // CATEGORÍAS
    // =========================================================

    private Categoria obtenerOCrearCategoria(
            String nombre,
            String icono,
            String descripcion,
            String imagen
    ) {

        return categoriaRepository
                .findByNombreIgnoreCase(nombre)
                .map(categoria -> {

                    categoria.setIcono(icono);
                    categoria.setDescripcion(descripcion);
                    categoria.setImagen(imagen);

                    return categoriaRepository.save(categoria);
                })
                .orElseGet(() -> {

                    Categoria categoria = new Categoria();

                    categoria.setNombre(nombre);
                    categoria.setIcono(icono);
                    categoria.setDescripcion(descripcion);
                    categoria.setImagen(imagen);

                    Categoria guardada =
                            categoriaRepository.save(categoria);

                    System.out.println(
                            "Categoría creada: " + nombre
                    );

                    return guardada;
                });
    }

    // =========================================================
    // PARRILLADAS
    // =========================================================

    private void crearParrilladas(Categoria categoria) {

        crearActualizarHueca(
                "Va La Vaca",
                categoria,
                "Especialistas en cortes de carne preparados a las brasas, parrilladas y platos para compartir.",
                "Malecón de Las Palmas, Esmeraldas",
                "Consultar",
                "12:00 - 23:00",
                "/images/huecas/va la vaca.jpg",
                "Más popular",
                4.8
        );

        crearActualizarHueca(
                "Carbón y Leños Parrilladas",
                categoria,
                "Parrilladas al carbón acompañadas de moros, carnes asadas y platos familiares.",
                "Av. Barbizzotty, Esmeraldas",
                "Consultar",
                "11:30 - 22:30",
                "/images/huecas/carbon.jpg",
                "Parrillada",
                4.7
        );

        crearActualizarHueca(
                "Fabiana Grill",
                categoria,
                "Asados al carbón, picaña y cortes preparados a la parrilla.",
                "Av. Kennedy, frente a Flopec, Esmeraldas",
                "Consultar",
                "12:00 - 23:00",
                "/images/huecas/fabiana.png",
                "Grill",
                4.8
        );

        crearActualizarHueca(
                "Parrilladas El Gaucho",
                categoria,
                "Asados tradicionales, combos de carne y preparaciones a la brasa.",
                "Frente al parque de Las Palmas, Esmeraldas",
                "Consultar",
                "12:00 - 22:30",
                "/images/huecas/guacho.jpg",
                "Tradicional",
                4.7
        );

        crearActualizarHueca(
                "Parrilladas El Charro",
                categoria,
                "Cortes de carne seleccionados, parrilladas y platos preparados al carbón.",
                "Calle Simón Plata Torres, Esmeraldas",
                "Consultar",
                "11:00 - 22:00",
                "/images/huecas/charro.jpeg",
                "Parrillada",
                4.6
        );

        crearActualizarHueca(
                "Brochetas y Asados Grill",
                categoria,
                "Brochetas gigantes, costillas y diferentes carnes preparadas a la parrilla.",
                "Sector playero de Esmeraldas",
                "Consultar",
                "12:00 - 23:00",
                "/images/huecas/brochetas.jpg",
                "Brochetas",
                4.8
        );

        crearActualizarHueca(
                "Asados El Carbonero",
                categoria,
                "Parrilladas al carbón, pollo asado y opciones para compartir.",
                "Cerca del Malecón, Esmeraldas",
                "Consultar",
                "11:00 - 22:30",
                "/images/huecas/carbonero.jpg",
                "Carbón",
                4.6
        );

        crearActualizarHueca(
                "Parrilla y Sabor Las Palmas",
                categoria,
                "Asados al paso y platos combinados de carne, pollo y chuleta.",
                "Las Palmas, Esmeraldas",
                "Consultar",
                "12:00 - 22:30",
                "/images/huecas/sabor.jpg",
                "Las Palmas",
                4.7
        );

        crearActualizarHueca(
                "La Esquina de Ales",
                categoria,
                "Cortes populares, chuletas, menestras y carnes preparadas a la parrilla.",
                "Zona norte de Esmeraldas",
                "Consultar",
                "11:30 - 22:00",
                "/images/huecas/esquina.jpg",
                "Asados",
                4.6
        );

        crearActualizarHueca(
                "Fogón y Brasa",
                categoria,
                "Parrilladas familiares, cortes de carne y acompañamientos con patacones.",
                "Sector Av. Luis Tello, Esmeraldas",
                "Consultar",
                "12:00 - 22:30",
                "/images/huecas/fogon.jpeg",
                "Fogón",
                4.7
        );
    }

    // =========================================================
    // MARISCOS
    // =========================================================

    private void crearMariscos(Categoria categoria) {

        crearActualizarHueca(
                "Especialidad En Mariscos (D' Fernando)",
                categoria,
                "Especialidad en mariscos y platos tradicionales del Pacífico.",
                "Barrio Las Palmas, Esmeraldas",
                "Consultar",
                "09:00 - 22:00",
                "/images/marisco/fernando.jpg",
                "Mariscos",
                4.3
        );

        crearActualizarHueca(
                "Cafetería y Restaurante Bolívar",
                categoria,
                "Restaurante de comida esmeraldeña, mariscos y platos tradicionales.",
                "Malecón de Las Palmas, Av. del Pacífico, Esmeraldas",
                "Consultar",
                "08:00 - 22:00",
                "/images/marisco/bolivar.jpg",
                "Tradicional",
                4.1
        );

        crearActualizarHueca(
                "El Encocado de Oro",
                categoria,
                "Especialidad en encocados, mariscos y sabores tradicionales de Esmeraldas.",
                "Av. Kennedy y Malecón de Las Palmas, Esmeraldas",
                "Consultar",
                "10:00 - 22:00",
                "/images/marisco/oro.jpg",
                "Encocados",
                4.2
        );

        crearActualizarHueca(
                "Restaurante El Palmar",
                categoria,
                "Mariscos frescos y platos tradicionales en el sector Las Palmas.",
                "Sector Las Palmas, Esmeraldas",
                "Consultar",
                "09:00 - 21:00",
                "/images/marisco/palmar.jpg",
                "Mariscos",
                4.0
        );

        crearActualizarHueca(
                "Cevichería El Manglar Costeño",
                categoria,
                "Ceviches, mariscos frescos y preparaciones tradicionales de la costa.",
                "Sector Las Palmas, Esmeraldas",
                "Consultar",
                "09:00 - 20:00",
                "/images/marisco/manglar.jpg",
                "Ceviches",
                4.3
        );

        crearActualizarHueca(
                "Cevichería Líder #3",
                categoria,
                "Ceviches y mariscos frescos con tradición esmeraldeña.",
                "Vía a la Refinería, Calle A, Sector La Florida, Esmeraldas",
                "Consultar",
                "07:30 - 18:00",
                "/images/marisco/lider.jpg",
                "Cevichería",
                4.4
        );

        crearActualizarHueca(
                "Cevichería OH! MAR",
                categoria,
                "Ceviches y preparaciones de mariscos frescos en la zona norte de Esmeraldas.",
                "Sector Las Palmas / Centro, Esmeraldas",
                "Consultar",
                "Miércoles a lunes 09:00 - 18:00",
                "/images/marisco/mar.jpg",
                "Cevichería",
                4.5
        );

        crearActualizarHueca(
                "El Paraíso Restaurant",
                categoria,
                "Restaurante de mariscos y comida tradicional en el centro de Esmeraldas.",
                "Casco urbano central de Esmeraldas",
                "Consultar",
                "Martes a domingo 11:30 - 16:00",
                "/images/marisco/paraiso.jpg",
                "Restaurante",
                4.2
        );

        crearActualizarHueca(
                "Cevichería D'Leon",
                categoria,
                "Ceviches, mariscos y platos preparados para disfrutar en horario nocturno.",
                "Av. Olmedo y Mejía, Esmeraldas",
                "Consultar",
                "Jueves a sábado en horario nocturno",
                "/images/marisco/leon.jpg",
                "Cevichería",
                4.6
        );
    }

    // =========================================================
    // ENCOCADOS
    // =========================================================

    private void crearEncocados(Categoria categoria) {

        crearActualizarHueca(
                "Encocado De La Madrina",
                categoria,
                "Hueca tradicional especializada en encocados de pescado y mariscos con auténtico sabor esmeraldeño.",
                "Sector Homero López, Esmeraldas",
                "Consultar",
                "Lunes a domingo 08:30 - 16:30",
                "/images/encocados/encocado.jpg",
                "Tradicional",
                4.3
        );

        crearActualizarHueca(
                "Restaurant Las Hamacas",
                categoria,
                "Restaurante tradicional con encocados, mariscos y platos típicos de la costa esmeraldeña.",
                "Avenida Río Verde, sector Tachina, Esmeraldas",
                "Consultar",
                "Lunes a domingo 08:00 - 22:00",
                "/images/encocados/hamacas.jpg",
                "Recomendado",
                4.3
        );

        crearActualizarHueca(
                "Paso Fino Restaurant",
                categoria,
                "Encocados, comida tradicional y opciones para disfrutar a cualquier hora del día.",
                "Ruta del Spondylus, vía a Tachina, Esmeraldas",
                "Consultar",
                "Abierto 24 horas",
                "/images/encocados/fino.jpg",
                "24 horas",
                4.4
        );

        crearActualizarHueca(
                "La Sazón de la Tía Sixta",
                categoria,
                "Recetas tradicionales preparadas con sazón esmeraldeña y especialidad en encocados.",
                "9 de Octubre y Colón, Esmeraldas Centro",
                "Consultar",
                "Lunes a domingo desde 11:00 hasta agotar",
                "/images/encocados/tia.jpg",
                "Sazón tradicional",
                4.1
        );

        crearActualizarHueca(
                "Empabonado",
                categoria,
                "Encocados y preparaciones tradicionales con excelente relación entre sabor y precio.",
                "Sector Vuelta Larga, zona sur de Esmeraldas",
                "Consultar",
                "Martes a domingo 09:00 - 17:00",
                "/images/encocados/emponado.jpg",
                "Muy valorado",
                4.6
        );

        crearActualizarHueca(
                "El Sabor de la Chillangua",
                categoria,
                "Comida tradicional con mariscos frescos, chillangua y auténticos encocados esmeraldeños.",
                "Av. Jaime Roldós Aguilera, cerca del Puerto Pesquero Artesanal, Esmeraldas",
                "Consultar",
                "Lunes a sábado 07:30 - 15:00",
                "/images/encocados/Chillangua.jpg",
                "Sabor local",
                4.4
        );

        crearActualizarHueca(
                "Picantería Las Redes",
                categoria,
                "Picantería tradicional especializada en encocados, pescado y mariscos.",
                "Calle Kennedy y Av. del Pacífico, sector Las Palmas, Esmeraldas",
                "Consultar",
                "Lunes a domingo 10:00 - 18:00",
                "/images/encocados/redes.jpg",
                "Las Palmas",
                4.2
        );

        crearActualizarHueca(
                "El Rincón del Encocao",
                categoria,
                "Encocados tradicionales servidos en un ambiente rústico ideal para disfrutar en familia.",
                "Cabecera parroquial de Tachina, Esmeraldas",
                "Consultar",
                "Viernes a domingo 10:00 - 17:00",
                "/images/encocados/ricon.jpg",
                "Encocao",
                4.3
        );

        crearActualizarHueca(
                "Comedor Doña Zoila",
                categoria,
                "Sazón casera y encocados tradicionales preparados al estilo de los comedores de barrio de Esmeraldas.",
                "Calle Espejo, Barrio Caliente, Centro de Esmeraldas",
                "Consultar",
                "Lunes a viernes 11:30 - 15:30",
                "/images/encocados/soila.jpg",
                "Casero",
                4.0
        );

        crearActualizarHueca(
                "Cevichería y Encocados El Negro José",
                categoria,
                "Ceviches, encocados y mariscos preparados para el almuerzo diario con auténtico sabor costeño.",
                "Av. Olmedo y Calle Salinas, Esmeraldas",
                "Consultar",
                "Lunes a sábado 08:00 - 16:00",
                "/images/encocados/jose.jpg",
                "Encocados",
                4.1
        );
    }

    // =========================================================
    // BOLONES
    // =========================================================

    private void crearBolones(Categoria categoria) {

        crearActualizarHueca(
                "LOREJÓN BOLONES & TIGRILLO",
                categoria,
                "Bolones, tigrillo y desayunos tradicionales preparados con verde y acompañamientos típicos.",
                "Código Plus X87W+R9X, Esmeraldas",
                "Consultar",
                "Lun-Sáb 07:00-14:00 / 17:00-23:00; Dom 07:00-14:00",
                "/images/bolones/lorejon.jpg",
                "Bolones y tigrillo",
                4.3
        );

        crearActualizarHueca(
                "Bolones y Picaditas Don Ru",
                categoria,
                "Bolones, picaditas y desayunos tradicionales con preparaciones de verde.",
                "Calle Mejía y Av. 6 de Diciembre, Esmeraldas",
                "Consultar",
                "Martes a domingo 24 horas",
                "/images/bolones/ru.jpg",
                "24 horas",
                4.4
        );

        crearActualizarHueca(
                "Bolivar cafetería sur",
                categoria,
                "Cafetería especializada en desayunos, bolones y opciones rápidas para comenzar el día.",
                "Zona Sur, Esmeraldas",
                "Consultar",
                "Lunes a domingo 07:00 - 12:00",
                "/images/bolones/bolivar.jpg",
                "Desayunos",
                4.3
        );

        crearActualizarHueca(
                "Cafetería y Restaurante Bolivar",
                categoria,
                "Bolones, desayunos, cafetería y platos tradicionales en el sector Las Palmas.",
                "Av. del Pacífico, Esmeraldas",
                "Consultar",
                "Lunes a domingo 08:00 - 22:00",
                "/images/bolones/cafeteria.jpg",
                "Cafetería",
                4.1
        );

        crearActualizarHueca(
                "Bolones del Sur Restaurante y Cafetería",
                categoria,
                "Bolones y desayunos preparados al estilo tradicional en la zona sur de Esmeraldas.",
                "Sector Sur, Esmeraldas",
                "Consultar",
                "Lunes a sábado 06:00 - 14:00",
                "/images/bolones/sur.jpg",
                "Bolones",
                4.0
        );

        crearActualizarHueca(
                "Bolones Estefany",
                categoria,
                "Desayunos y bolones tradicionales servidos durante las primeras horas del día.",
                "Código Plus X8FW+2MC, Esmeraldas",
                "Consultar",
                "Lunes a domingo 07:30 - 12:00",
                "/images/bolones/estefy.jpg",
                "Desayuno",
                4.0
        );

        crearActualizarHueca(
                "Bolones Doña Esmeraldas",
                categoria,
                "Bolones tradicionales de paso preparados con verde y sabor casero esmeraldeño.",
                "Calle Sucre y Eugenio Espejo, Esmeraldas",
                "Consultar",
                "Lunes a domingo 07:05 - 11:30",
                "/images/bolones/doña.jpg",
                "Tradicional",
                0.0
        );
    }

    // =========================================================
    // BEBIDAS
    // =========================================================

    private void crearBebidas(Categoria categoria) {

        crearActualizarHueca(
                "Restobar The Point",
                categoria,
                "Restobar ubicado en Las Palmas con bebidas, gastronomía, música y ambiente nocturno frente al Pacífico.",
                "Av. del Pacífico y Simón Plata Torres, Las Palmas, Esmeraldas",
                "Consultar",
                "Lunes a domingo 09:00 - 04:00",
                "/images/bebidas/point.jpg",
                "Restobar",
                4.4
        );

        crearActualizarHueca(
                "La Santa Bar",
                categoria,
                "Bar moderno del Malecón de Las Palmas con bebidas, música y entretenimiento nocturno.",
                "Malecón de Las Palmas, diagonal a Flopec, Esmeraldas",
                "Consultar",
                "Jueves a sábado desde 18:00",
                "/images/bebidas/santa.jpg",
                "Bar",
                0.0
        );

        crearActualizarHueca(
                "D'Vogga Bar",
                categoria,
                "Bar frente a la playa para disfrutar bebidas, música y el ambiente nocturno de Las Palmas.",
                "Malecón de Las Palmas, frente a la playa, Esmeraldas",
                "Consultar",
                "Jueves a domingo 17:00 - 02:00",
                "/images/bebidas/vogga.jpg",
                "Frente al mar",
                0.0
        );

        crearActualizarHueca(
                "Arena Blanca Discoteca",
                categoria,
                "Discoteca del sector Las Palmas con música, bebidas y ambiente nocturno.",
                "Av. Kennedy, sector Las Palmas, Esmeraldas",
                "Consultar",
                "Viernes y sábado 20:00 - 03:00",
                "/images/bebidas/arena.jpg",
                "Discoteca",
                0.0
        );

        crearActualizarHueca(
                "Habana Salsa",
                categoria,
                "Espacio nocturno especializado en salsa, música latina, bebidas y entretenimiento.",
                "Sector Malecón Playa de Las Palmas, Esmeraldas",
                "Consultar",
                "Jueves a sábado 19:00 - 02:00",
                "/images/bebidas/salsa.jpg",
                "Salsa",
                0.0
        );

        crearActualizarHueca(
                "Chic Club",
                categoria,
                "Club nocturno con música, bebidas y ambiente para disfrutar durante el fin de semana.",
                "Av. Kennedy, Las Palmas, Esmeraldas",
                "Consultar",
                "Viernes y sábado 21:00 - 04:00",
                "/images/bebidas/chic.jpg",
                "Club",
                0.0
        );

        crearActualizarHueca(
                "Monza House",
                categoria,
                "Bar moderno para compartir bebidas y disfrutar de la vida nocturna esmeraldeña.",
                "Av. Barbisotti y Calle Padilla, Esmeraldas",
                "Consultar",
                "Mar-Mié 18:00-00:00 | Jue 18:00-02:00 | Vie-Sáb 18:00-03:00",
                "/images/bebidas/monza.jpg",
                "Muy valorado",
                4.6
        );

        crearActualizarHueca(
                "Gio's Bar",
                categoria,
                "Bar urbano ubicado en el centro de Esmeraldas con bebidas y ambiente relajado.",
                "Calle Padilla, entre Sucre y Olmedo, Esmeraldas",
                "Consultar",
                "Lunes a sábado 14:00 - 01:00",
                "/images/bebidas/gios.jpg",
                "Bar",
                0.0
        );

        crearActualizarHueca(
                "Heros Bar",
                categoria,
                "Local nocturno del centro de Esmeraldas con música, bebidas y entretenimiento.",
                "Sector céntrico de Esmeraldas",
                "Consultar",
                "Miércoles a sábado 20:00 - 04:00",
                "/images/bebidas/hero.jpg",
                "Vida nocturna",
                4.2
        );

        crearActualizarHueca(
                "Mackao's Bar Karaoke",
                categoria,
                "Bar karaoke para disfrutar bebidas, música y entretenimiento en el centro de Esmeraldas.",
                "Casco Central de Esmeraldas, Código Plus X88W+995",
                "Consultar",
                "Lunes a sábado 18:00 - 02:00",
                "/images/bebidas/marko.jpg",
                "Mejor valorado",
                5.0
        );

        crearActualizarHueca(
                "Don Caice",
                categoria,
                "Establecimiento del centro-norte de Esmeraldas con gastronomía y variedad de bebidas.",
                "Sector centro-norte de Esmeraldas",
                "Consultar",
                "Todos los días 11:30 - 22:00",
                "/images/bebidas/caice.jpg",
                "Tradicional",
                0.0
        );

        crearActualizarHueca(
                "El Salivero",
                categoria,
                "Local tradicional de la zona urbana de Esmeraldas para disfrutar bebidas y gastronomía local.",
                "Zona urbana tradicional de Esmeraldas",
                "Consultar",
                "Lunes a domingo 10:00 - 20:00",
                "/images/bebidas/salivero.jpg",
                "Tradicional",
                0.0
        );
    }

    // =========================================================
    // POSTRES
    // =========================================================

    private void crearPostres(Categoria categoria) {

        crearActualizarHueca(
                "Galy's Café",
                categoria,
                "Cafetería del centro de Esmeraldas con bebidas, postres y opciones dulces para disfrutar durante el día.",
                "Calle C. Valdez 1-01, Centro de Esmeraldas",
                "Consultar",
                "Lun-Vie 07:00-13:30 / 17:00-21:30; Sáb 08:00-13:30 / 17:00-21:30",
                "/images/postres/galy.png",
                "Cafetería",
                0.0
        );

        crearActualizarHueca(
                "JUZA Tortas Y Postres",
                categoria,
                "Tortas, postres y preparaciones dulces en pleno casco comercial de Esmeraldas.",
                "Casco comercial urbano, Centro de Esmeraldas",
                "Consultar",
                "Lun 09:30-00:00; Mar-Vie 09:30-19:30; Sáb 09:30-16:00; Dom 10:00-13:00",
                "/images/postres/juza.jpg",
                "Tortas y postres",
                0.0
        );

        crearActualizarHueca(
                "Chocolate Pastelería & Cafetería",
                categoria,
                "Pastelería y cafetería con variedad de tortas, dulces, bebidas y postres.",
                "Sector céntrico y residencial de Esmeraldas",
                "Consultar",
                "Lunes a sábado 09:00 - 17:00",
                "/images/postres/chocolate.jpg",
                "Pastelería",
                0.0
        );

        crearActualizarHueca(
                "Andarele Café",
                categoria,
                "Cafetería del sector Las Palmas con bebidas, postres y opciones dulces para compartir.",
                "Av. Kennedy, sector Las Palmas, Esmeraldas",
                "Consultar",
                "Lunes a domingo 08:00 - 00:00",
                "/images/postres/anda.png",
                "Cafetería",
                0.0
        );

        crearActualizarHueca(
                "Bogati - Helados con Queso",
                categoria,
                "Helados con queso y distintas opciones dulces para disfrutar junto al Malecón de Las Palmas.",
                "Av. del Pacífico y Simón Plata Torres, Malecón de Las Palmas, Esmeraldas",
                "Consultar",
                "Lun-Vie 12:00-21:00; Sáb-Dom 12:00-22:00",
                "/images/postres/bogati.jpg",
                "Helados",
                0.0
        );

        crearActualizarHueca(
                "Ventas tradicionales del Parque Central",
                categoria,
                "Punto tradicional donde artesanos locales ofrecen cocadas negras, cocadas blancas y manjares de coco.",
                "Alrededores del Parque Central 20 de Marzo, Centro de Esmeraldas",
                "Consultar",
                "Todos los días 09:00 - 18:00 aproximadamente",
                "/images/postres/parque.jpg",
                "Dulces tradicionales",
                0.0
        );
    }

    // =========================================================
    // CASA DE PLAYA ZURI
    // =========================================================

    private void crearZuri(Categoria categoria) {

        String imagen = "/images/huecas/Zuri.jpg";

        Hueca zuri = huecaRepository
                .findFirstByImagenOrderByIdAsc(imagen)
                .orElseGet(() ->
                        huecaRepository
                                .findByNombreIgnoreCase("Casa de Playa Zuri")
                                .orElseGet(Hueca::new)
                );

        boolean nueva = zuri.getId() == null;

        zuri.setNombre("Casa de Playa Zuri");
        zuri.setCategoria(categoria);

        zuri.setDescripcion(
                "Restaurante y espacio de entretenimiento en Tonsupa con gastronomía local, "
                        + "varios ambientes para compartir, área de karaoke, música en vivo "
                        + "y eventos nocturnos."
        );

        zuri.setDireccion(
                "Vía a Tonsupa, Ruta del Spondylus (E15), Esmeraldas"
        );

        zuri.setTelefono("0993355260");

        zuri.setHorario(
                "Desde las 18:00; eventos nocturnos y música en vivo generalmente desde las 20:00"
        );

        zuri.setImagen(imagen);
        zuri.setEtiqueta("Muy recomendada");
        zuri.setCalificacion(0.0);
        zuri.setDestacado(true);

        zuri.setInstagramUrl(
                "https://www.instagram.com/zurirestaurante/"
        );

        zuri.setTiktokUrl(
                "https://www.tiktok.com/@zuri.restaurante"
        );

        zuri.setFacebookUrl(null);
        zuri.setActivo(true);

        huecaRepository.save(zuri);

        if (nueva) {
            System.out.println("Hueca creada: Casa de Playa Zuri");
        } else {
            System.out.println("Hueca actualizada: Casa de Playa Zuri");
        }
    }

    // =========================================================
    // REDES SOCIALES OFICIALES
    // =========================================================

    private void actualizarRedesSociales() {

        asignarRedes(
                "Mackao's Bar Karaoke",
                null,
                "https://www.tiktok.com/@makaos_ec?is_from_webapp=1&sender_device=pc",
                null
        );

        asignarRedes(
                "Brochetas y Asados Grill",
                null,
                "https://www.tiktok.com/@brochetasysartenesgrill?is_from_webapp=1&sender_device=pc",
                null
        );

        asignarRedes(
                "Fabiana Grill",
                "https://www.instagram.com/fabianagrill?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
                null,
                null
        );

        asignarRedes(
                "Va La Vaca",
                null,
                "https://www.tiktok.com/@valavaca?is_from_webapp=1&sender_device=pc",
                null
        );

        asignarRedes(
                "Carbón y Leños Parrilladas",
                null,
                "https://www.tiktok.com/@carbonylenos?is_from_webapp=1&sender_device=pc",
                null
        );

        asignarRedes(
                "Parrilladas El Gaucho",
                null,
                "https://www.tiktok.com/@elgaucho910?is_from_webapp=1&sender_device=pc",
                null
        );

        asignarRedes(
                "Asados El Carbonero",
                null,
                "https://www.tiktok.com/@elcarboneropizzeria?is_from_webapp=1&sender_device=pc",
                null
        );

        asignarRedes(
                "Cevichería D'Leon",
                null,
                null,
                "https://www.facebook.com/cevichesDleon"
        );

        asignarRedes(
                "Empabonado",
                null,
                null,
                "https://www.facebook.com/profile.php?id=100062610227050"
        );

        asignarRedes(
                "La Esquina de Ales",
                null,
                null,
                "https://www.facebook.com/asaderolaesquinadeales"
        );

        asignarRedes(
                "Monza House",
                null,
                null,
                "https://www.facebook.com/monzahousebardiscotec/"
        );

        asignarRedes(
                "Parrilladas El Charro",
                null,
                "https://www.tiktok.com/@parrilladas.elcharro?is_from_webapp=1&sender_device=pc",
                "https://www.facebook.com/parrilladaselcharro/?locale=es_LA"
        );

        asignarRedes(
                "Cevichería OH! MAR",
                null,
                null,
                "https://www.facebook.com/restaurante.oh.mar.atacames/?locale=es_LA"
        );

        asignarRedes(
                "Bolones y Picaditas Don Ru",
                null,
                null,
                "https://www.facebook.com/p/Bolones-y-Picaditas-DON-RU-100063701157321/"
        );

        asignarRedes(
                "Cevichería Líder #3",
                null,
                null,
                "https://www.facebook.com/cevicherialider3/?locale=es_LA"
        );

        asignarRedes(
                "Paso Fino Restaurant",
                null,
                null,
                "https://www.facebook.com/RESTAURANTEPASOFINO/?locale=es_LA"
        );

        asignarRedes(
                "Restobar The Point",
                "https://www.instagram.com/thepointrestoobar/",
                "https://www.tiktok.com/@thepoint.restobar?is_from_webapp=1&sender_device=pc",
                null
        );

        asignarRedes(
                "Bolivar cafetería sur",
                "https://www.instagram.com/bolonesycafeteria/",
                null,
                "https://www.facebook.com/bolonesdelabolivar/?locale=es_LA"
        );

        asignarRedes(
                "Cevichería El Manglar Costeño",
                "https://www.instagram.com/cevicheriamanglar?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
                null,
                null
        );

        asignarRedes(
                "Especialidad En Mariscos (D' Fernando)",
                "https://www.instagram.com/dfernandorestaurant?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
                "https://www.tiktok.com/@d_fernando_restaurant?is_from_webapp=1&sender_device=pc",
                null
        );

        asignarRedes(
                "LOREJÓN BOLONES & TIGRILLO",
                null,
                "https://www.tiktok.com/@lorejonesm?is_from_webapp=1&sender_device=pc",
                "https://www.facebook.com/lorejonbolonesytigrillos/?locale=es_LA"
        );

        asignarRedes(
                "Restaurant Las Hamacas",
                "https://www.instagram.com/lashamacasbarrestaurante?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
                "https://www.tiktok.com/@hamacasrestaurante?is_from_webapp=1&sender_device=pc",
                null
        );

        asignarRedes(
                "Heros Bar",
                null,
                null,
                "https://www.facebook.com/HerosEsme/?locale=es_LA"
        );

        asignarRedes(
                "Picantería Las Redes",
                null,
                null,
                "https://www.facebook.com/PicanteriaLaPreferida/photos/sabemos-que-te-gusta-lo-bueno-por-eso-siempre-te-damos-lo-mejorvisita-la-picante/1162337463819873/"
        );

        asignarRedes(
                "Cevichería y Encocados El Negro José",
                null,
                null,
                "https://www.facebook.com/cevicherianegrojoe/?locale=es_LA"
        );

        asignarRedes(
                "Bolones del Sur Restaurante y Cafetería",
                null,
                null,
                "https://www.facebook.com/bolonesdelsur/?locale=es_LA"
        );

        asignarRedes(
                "Restaurante El Palmar",
                null,
                "https://www.tiktok.com/@elpalmarpaola?is_from_webapp=1&sender_device=pc",
                "https://www.facebook.com/ElPalmaRestaurant/?locale=es_LA"
        );

        asignarRedes(
                "Andarele Café",
                null,
                "https://www.tiktok.com/@andarelepaleteriaycafe?is_from_webapp=1&sender_device=pc",
                "https://www.facebook.com/andareleheladeria/?locale=es_LA"
        );

        asignarRedes(
                "Bogati - Helados con Queso",
                null,
                null,
                "https://www.facebook.com/bogati.ec/?locale=es_LA"
        );

        asignarRedes(
                "Bolones Doña Esmeraldas",
                null,
                null,
                "https://www.facebook.com/p/Bolones-Do%C3%B1a-Esmeraldas-100063255187156/"
        );

        asignarRedes(
                "Chocolate Pastelería & Cafetería",
                null,
                null,
                "https://www.facebook.com/p/Chocolate-Pasteler%C3%ADa-Cafeter%C3%ADa-100064061950175/"
        );

        asignarRedes(
                "D'Vogga Bar",
                null,
                null,
                "https://www.facebook.com/p/D-VOGGA-61565005393583/"
        );

        asignarRedes(
                "Galy's Café",
                null,
                null,
                "https://www.facebook.com/GalysCafe/?locale=es_LA"
        );

        asignarRedes(
                "JUZA Tortas Y Postres",
                null,
                null,
                "https://www.facebook.com/juzatortas/?locale=es_LA"
        );
    }

    private void asignarRedes(
            String nombre,
            String instagram,
            String tiktok,
            String facebook
    ) {

        huecaRepository
                .findByNombreIgnoreCase(nombre)
                .ifPresentOrElse(
                        hueca -> {

                            hueca.setInstagramUrl(instagram);
                            hueca.setTiktokUrl(tiktok);
                            hueca.setFacebookUrl(facebook);

                            huecaRepository.save(hueca);

                            System.out.println(
                                    "Redes actualizadas: " + nombre
                            );
                        },
                        () -> System.out.println(
                                "No se encontró la hueca para redes: " + nombre
                        )
                );
    }

    // =========================================================
    // CREAR O ACTUALIZAR HUECA
    // =========================================================

    private void crearActualizarHueca(
            String nombre,
            Categoria categoria,
            String descripcion,
            String direccion,
            String telefono,
            String horario,
            String imagen,
            String etiqueta,
            Double calificacion
    ) {

        /*
         * IMPORTANTE:
         * El DataSeeder se ejecuta cada vez que inicia Spring Boot.
         * Por eso buscamos primero por la ruta de la imagen, que es
         * una clave mucho más estable que el nombre.
         *
         * Esto evita duplicados cuando existen tildes, ñ o problemas
         * de codificación en nombres antiguos de PostgreSQL.
         */
        Hueca hueca = huecaRepository
                .findFirstByImagenOrderByIdAsc(imagen)
                .orElseGet(() ->
                        huecaRepository
                                .findByNombreIgnoreCase(nombre)
                                .orElseGet(Hueca::new)
                );

        boolean nueva = hueca.getId() == null;

        hueca.setNombre(nombre);
        hueca.setCategoria(categoria);
        hueca.setDescripcion(descripcion);
        hueca.setDireccion(direccion);
        hueca.setTelefono(telefono);
        hueca.setHorario(horario);
        hueca.setImagen(imagen);
        hueca.setEtiqueta(etiqueta);
        hueca.setCalificacion(calificacion);
        hueca.setActivo(true);

        if (hueca.getDestacado() == null) {
            hueca.setDestacado(false);
        }

        huecaRepository.save(hueca);

        if (nueva) {
            System.out.println("Hueca creada: " + nombre);
        } else {
            System.out.println("Hueca actualizada: " + nombre);
        }
    }

    // =========================================================
    // HOTELES
    // =========================================================

    private void crearHotelesIniciales() {

        crearActualizarHotel(
                "Hotel Las Palmas",
                "Hotel de 3 estrellas ubicado en la zona costera de Esmeraldas, con acceso directo a la playa, piscina, restaurante, desayuno y estacionamiento gratuito.",
                "Sector Las Palmas, Esmeraldas",
                "Consultar",
                "/images/hoteles/palmas.jpg",
                66.00,
                4.4
        );

        crearActualizarHotel(
                "Hotel Ramedi",
                "Hotel moderno con excelente ubicación en la zona costera, ambiente agradable y habitaciones confortables.",
                "Zona costera de Esmeraldas",
                "Consultar",
                "/images/hoteles/ramedi.jpg",
                null,
                4.5
        );

        crearActualizarHotel(
                "Hotel Turqueza Home inn",
                "Alojamiento reconocido por su atención personalizada, tranquilidad y cercanía al balneario.",
                "Av. Kennedy y Simón Plata Torres, Esmeraldas",
                "Consultar",
                "/images/hoteles/home.jpg",
                null,
                4.9
        );

        crearActualizarHotel(
                "Hotel Kennedy Esmeraldas",
                "Hotel de 3 estrellas con aire acondicionado, Wi-Fi y fácil acceso de transporte hacia el malecón.",
                "Sector Kennedy, Esmeraldas",
                "Consultar",
                "/images/hoteles/kennedy.jpg",
                null,
                4.1
        );

        crearActualizarHotel(
                "Hotel Cayapas Esmeraldas",
                "Hotel de 4 estrellas con restaurante propio, Wi-Fi, parqueadero cerrado y opción de hospedaje con mascotas.",
                "Esmeraldas",
                "Consultar",
                "/images/hoteles/cayapas.png",
                47.00,
                4.5
        );

        crearActualizarHotel(
                "Hotel Perla Verde",
                "Hotel de 4 estrellas con ambiente tranquilo, restaurante, aire acondicionado y espacios para eventos.",
                "Esmeraldas",
                "Consultar",
                "/images/hoteles/perla.jpg",
                59.00,
                4.3
        );

        crearActualizarHotel(
                "Hotel Colón Palace",
                "Hotel de 3 estrellas con desayuno buffet, internet, restaurante y servicio de lavandería.",
                "Centro de Esmeraldas",
                "Consultar",
                "/images/hoteles/colon.jpg",
                null,
                4.3
        );

        crearActualizarHotel(
                "Hotel Barracón",
                "Alojamiento con habitaciones equipadas con aire acondicionado, excelente limpieza y recepción con flexibilidad de horarios.",
                "Esmeraldas",
                "Consultar",
                "/images/hoteles/barracon.jpg",
                null,
                4.3
        );

        crearActualizarHotel(
                "Hotel Zulema Inn",
                "Hotel con desayuno, parqueadero, internet de alta velocidad y ambiente silencioso para descansar.",
                "Av. Bolívar entre Mejía y Cañizares, Esmeraldas",
                "Consultar",
                "/images/hoteles/zulema.jpg",
                null,
                4.4
        );

        crearActualizarHotel(
                "Olan's Group Hotel",
                "Hotel de 3 estrellas con suites y habitaciones funcionales, desayuno, aire acondicionado y traslado al aeropuerto disponible.",
                "Esmeraldas",
                "Consultar",
                "/images/hoteles/olans.png",
                43.00,
                4.2
        );
    }

    // =========================================================
    // CREAR O ACTUALIZAR HOTEL
    // =========================================================

    private void crearActualizarHotel(
            String nombre,
            String descripcion,
            String direccion,
            String telefono,
            String imagen,
            Double precio,
            Double calificacion
    ) {

        Hotel hotel = hotelRepository
                .findFirstByImagenOrderByIdAsc(imagen)
                .orElseGet(() ->
                        hotelRepository
                                .findByNombreIgnoreCase(nombre)
                                .orElseGet(Hotel::new)
                );

        boolean nuevo = hotel.getId() == null;

        hotel.setNombre(nombre);
        hotel.setDescripcion(descripcion);
        hotel.setDireccion(direccion);
        hotel.setTelefono(telefono);
        hotel.setImagen(imagen);
        hotel.setPrecioDesde(precio);
        hotel.setCalificacion(calificacion);
        hotel.setActivo(true);

        hotelRepository.save(hotel);

        if (nuevo) {
            System.out.println("Hotel creado: " + nombre);
        } else {
            System.out.println("Hotel actualizado: " + nombre);
        }
    }

    // =========================================================
    // RUTAS
    // =========================================================

    private void crearRutasIniciales() {

        if (rutaRepository.count() > 0) {
            return;
        }

        crearRuta(
                "Quito - Esmeraldas",
                "Ruta principal desde Quito hacia la ciudad de Esmeraldas.",
                "Quito",
                "Esmeraldas",
                "5 - 6 horas",
                "🛣️",
                "https://maps.google.com",
                318.0
        );

        crearRuta(
                "Santo Domingo - Esmeraldas",
                "Ruta terrestre hacia Esmeraldas desde Santo Domingo.",
                "Santo Domingo",
                "Esmeraldas",
                "3 - 4 horas",
                "🚗",
                "https://maps.google.com",
                190.0
        );

        crearRuta(
                "Centro de Esmeraldas - Las Palmas",
                "Recorrido urbano hacia la playa Las Palmas.",
                "Centro de Esmeraldas",
                "Las Palmas",
                "15 minutos",
                "🏖️",
                "https://maps.google.com",
                5.0
        );
    }

    private void crearRuta(
            String titulo,
            String descripcion,
            String origen,
            String destino,
            String duracion,
            String icono,
            String googleMapsUrl,
            Double distancia
    ) {

        Ruta ruta = new Ruta();

        ruta.setTitulo(titulo);
        ruta.setDescripcion(descripcion);
        ruta.setOrigen(origen);
        ruta.setDestino(destino);
        ruta.setDuracion(duracion);
        ruta.setIcono(icono);
        ruta.setGoogleMapsUrl(googleMapsUrl);
        ruta.setDistanciaKm(distancia);
        ruta.setActivo(true);

        rutaRepository.save(ruta);
    }
}