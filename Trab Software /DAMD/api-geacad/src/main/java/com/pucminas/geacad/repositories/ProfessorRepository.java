package com.pucminas.geacad.repositories;

import com.pucminas.geacad.models.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessorRepository extends JpaRepository <Professor, Integer> {

}
