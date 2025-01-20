package fr.refquiz.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.security.auth.Subject;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails, Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String uuid = UUID.randomUUID().toString();

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, unique = true, length = 50)
    private boolean status = false;
 
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"
            )
    )
    private List<Role> roles;

    @Column(name = "creation_date", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "last_connexion")
    private LocalDateTime lastLoginAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public String getPassword() {
        return password;
    }


    /**
     * Returns the name of this {@code Principal}.
     *
     * @return the name of this {@code Principal}.
     */
    @Override
    public String getName() {
        return firstName + " " + lastName;
    }

    /**
     * Returns {@code true} if the specified subject is implied by this
     * {@code Principal}.
     *
     * @param subject the {@code Subject}
     * @return {@code true} if {@code subject} is non-null and is
     * implied by this {@code Principal}, or false otherwise.
     * @implSpec The default implementation of this method returns {@code true} if
     * {@code subject} is non-null and contains at least one
     * {@code Principal} that is equal to this {@code Principal}.
     *
     * <p>Subclasses may override this with a different implementation, if
     * necessary.
     * @since 1.8
     */
    @Override
    public boolean implies(Subject subject) {
        return Principal.super.implies(subject);
    }
}
