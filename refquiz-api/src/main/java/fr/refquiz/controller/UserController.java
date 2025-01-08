package fr.refquiz.controller;

import fr.refquiz.configuration.exception.ErrorResponse;
import fr.refquiz.configuration.exception.ResourceNotFoundException;
import fr.refquiz.dto.UserDto;
import fr.refquiz.service.UserService;
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
import org.springframework.validation.Validator;
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
                    responseCode = "500",
                    description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
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
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
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
            description = "Add a new user to the system",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "User data for creating a new user",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserDto.class),
                            examples = @ExampleObject(
                                    name = "Example User",
                                    summary = "An example of a valid user creation request",
                                    description = "This is an example payload for creating a new user",
                                    value = "{\n" +
                                            "  \"firstName\": \"John\",\n" +
                                            "  \"lastName\": \"Doe\",\n" +
                                            "  \"email\": \"jdoe1@example.com\",\n" +
                                            "  \"password\": \"********\",\n" +
                                            "  \"validationPassword\": \"*******\"\n" +
                                            "}"
                            )
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "User created successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserDto.class),
                            examples = @ExampleObject(
                                    name = "Example User",
                                    summary = "An example of a valid user creation request",
                                    description = "This is an example payload for creating a new user",
                                    value = "{\n" +
                                            "  \"firstName\": \"John\",\n" +
                                            "  \"lastName\": \"Doe\",\n" +
                                            "  \"email\": \"jdoe1@example.com\",\n" +
                                            "  \"password\": \"********\",\n" +
                                            "  \"validationPassword\": \"*******\"\n" +
                                            "}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid input",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Internal server error",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ErrorResponse.class)
                    )
            )
    })
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
        UserDto createdUser = userService.createUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

}
