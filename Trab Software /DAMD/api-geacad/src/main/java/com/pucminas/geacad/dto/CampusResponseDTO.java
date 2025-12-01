package com.pucminas.geacad.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CampusResponseDTO {

    private String nome;
    private String sigla;
    private String endereco;
    private String telefone;
    private String urlCampus;
    private String tipoUnidade;
}
