package fr.refquiz.controller;


import fr.refquiz.dto.UserDto;
import fr.refquiz.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers() {
        // Given
        UserDto user1 = new UserDto(1L, "user1", "user1@example.com", "USER", "pwd", null, null);
        UserDto user2 = new UserDto(2L, "user2", "user2@example.com", "USER", "pwd2", null, null);
        List<UserDto> users = Arrays.asList(user1, user2);

        when(userService.getAllUsers()).thenReturn(users);

        // When
        ResponseEntity<List<UserDto>> response = userController.getAllUsers();

        // Then
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
        verify(userService, times(1)).getAllUsers();
    }

    @Test
    void testGetUserById_UserFound() {
        // Given
        Long userId = 1L;
        UserDto user = new UserDto(userId, "user1", "user1@example.com", "USER", "pwd", null, null);

        when(userService.getUserById(userId)).thenReturn(Optional.of(user));

        // When
        ResponseEntity<UserDto> response = userController.getUserById(userId);

        // Then
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(userId, response.getBody().getId());
        verify(userService, times(1)).getUserById(userId);
    }



    @Test
    void testCreateUser() {
        // Given
        UserDto userToCreate = new UserDto(null, "user1", "user1@example.com", "USER", "pwd", null, null);
        UserDto createdUser = new UserDto(1L, "user1", "user1@example.com", "USER", "pwd2", null, null);

        when(userService.createUser(any(UserDto.class))).thenReturn(createdUser);

        // When
        ResponseEntity<UserDto> response = userController.createUser(userToCreate);

        // Then
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(createdUser.getId(), response.getBody().getId());
        assertEquals(createdUser.getUsername(), response.getBody().getUsername());
        verify(userService, times(1)).createUser(any(UserDto.class));
    }
}