package com.pucminas.geacad.repositories;

import com.pucminas.geacad.models.TipoDeTurma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoDeTurmaRepository extends JpaRepository<TipoDeTurma, Integer> {

}
