package fr.refquiz.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.refquiz.authentication.AuthenticationRequest;
import fr.refquiz.authentication.AuthenticationResponse;
import fr.refquiz.model.Token;
import fr.refquiz.model.TokenType;
import fr.refquiz.model.User;
import fr.refquiz.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;
    private final UserRepository userRepository;

    public AuthenticationResponse authenticate(
            @NonNull @Valid AuthenticationRequest req,
            @NonNull HttpServletResponse res) {
        //todo check account activation
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getEmail(),
                        req.getPassword()
                )
        );
        var claims = new HashMap<String,Object>();
        var user = ((User) auth.getPrincipal());
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);
        claims.put("fullName", user.getName());
        claims.put("roles", user.getRoles());
        var jwtToken = jwtService.generateToken(
                claims,
                user,
                TokenType.ACCESS_TOKEN);
        Cookie accessTokenCookie = jwtService.generateCookie(jwtToken, TokenType.ACCESS_TOKEN);
        var jwtRefreshToken = jwtService.generateToken(
                user,
                TokenType.REFRESH_TOKEN);
        Cookie refreshTokenCookie = jwtService.generateCookie(jwtRefreshToken, TokenType.REFRESH_TOKEN);
        res.addCookie(accessTokenCookie);
        res.addCookie(refreshTokenCookie);
        return AuthenticationResponse.builder().cookies(List.of(accessTokenCookie, refreshTokenCookie)).build();
    }


    public void refreshToken(@NonNull HttpServletRequest req,
                             @NonNull HttpServletResponse res
    ) throws IOException {
        final String authorizationHeader = req.getHeader("Authorization");
        final String jwtRefreshToken;
        final String userEmail;
        if(authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")){
            return;
        }
        jwtRefreshToken = authorizationHeader.substring(7);
        userEmail = jwtService.extractUserName(jwtRefreshToken);
        if(userEmail != null){
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            if(jwtService.isTokenValid(jwtRefreshToken, userDetails)){
                var accessToken = jwtService.generateToken(userDetails, TokenType.ACCESS_TOKEN);
                Cookie accessTokenCookie = jwtService.generateCookie(accessToken, TokenType.ACCESS_TOKEN);
                Cookie refreshTokenCookie = jwtService.generateCookie(jwtRefreshToken, TokenType.REFRESH_TOKEN);
                res.addCookie(accessTokenCookie);
                res.addCookie(refreshTokenCookie);
                var authResponse = AuthenticationResponse.builder().cookies(List.of(accessTokenCookie, refreshTokenCookie)).build();
                new ObjectMapper().writeValue(res.getOutputStream(), authResponse);
            }
        }
    }

    public void logout(@NonNull HttpServletRequest req,
                       @NonNull HttpServletResponse res) {
        final String authorizationHeader = req.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return;
        }
        jwtToken = authorizationHeader.substring(7);
        userEmail = jwtService.extractUserName(jwtToken);
        if (userEmail != null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwtToken, userDetails)) {
                res.addCookie(jwtService.generateCookie(null, TokenType.ACCESS_TOKEN));
                res.addCookie(jwtService.generateCookie(null, TokenType.REFRESH_TOKEN));
            }
        }
    }
}
