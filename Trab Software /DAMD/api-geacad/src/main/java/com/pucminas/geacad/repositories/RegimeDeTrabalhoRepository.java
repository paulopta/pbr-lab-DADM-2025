package com.pucminas.geacad.repositories;

import com.pucminas.geacad.models.RegimeDeTrabalho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegimeDeTrabalhoRepository extends JpaRepository<RegimeDeTrabalho, Integer> {

}
