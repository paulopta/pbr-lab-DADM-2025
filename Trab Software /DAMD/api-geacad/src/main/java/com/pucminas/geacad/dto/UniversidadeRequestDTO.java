package com.pucminas.geacad.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UniversidadeRequestDTO {
    private String nome;
    private String sigla;
    private String cnpj;
    private String url;
    private String telefone;
    private String endereco;
    private String logomarca;
}
