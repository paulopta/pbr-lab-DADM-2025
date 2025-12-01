package com.pucminas.geacad.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProfessorResponseDTO {
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
}
