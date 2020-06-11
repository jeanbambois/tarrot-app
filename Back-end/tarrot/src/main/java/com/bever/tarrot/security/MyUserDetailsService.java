package com.bever.tarrot.security;

import com.bever.tarrot.dao.UserRepository;
import com.bever.tarrot.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User player = userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Inconnu : " + email));
        return new MyUserDetails(player);
    }
}
