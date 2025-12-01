package com.pucminas.geacad.dto;

import com.pucminas.geacad.models.Professor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CursoRequestDTO {
    private String nome;
    private String sigla;
    private String descricao;
    private String telefone;
    private Professor coordenador;
}
