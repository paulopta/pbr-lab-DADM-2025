package com.pucminas.geacad.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class AlunoResponseDTO {

    @NotNull
    @NotBlank
    private String nome;
    @NotNull
    @NotBlank
    private String cpf;
    @NotNull
    @NotBlank
    private String matricula;
    @NotNull
    @NotBlank
    private String carteiraIdentidade;
    @NotNull
    @NotBlank
    private LocalDate dataNascimento;
    @NotNull
    @NotBlank
    private String sexo;
    @NotNull
    @NotBlank
    private String nacionalidade;
    @NotNull
    @NotBlank
    private String naturalidade;
    @NotNull
    @NotBlank
    private String endereco;
    @NotNull
    @NotBlank
    private String telefone;
    @NotNull
    @NotBlank
    private String email;
    @NotNull
    @NotBlank
    private String certificadoReservista;


}
