package com.pucminas.geacad.repositories;

import com.pucminas.geacad.models.Universidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversidadeRepository extends JpaRepository<Universidade, Integer> {

}
