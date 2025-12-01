package com.pucminas.geacad.models;

import jakarta.persistence.Entity;
import lombok.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Professor extends Base{

    private String nome;
    private String cpf;
    private String matricula;
    private String carteiraIdentidade;
    private LocalDate dataNascimento;
    private String sexo;
    private String nacionalidade;
    private String naturalidade;
    private String endereco;
    private String telefone;
    private String email;
    private String certificadoReservista;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Professor that = (Professor) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

}
