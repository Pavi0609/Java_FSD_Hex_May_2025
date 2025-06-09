package com.springboot.hospital;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration //<- This ensures that this class gets called during every API call
public class SecurityConfig {
	
    @Autowired
    private JwtFilter jwtFilter; 
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.csrf((csrf) -> csrf.disable()) 
			.authorizeHttpRequests(authorize -> authorize
					
					// USER
					.requestMatchers("/api/user/signup").permitAll()
					.requestMatchers("/api/user/token").authenticated()
					
					// DOCTOR
					.requestMatchers("/api/doctor/add").hasAuthority("DOCTOR")
					.requestMatchers("/api/admin/get-all").hasAuthority("DOCTOR")
					
					//PATIENT
					.requestMatchers("/api/patient/add-with-history").hasAuthority("PATIENT")
					.requestMatchers("/api/patient/get/doctor/{doctorId}").hasAuthority("DOCTOR")
					.requestMatchers("/api/patient/get/{patientId}").hasAnyAuthority("PATIENT","DOCTOR")
					.requestMatchers("/api/patient/get/{id}/with-history").hasAuthority("DOCTOR")				
					.requestMatchers("/api/patient/get-all").hasAuthority("DOCTOR")

					// MEDICALHISTORY
					.requestMatchers("/api/medical-history/add").hasAuthority("PATIENT")
					.requestMatchers("/api/medical-history/get-all").hasAuthority("DOCTOR")
					.requestMatchers("/api/medical-history/get/{id}").hasAnyAuthority("PATIENT","DOCTOR") 
					.requestMatchers("/api/medical-history/get-by-patient/{patientId}").hasAuthority("DOCTOR")
					.requestMatchers("/api/medical-history/add-entity").hasAuthority("DOCTOR")

					
					.anyRequest().authenticated()  
			)
			
		 .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class) 
		 .httpBasic(Customizer.withDefaults()); //<- this activated http basic technique
		return http.build();
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {  //<- Bean saves this object in spring's context
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	AuthenticationManager getAuthManager(AuthenticationConfiguration auth) 
			throws Exception {
		  return auth.getAuthenticationManager();
	 }
}