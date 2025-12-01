package com.pucminas.geacad.repositories;

import com.pucminas.geacad.models.Titulacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TitulacaoRepository extends JpaRepository<Titulacao,Integer> {

}
