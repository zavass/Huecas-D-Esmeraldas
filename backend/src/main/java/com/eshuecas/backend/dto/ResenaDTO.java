package com.eshuecas.backend.dto;

import java.time.LocalDateTime;

public class ResenaDTO {

    private Long id;

    private Long usuarioId;
    private String usuarioNombre;

    private Long huecaId;
    private String huecaNombre;

    private Integer calificacion;
    private String comentario;
    private LocalDateTime fecha;
    private Boolean activo;

    public ResenaDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getUsuarioNombre() {
        return usuarioNombre;
    }

    public void setUsuarioNombre(String usuarioNombre) {
        this.usuarioNombre = usuarioNombre;
    }

    public Long getHuecaId() {
        return huecaId;
    }

    public void setHuecaId(Long huecaId) {
        this.huecaId = huecaId;
    }

    public String getHuecaNombre() {
        return huecaNombre;
    }

    public void setHuecaNombre(String huecaNombre) {
        this.huecaNombre = huecaNombre;
    }

    public Integer getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(Integer calificacion) {
        this.calificacion = calificacion;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}