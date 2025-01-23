package fr.refquiz.dto;

import fr.refquiz.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

        private String firstName;
        private String lastName;
        private String email;
        private LocalDateTime createdAt;
        private List<Role> roles ;


}
