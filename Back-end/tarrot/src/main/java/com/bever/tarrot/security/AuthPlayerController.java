package com.bever.tarrot.security;


import com.bever.tarrot.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthPlayerController {

    private AuthenticationManager authenticationManager;
    private MyUserDetailsService myUserDetailsService;
    private JwtUtil jwtUtil;

    @Autowired
    public AuthPlayerController(
            AuthenticationManager authenticationManager,
            MyUserDetailsService myUserDetailsService,
            JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.myUserDetailsService = myUserDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/authentification")
    public ResponseEntity<String> authentification(@RequestBody User user) throws Exception {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(), user.getPassword()));
        }
        catch (BadCredentialsException e) {
            throw new Exception("Pseudo ou mot de passe incorrect", e);
        }

        final UserDetails PlayerDetails = myUserDetailsService
                .loadUserByUsername(user.getEmail());

        return ResponseEntity.ok(jwtUtil.generateToken(PlayerDetails));
    }
}
