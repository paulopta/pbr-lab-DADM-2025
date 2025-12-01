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
public class UniversidadeResponseDTO {
    private String nome;
    private String sigla;
    private String cnpj;
    private String url;
    private String telefone;
    private String endereco;
    private String logomarca;
}
