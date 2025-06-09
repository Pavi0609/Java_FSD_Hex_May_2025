package com.springboot.ins;

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
					.requestMatchers("/api/user/details").authenticated()
					
					// ADMIN
					.requestMatchers("/api/admin/add").permitAll() 
					.requestMatchers("/api/admin/get-all").hasAuthority("ADMIN")
					.requestMatchers("/api/admin/get-one-username").hasAuthority("ADMIN")
					.requestMatchers("/api/admin/delete/{id}").hasAuthority("ADMIN")			

					// CUSTOMER
					.requestMatchers("/api/customer/add").permitAll() 
					.requestMatchers("/api/customer/get-all").hasAnyAuthority("ADMIN")  
					.requestMatchers("/api/customer/get-one-username").hasAnyAuthority("CUSTOMER","ADMIN")	
                    .requestMatchers("/api/customer/update/{id}").permitAll()  // .hasAuthority("CUSTOMER")
					.requestMatchers("/api/customer/delete/{id}").hasAnyAuthority("CUSTOMER","ADMIN")
					
					// POLICY
					.requestMatchers("/api/policy/add").hasAuthority("ADMIN")
					.requestMatchers("/api/policy/add-batch").hasAuthority("ADMIN")  
					.requestMatchers("/api/policy/get-all").permitAll() // .hasAnyAuthority("CUSTOMER","ADMIN")
					.requestMatchers("/api/policy/get-all-dto").permitAll()
					.requestMatchers("/api/policy/get-one/{policyId}").hasAnyAuthority("CUSTOMER","ADMIN")  
					.requestMatchers("/api/policy/delete/{id}").hasAuthority("ADMIN")			

					// PROPOSAL
					.requestMatchers("/api/proposal/add/{customerId}/{policyId}").hasAuthority("CUSTOMER")
					.requestMatchers("/api/proposal/get-all").hasAuthority("ADMIN") 
					.requestMatchers("/api/proposal/get-one-username").hasAnyAuthority("CUSTOMER") 
					.requestMatchers("/api/proposal/delete/{id}").hasAnyAuthority("CUSTOMER","ADMIN")	
					.requestMatchers("/api/proposal/get-all/proposal/policy/{policyId}").hasAuthority("ADMIN") 
					
					// POLICYADDONs
					.requestMatchers("/api/policy-addons/add/policy/{policyId}").hasAuthority("ADMIN")
					.requestMatchers("/api/policy-addons/get-all").hasAuthority("ADMIN")  
					.requestMatchers("/api/policy-addons/get-one/policy/{policyId}").hasAuthority("ADMIN") 
			        .requestMatchers("/api/policy-addons/get-one/{addonId}").hasAuthority("ADMIN")  
					.requestMatchers("/api/policy-addons/delete/{addonId}").hasAuthority("ADMIN")  
					
					//QUOTE
					.requestMatchers("/api/quote/add/proposal/{proposalId}").hasAuthority("ADMIN")  
					.requestMatchers("/api/quote/get-all").hasAuthority("ADMIN")  
					.requestMatchers("/api/quote/get-addons").hasAuthority("ADMIN")  
					.requestMatchers("/api/quote/get-one/proposal/{proposalId}").hasAuthority("ADMIN")  
					.requestMatchers("/api/quote/get/{quoteId}").hasAuthority("ADMIN")  
					.requestMatchers("/api/quote/delete/{quoteId}").hasAuthority("ADMIN")  
					
					//PAYMENT
					.requestMatchers("/api/payment/add/customer/{customerId}/quote/{quoteId}").hasAuthority("CUSTOMER")  
					.requestMatchers("/api/payment/get-all").hasAuthority("ADMIN")  
					.requestMatchers("/api/payment/get-one/customer/{customerId}").hasAnyAuthority("CUSTOMER","ADMIN") 
					.requestMatchers("/api/payment/get-one/quote/{quoteId}").hasAnyAuthority("CUSTOMER","ADMIN")
					.requestMatchers("/api/payment/get-one/{paymentId}").hasAnyAuthority("CUSTOMER","ADMIN")
					.requestMatchers("/api/payment/delete/{paymentId}").hasAnyAuthority("CUSTOMER","ADMIN") 
					
					//CLAIM
					.requestMatchers("/api/claim/add/customer/{customerId}/policy/{policyId}").hasAuthority("CUSTOMER")  
					.requestMatchers("/api/claim/get-all").hasAuthority("ADMIN")  
					.requestMatchers("/api/claim/get-all/customer/{customerId}").hasAuthority("ADMIN") 
					.requestMatchers("/api/claim/get-all/policy/{policyId}").hasAuthority("ADMIN")
					.requestMatchers("/api/claim/get-one/{claimId}").hasAnyAuthority("CUSTOMER","ADMIN")
					.requestMatchers("/api/claim/delete/{claimId}").hasAnyAuthority("CUSTOMER","ADMIN") 

					//DOCUMENT
					.requestMatchers("/api/document/add/{proposalId}").hasAuthority("CUSTOMER")
					.requestMatchers("/api/document/get-all").hasAuthority("ADMIN") 
					.requestMatchers("/api/document/delete/{documentId}").hasAuthority("CUSTOMER")
					
					// REVIEW
					.requestMatchers("/api/review/add/{customerId}/{policyId}").hasAuthority("CUSTOMER")
					.requestMatchers("/api/review/get-all/rating").permitAll()
					
					
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