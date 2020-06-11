package com.bever.tarrot.dao;

import com.bever.tarrot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin("http://localhost:4200")
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNickName(String pseudo);

    Optional<User> findByEmail(String email);
}
