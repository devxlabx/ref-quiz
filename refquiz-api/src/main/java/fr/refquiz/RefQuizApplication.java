package fr.refquiz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class RefQuizApplication {

    public static void main(String[] args) {
        SpringApplication.run(RefQuizApplication.class, args);
    }

}
