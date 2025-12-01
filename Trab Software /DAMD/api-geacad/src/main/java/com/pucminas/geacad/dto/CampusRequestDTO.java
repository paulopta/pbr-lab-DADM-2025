package com.pucminas.geacad.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CampusRequestDTO {
    private String nome;
    private String sigla;
    private String endereco;
    private String telefone;
    private String urlCampus;
    private String tipoUnidade;
}
