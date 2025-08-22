package com.probeco.erp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class PortalProbecoApplication {

	public static void main(String[] args) {
		// Load .env file only if present (e.g. local dev)
		Dotenv dotenv = Dotenv.configure()
			.ignoreIfMissing()
			.load();
	
		dotenv.entries().forEach(entry ->
			System.setProperty(entry.getKey(), entry.getValue())
		);
	
		SpringApplication.run(PortalProbecoApplication.class, args);
	}
	
} 