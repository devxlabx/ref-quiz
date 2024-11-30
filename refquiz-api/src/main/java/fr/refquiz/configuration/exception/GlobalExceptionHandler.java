package fr.refquiz.configuration.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {
    /**
     * Gère les exceptions de type ResourceNotFoundException.
     * Utilisé lorsque des ressources demandées ne sont pas trouvées, comme un utilisateur ou une facture inexistante.
     *
     * @param ex L'exception lancée.
     * @return Une réponse HTTP avec le statut 404 et un message d'erreur.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                "RESOURCE_NOT_FOUND",
                ex.getMessage()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    /**
     * Gère les exceptions de type MethodArgumentNotValidException.
     * Utilisé lorsque les arguments d'une méthode (comme les données du formulaire) ne sont pas valides.
     *
     * @param ex L'exception lancée.
     * @return Une réponse HTTP avec le statut 400 et un message d'erreur détaillé concernant la validation.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getAllErrors().stream()
                .map(error -> error.getDefaultMessage())
                .reduce((message1, message2) -> message1 + "; " + message2)
                .orElse("Validation error");

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "VALIDATION_ERROR",
                "Validation failed: " + errorMessage
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * Gère les exceptions générales non prises en charge par les gestionnaires d'exceptions précédents.
     * Utilisé pour capturer les erreurs inattendues qui ne sont pas spécifiquement gérées par d'autres exceptions.
     *
     * @param ex L'exception lancée.
     * @return Une réponse HTTP avec le statut 500 et un message d'erreur générique.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "INTERNAL_SERVER_ERROR",
                "An unexpected error occurred"
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}