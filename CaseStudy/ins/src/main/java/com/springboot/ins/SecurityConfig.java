package com.springboot.ins;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration //<- This ensures that this class gets called during every API call
public class SecurityConfig {
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.csrf((csrf) -> csrf.disable()) 
			.authorizeHttpRequests(authorize -> authorize
					.requestMatchers("/api/user/signup").permitAll()
					
					.requestMatchers("/api/customer/add").permitAll()
					.requestMatchers("/api/customer/get-all").permitAll()
					.requestMatchers("/api/customer/get-one/{id}").permitAll()
					.requestMatchers("/api/customer/get-one-username/{id}").hasAuthority("CUSTOMER")
					
					.requestMatchers("/api/admin/add").permitAll()
					
					.requestMatchers("/api/policy/add").hasAnyAuthority("ADMIN")
					
					.requestMatchers("/api/proposal/add").hasAnyAuthority("CUSTOMER")
					
					.anyRequest().authenticated()  
			)
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