package com.pucminas.geacad.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
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
public class Universidade extends Base{

    private String nome;
    private String sigla;
    private String cnpj;
    private String url;
    private String telefone;
    private String endereco;
    private String logomarca;
    @OneToMany(mappedBy = "universidade", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Campus> listaCampus = new ArrayList<>();



    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Universidade that = (Universidade) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

}
