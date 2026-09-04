package com.eshuecas.backend.dto;

public class DashboardDTO {

    private long totalHuecas;
    private long totalHoteles;
    private long totalRutas;
    private long totalCategorias;
    private long totalUsuarios;
    private long totalResenas;

    public DashboardDTO() {
    }

    public DashboardDTO(
            long totalHuecas,
            long totalHoteles,
            long totalRutas,
            long totalCategorias,
            long totalUsuarios,
            long totalResenas
    ) {
        this.totalHuecas = totalHuecas;
        this.totalHoteles = totalHoteles;
        this.totalRutas = totalRutas;
        this.totalCategorias = totalCategorias;
        this.totalUsuarios = totalUsuarios;
        this.totalResenas = totalResenas;
    }

    public long getTotalHuecas() {
        return totalHuecas;
    }

    public void setTotalHuecas(long totalHuecas) {
        this.totalHuecas = totalHuecas;
    }

    public long getTotalHoteles() {
        return totalHoteles;
    }

    public void setTotalHoteles(long totalHoteles) {
        this.totalHoteles = totalHoteles;
    }

    public long getTotalRutas() {
        return totalRutas;
    }

    public void setTotalRutas(long totalRutas) {
        this.totalRutas = totalRutas;
    }

    public long getTotalCategorias() {
        return totalCategorias;
    }

    public void setTotalCategorias(long totalCategorias) {
        this.totalCategorias = totalCategorias;
    }

    public long getTotalUsuarios() {
        return totalUsuarios;
    }

    public void setTotalUsuarios(long totalUsuarios) {
        this.totalUsuarios = totalUsuarios;
    }

    public long getTotalResenas() {
        return totalResenas;
    }

    public void setTotalResenas(long totalResenas) {
        this.totalResenas = totalResenas;
    }
}