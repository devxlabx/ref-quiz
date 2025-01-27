package fr.refquiz.repository;

import fr.refquiz.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    @Query(value = "SELECT * FROM users WHERE email_hash = :emailHash", nativeQuery = true)
    Optional<User> findByEmailHash(@Param("emailHash") String emailHash);
}