package fr.refquiz.authentication;

import jakarta.servlet.http.Cookie;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AuthenticationResponse {
    private List<Cookie> cookies;
}
