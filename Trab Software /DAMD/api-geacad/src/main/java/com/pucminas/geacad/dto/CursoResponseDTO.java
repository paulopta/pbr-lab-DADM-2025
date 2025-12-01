package com.pucminas.geacad.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pucminas.geacad.models.Professor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CursoResponseDTO {
    private String nome;
    private String sigla;
    private String descricao;
    private String telefone;
    private Professor coordenador;
}
