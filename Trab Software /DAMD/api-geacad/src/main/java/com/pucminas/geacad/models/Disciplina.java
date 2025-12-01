package com.pucminas.geacad.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Disciplina extends Base{

    private String sigla;
    private String descricao;
    private Integer cargaHoraria;
    @ManyToOne
    private Curso curso;
    @OneToOne(mappedBy = "disciplina", cascade = CascadeType.ALL)
    private PlanoDeEnsino planoDeEnsino;
    @OneToMany(mappedBy = "disciplina", cascade = CascadeType.ALL)
    private List<Oferta> ofertas = new ArrayList<>();


    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Disciplina that = (Disciplina) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
