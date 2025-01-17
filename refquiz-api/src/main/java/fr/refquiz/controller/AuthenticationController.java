package fr.refquiz.controller;

import fr.refquiz.authentication.AuthenticationRequest;
import fr.refquiz.authentication.AuthenticationResponse;
import fr.refquiz.configuration.exception.ErrorResponse;
import fr.refquiz.dto.UserDto;
import fr.refquiz.service.AuthenticationService;
import fr.refquiz.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Nonnull;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Tag(name = "Authentication", description = "Endpoints for user authentication and session management")
public class AuthenticationController {

    private final AuthenticationService authService;
    private final UserService userService;

    @PostMapping
    @Operation(
            summary = "Create a new user",
            description = "Add a new user to the system"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created successfully"),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid input",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class),
                            examples = @ExampleObject(value = "{ \"status\": 400, \"errorCode\": \"BAD_REQUEST\", \"message\": \"Invalid input data provided\" }")
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Internal server error",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class),
                            examples = @ExampleObject(value = "{ \"status\": 500, \"errorCode\": \"INTERNAL_SERVER_ERROR\", \"message\": \"An unexpected error occurred\" }")
                    )
            )
    })
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
        UserDto createdUser = userService.createUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PostMapping
    @Operation(summary = "Authenticate user", description = "Authenticate a user with their credentials and return a JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User authenticated successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AuthenticationResponse.class),
                            examples = @ExampleObject(value = "{ \"token\": \"eyJhbGciOiJIUzI1NiIsInR5...\" }")
                    )
            ),
            @ApiResponse(responseCode = "400", description = "Invalid credentials provided",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class),
                            examples = @ExampleObject(value = "{ \"status\": 400, \"errorCode\": \"BAD_REQUEST\", \"message\": \"Bad credentials\" }")
                    )
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class),
                            examples = @ExampleObject(value = "{ \"status\": 500, \"errorCode\": \"INTERNAL_SERVER_ERROR\", \"message\": \"An unexpected error occurred\" }")
                    )
            )
    })
    public ResponseEntity<AuthenticationResponse> authenticate(
            @Nonnull @RequestBody @Valid AuthenticationRequest req,
            @Nonnull HttpServletResponse response
    ) {
        AuthenticationResponse authResponse = authService.authenticate(req, response);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Refresh authentication token", description = "Refresh the JWT token for an authenticated user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token refreshed successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AuthenticationResponse.class),
                            examples = @ExampleObject(value = "{ \"token\": \"eyJhbGciOiJIUzI1NiIsInR5...\" }")
                    )
            ),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class),
                            examples = @ExampleObject(value = "{ \"status\": 401, \"errorCode\": \"BAD_REQUEST\", \"message\": \"Invalid or expired refresh token\" }")
                    )
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class),
                            examples = @ExampleObject(value = "{ \"status\": 500, \"errorCode\": \"INTERNAL_SERVER_ERROR\", \"message\": \"An unexpected error occurred\" }")
                    )
            )
    })
    public void refreshToken(
            HttpServletRequest req,
            HttpServletResponse res
    ) throws IOException {
        authService.refreshToken(req, res);
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout user", description = "Invalidate the user's session and JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User logged out successfully"),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class),
                            examples = @ExampleObject(value = "{ \"status\": 400, \"errorCode\": \"BAD_REQUEST\", \"message\": \"Invalid logout request\" }")
                    )
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class),
                            examples = @ExampleObject(value = "{ \"status\": 500, \"errorCode\": \"INTERNAL_SERVER_ERROR\", \"message\": \"An unexpected error occurred\" }")
                    )
            )
    })
    public ResponseEntity<String> logout(
            @NonNull HttpServletRequest req,
            @NonNull HttpServletResponse res
    ) {
        authService.logout(req, res);
        return ResponseEntity.status(HttpStatus.OK).body("User logged out successfully");
    }
}
