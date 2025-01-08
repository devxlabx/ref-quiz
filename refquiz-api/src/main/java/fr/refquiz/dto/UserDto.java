package fr.refquiz.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Data Transfer Object representing a User")
public class UserDto {

    @Schema(
            description = "Unique identifier of the user",
            example = "1",
            accessMode = Schema.AccessMode.READ_ONLY
    )
    private Long id;

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must be less than 50 characters")
    @Schema(
            description = "First name of the user",
            example = "John"
    )
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must be less than 50 characters")
    @Schema(
            description = "Last name of the user",
            example = "Doe"
    )
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Size(max = 100, message = "Email must be less than 100 characters")
    @Schema(
            description = "Email address of the user",
            example = "jdoe@example.com"
    )
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Schema(
            description = "Password for the user account",
            example = "********",
            accessMode = Schema.AccessMode.WRITE_ONLY
    )
    private String password;

    @NotBlank(message = "Validation password is required")
    @Size(min = 8, message = "Validation password must be at least 8 characters long")
    @Schema(
            description = "Validation of the password",
            example = "********",
            accessMode = Schema.AccessMode.WRITE_ONLY
    )
    private String validationPassword;

    @Schema(
            description = "Timestamp when the user was created",
            example = "2025-01-01T12:00:00",
            accessMode = Schema.AccessMode.READ_ONLY
    )
    private LocalDateTime createdAt = LocalDateTime.now();
}
