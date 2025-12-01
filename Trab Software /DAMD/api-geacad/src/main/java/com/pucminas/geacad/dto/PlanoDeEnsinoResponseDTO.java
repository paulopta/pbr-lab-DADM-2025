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
public class PlanoDeEnsinoResponseDTO {
    private String ementa;
    private String conteudo;
    private String objetivo;
    private String referenciaBibliografica;
}
