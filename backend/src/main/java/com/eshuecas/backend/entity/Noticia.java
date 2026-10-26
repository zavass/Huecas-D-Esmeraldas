package com.eshuecas.backend.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "noticias")
public class Noticia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 64)
    private String huella;

    @Column(nullable = false, length = 320)
    private String titulo;

    @Column(nullable = false, length = 1500)
    private String resumen;

    @Column(nullable = false, length = 40)
    private String categoria;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false, length = 180)
    private String fuente;

    @Column(nullable = false, length = 500)
    private String imagen = "/images/logo/noticia.png";

    @Column(nullable = false, length = 1500)
    private String url;

    @Column(nullable = false)
    private boolean publicada = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime creadaEn;

    @PrePersist
    public void antesDeGuardar() {
        if (creadaEn == null) creadaEn = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getHuella() { return huella; }
    public void setHuella(String huella) { this.huella = huella; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getResumen() { return resumen; }
    public void setResumen(String resumen) { this.resumen = resumen; }
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    public String getFuente() { return fuente; }
    public void setFuente(String fuente) { this.fuente = fuente; }
    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public boolean isPublicada() { return publicada; }
    public void setPublicada(boolean publicada) { this.publicada = publicada; }
    public LocalDateTime getCreadaEn() { return creadaEn; }
}
