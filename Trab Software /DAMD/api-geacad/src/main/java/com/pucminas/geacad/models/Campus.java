package com.pucminas.geacad.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Campus extends Base{

    private String nome;
    private String sigla;
    private String endereco;
    private String telefone;
    private String urlCampus;
    private String tipoUnidade;
    @ManyToOne
    private Universidade universidade;
    @OneToMany(mappedBy = "campus", cascade = CascadeType.ALL)
    private List<Departamento> departamentos = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Campus that = (Campus) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

}
