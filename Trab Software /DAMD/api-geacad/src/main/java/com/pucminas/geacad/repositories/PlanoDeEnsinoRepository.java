package com.pucminas.geacad.repositories;

import com.pucminas.geacad.models.PlanoDeEnsino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanoDeEnsinoRepository extends JpaRepository<PlanoDeEnsino, Integer> {

}
