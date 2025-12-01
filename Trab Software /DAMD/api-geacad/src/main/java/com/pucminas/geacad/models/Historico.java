package com.pucminas.geacad.models;


import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Historico extends Base{

    private String notasDisciplinas;
    private Integer idDisciplinas;

}
