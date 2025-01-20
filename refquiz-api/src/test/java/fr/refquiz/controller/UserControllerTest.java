package fr.refquiz.controller;

import fr.refquiz.configuration.exception.ResourceNotFoundException;
import fr.refquiz.dto.UserDto;
import fr.refquiz.service.UserService;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;
    private AuthenticationController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers() {
        // Given
        UserDto user1 = new UserDto(1L, "user1", "user1@example.com", "pwd1", "vpwd1",  null, null);
        UserDto user2 = new UserDto(2L, "user2", "user2@example.com", "pwd2", "vpwd2",  null, null);
        List<UserDto> users = List.of(user1, user2);

        when(userService.getAllUsers()).thenReturn(users);

        // When
        ResponseEntity<List<UserDto>> response = userController.getAllUsers();

        // Then
        assertNotNull(response, "Response should not be null");
        assertEquals(200, response.getStatusCodeValue(), "Response status should be 200");
        assertNotNull(response.getBody(), "Response body should not be null");
        assertEquals(2, response.getBody().size(), "Response body should contain 2 users");
        verify(userService, times(1)).getAllUsers();
    }

    @Test
    void testGetUserById_UserFound() {
        // Given
        Long userId = 1L;
        UserDto user = new UserDto(userId, "user1", "user1@example.com", "pwd1", "vpwd1",  null, null);

        when(userService.getUserById(userId)).thenReturn(Optional.of(user));

        // When
        ResponseEntity<UserDto> response = userController.getUserById(userId);

        // Then
        assertNotNull(response, "Response should not be null");
        assertEquals(200, response.getStatusCodeValue(), "Response status should be 200");
        assertNotNull(response.getBody(), "Response body should not be null");
        assertEquals(userId, response.getBody().getId(), "User ID should match");
        verify(userService, times(1)).getUserById(userId);
    }

    @Test
    void testGetUserById_UserNotFound() {
        // Given
        Long userId = 1L;
        when(userService.getUserById(userId)).thenReturn(Optional.empty());

        // When
        ResourceNotFoundException exception = assertThrows(
                ResourceNotFoundException.class,
                () -> userController.getUserById(userId),
                "Expected ResourceNotFoundException to be thrown"
        );

        // Then
        assertNotNull(exception, "Exception should not be null");
        assertEquals("User not found with id: 1", exception.getMessage());
        verify(userService, times(1)).getUserById(userId);
    }


    @Test
    void testCreateUser() throws MessagingException {
        // Given
        UserDto userToCreate = new UserDto(null, "user1", "user1", "user1@example.com", "pwd1", "vpwd1", null);
        UserDto createdUser = new UserDto(1L, "user1", "user1","user1@example.com", "pwd1", "vpwd1", null);

        when(userService.createUser(any(UserDto.class))).thenReturn(createdUser);

        // When
        ResponseEntity<UserDto> response = authController.createUser(userToCreate);

        // Then
        assertNotNull(response, "Response should not be null");
        assertEquals(201, response.getStatusCodeValue(), "Response status should be 201");
        assertNotNull(response.getBody(), "Response body should not be null");
        assertEquals(createdUser.getId(), response.getBody().getId(), "Created user ID should match");
        assertEquals(createdUser.getEmail(), response.getBody().getEmail(), "Created user username should match");
        verify(userService, times(1)).createUser(any(UserDto.class));
    }
}
