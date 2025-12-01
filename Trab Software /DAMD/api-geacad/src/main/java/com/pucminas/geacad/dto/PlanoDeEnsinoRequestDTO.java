package com.pucminas.geacad.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlanoDeEnsinoRequestDTO {
    private String ementa;
    private String conteudo;
    private String objetivo;
    private String referenciaBibliografica;
}
