package com.pucminas.geacad.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DepartamentoRequestDTO {
    private String nome;
    private String sigla;
    private String url;
    private String telefone;

}
