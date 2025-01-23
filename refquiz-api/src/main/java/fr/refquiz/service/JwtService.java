package fr.refquiz.service;

import fr.refquiz.dto.UserResponse;
import fr.refquiz.model.TokenType;
import fr.refquiz.model.User;
import fr.refquiz.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
@RequiredArgsConstructor
@Service
public class JwtService {
    @Value("${application.security.jwt.access-token.expiration}")
    private long AccTokenExpirationInMs;
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long RefTokenExpirationInMs;
    @Value("${application.security.jwt.secret-key}")
    private CharSequence secretKey;
    final private UserRepository userRepository;

    public String generateToken(UserDetails user, TokenType tokenType) {
        return generateToken(new HashMap<>(), user, tokenType);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails user, TokenType tokenType) {
        if (tokenType == TokenType.REFRESH_TOKEN) {
            return buildToken(extraClaims, user, RefTokenExpirationInMs);
        }else{
            return buildToken(extraClaims, user, AccTokenExpirationInMs);
        }
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails user,
            long jwtExpirationInMs) {
        var authorities = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .claim("authorities", authorities)
                .signWith(getSignInKey())
                .compact();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean isTokenValid(String token, UserDetails user){
        final String username = extractUserName(token);
        return username.equals(user.getUsername()) && !isTokenExpired(token);

    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }


    public Cookie generateCookie(String jwtToken, TokenType tokenType) {
        Cookie cookie = new Cookie(tokenType.name(), jwtToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        if (tokenType == TokenType.REFRESH_TOKEN) {
            cookie.setMaxAge((int)RefTokenExpirationInMs);
        }else{
            cookie.setMaxAge((int)AccTokenExpirationInMs);
        }
        return cookie;
    }

    public String getAuthTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("ACCESS_TOKEN".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    public UserResponse getUserFromToken(String token) {
        String username = extractUserName(token);
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return UserResponse
                .builder()
                .roles(user.getRoles())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
