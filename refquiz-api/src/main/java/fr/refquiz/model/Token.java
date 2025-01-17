package fr.refquiz.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
@Builder
public class Token {
    private String id;
    private String token;
    private TokenType TokenType;
    private User user;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;

}
