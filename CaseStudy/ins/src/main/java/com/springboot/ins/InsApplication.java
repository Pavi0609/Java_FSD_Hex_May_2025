package com.springboot.ins;

import org.springframework.boot.SpringApplication; 
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication //(exclude = SecurityAutoConfiguration.class)
public class InsApplication {

	public static void main(String[] args) {
		SpringApplication.run(InsApplication.class, args);
	}

}