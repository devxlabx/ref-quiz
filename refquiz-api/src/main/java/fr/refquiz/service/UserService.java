package fr.refquiz.service;

import fr.refquiz.dto.UserDto;
import fr.refquiz.model.Role;
import fr.refquiz.model.AccountStatus;
import fr.refquiz.model.User;
import fr.refquiz.repository.RoleRepository;
import fr.refquiz.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    @Value("${app.activation-url}")
    private String activationUrl;



    public void sendValidationEmail(User user) throws MessagingException {
        String activationLink = activationUrl + user.getEmailHash();
        emailService.sendEmail(
                user.getEmail(),
                user.getFirstName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationLink,
                "Activation du compte"
        );

    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    @Transactional
    public Optional<UserDto> getUserById(Long id) {
        return userRepository.findById(id).map(this::convertToDto);
    }

    public UserDto createUser(UserDto userDto) throws MessagingException {
        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new ValidationException("Role 'USER' doesn't exist"));
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new ValidationException("Email already exists");
        }
        if (userDto.getPassword() == null || userDto.getPassword().isEmpty()) {
            throw new ValidationException("Password cannot be null or empty");
        }
        if (userDto.getValidationPassword() == null || userDto.getValidationPassword().isEmpty() || !userDto.getValidationPassword().equals(userDto.getPassword())) {
            throw new ValidationException("Validation Password cannot be null or empty and should match Password");
        }
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        User user = convertToEntity(userDto);
        user.setRoles(List.of(userRole));
        user.setStatus(AccountStatus.PENDING);
        User savedUser = userRepository.save(user);
        sendValidationEmail(user);
        return convertToDto(savedUser);

    }

    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }

    private User convertToEntity(UserDto dto) {
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPassword(dto.getPassword());
        user.setEmail(dto.getEmail());
        user.setCreatedAt(LocalDateTime.now());

        return user;
    }
    public void activateAccount(String emailHash) {
        User user = userRepository.findByEmailHash(emailHash).orElseThrow(() -> new EntityNotFoundException("User with emailHash '" + emailHash + "' not found"));
        user.setStatus(AccountStatus.VALIDATED);
        userRepository.save(user);
    }
}