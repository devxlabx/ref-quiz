package fr.refquiz.controller;

import fr.refquiz.configuration.exception.ErrorResponse;
import fr.refquiz.configuration.exception.ResourceNotFoundException;
import fr.refquiz.dto.UserDto;
import fr.refquiz.service.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@Validated
@RequiredArgsConstructor
@Tag(name = "User Management", description = "Endpoints for managing users")
public class UserController {

    private final UserService userService;

    @GetMapping
    @Operation(summary = "Get all users", description = "Retrieve a list of all registered users")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad request, invalid parameters",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class),
                            examples = @ExampleObject(value = "{ \"status\": 400, \"errorCode\": \"BAD_REQUEST\", \"message\": \"Invalid request parameters\" }")
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
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a user", description = "Get a user by their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(
                    responseCode = "404",
                    description = "User not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class),
                            examples = @ExampleObject(value = "{ \"status\": 404, \"errorCode\": \"NOT_FOUND\", \"message\": \"User not found with the given ID\" }")
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
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        Optional<UserDto> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

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
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) throws MessagingException {

        UserDto createdUser = userService.createUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping("/activate-account")
    public ResponseEntity<String> activateUser(@RequestParam("emailHash") String emailHash) throws MessagingException {
            userService.activateAccount(emailHash);
        return ResponseEntity.ok("Compte activé avec succés");
    }

}
