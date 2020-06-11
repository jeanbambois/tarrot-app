package com.bever.tarrot.dao;

import com.bever.tarrot.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(exported = true)
public interface GameRepository extends JpaRepository<Game, Long> {
}
