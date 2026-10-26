
package com.eshuecas.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LasHuecasApplication {

    public static void main(String[] args) {
        SpringApplication.run(
                LasHuecasApplication.class,
                args
        );
    }
}
