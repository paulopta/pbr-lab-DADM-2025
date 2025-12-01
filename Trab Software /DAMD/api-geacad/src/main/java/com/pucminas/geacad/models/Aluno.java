package com.pucminas.geacad.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Aluno extends Base{

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
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "alunos_turma", joinColumns = @JoinColumn(name = "aluno_id"),
            inverseJoinColumns = @JoinColumn(name = "turma_id" ))
    private List<Turma> turmas = new ArrayList<>();

    public Aluno(String nome, String cpf, String matricula, String carteiraIdentidade, LocalDate dataNascimento, String sexo, String nacionalidade, String naturalidade, String endereco, String telefone, String email, String certificadoReservista) {
        this.nome = nome;
        this.cpf = cpf;
        this.matricula = matricula;
        this.carteiraIdentidade = carteiraIdentidade;
        this.dataNascimento = dataNascimento;
        this.sexo = sexo;
        this.nacionalidade = nacionalidade;
        this.naturalidade = naturalidade;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
        this.certificadoReservista = certificadoReservista;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Aluno that = (Aluno) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

}
