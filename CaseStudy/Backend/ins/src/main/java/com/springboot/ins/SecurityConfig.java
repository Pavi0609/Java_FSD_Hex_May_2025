package com.springboot.ins;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
					
					.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // pre-flight
					
					// USER
					.requestMatchers("/api/user/signup").permitAll()      
					.requestMatchers("/api/user/token").authenticated()   
					.requestMatchers("/api/user/details").authenticated() 
					
					// CUSTOMER PROFILE
					.requestMatchers("/api/customer/profile/upload/{customerId}").hasAnyAuthority("CUSTOMER", "ADMIN")
					.requestMatchers("/api/customer/profile/get/{customerId}").hasAnyAuthority("CUSTOMER", "ADMIN")
					
					// ADMIN
					.requestMatchers("/api/admin/add").permitAll() 
					.requestMatchers("/api/admin/get-all").hasAuthority("ADMIN")
					.requestMatchers("/api/admin/get-one-username").hasAuthority("ADMIN") 
					.requestMatchers("/api/admin/delete/{id}").hasAuthority("ADMIN")			

					// CUSTOMER
					.requestMatchers("/api/customer/add").permitAll() 
					.requestMatchers("/api/customer/get-all").hasAnyAuthority("ADMIN") 
					.requestMatchers("/api/customer/get-all-dto").permitAll()    
					.requestMatchers("/api/customer/get-one-username").hasAnyAuthority("CUSTOMER","ADMIN")	
                    .requestMatchers("/api/customer/update/{id}").hasAuthority("CUSTOMER") // .permitAll()  
					.requestMatchers("/api/customer/delete/{id}").hasAnyAuthority("CUSTOMER","ADMIN")
					
					// POLICY
					.requestMatchers("/api/policy/add").hasAuthority("ADMIN")                              
					.requestMatchers("/api/policy/add-batch").hasAuthority("ADMIN")  
					.requestMatchers("/api/policy/get-all").permitAll()                                    
					.requestMatchers("/api/policy/get-all-dto").permitAll()
					.requestMatchers("/api/policy/get-one/{policyId}").permitAll()
					.requestMatchers("/api/policy/delete/{policyId}").hasAuthority("ADMIN")			

					// PROPOSAL
					.requestMatchers("/api/proposal/add/{customerId}/{policyId}").hasAuthority("CUSTOMER")     
					.requestMatchers("/api/proposal/get-all").hasAuthority("ADMIN")                            
					.requestMatchers("/api/proposal/get-one-cusotmer").hasAnyAuthority("CUSTOMER") 
					.requestMatchers("/api/proposal/delete/{id}").hasAnyAuthority("CUSTOMER","ADMIN")	
					.requestMatchers("/api/proposal/get-all/proposal/policy/{policyId}").hasAuthority("ADMIN")    
					.requestMatchers("/api/proposal/update-status/{proposalId}").hasAuthority("ADMIN")    
					
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
					.requestMatchers("/api/quote/get-one/proposal/{proposalId}").hasAnyAuthority("CUSTOMER","ADMIN")  
					.requestMatchers("/api/quote/get/{quoteId}").hasAuthority("ADMIN")  
					.requestMatchers("/api/quote/delete/{quoteId}").hasAuthority("ADMIN")  
					
					//PAYMENT
					.requestMatchers("/api/payments_new/add/customer/{customerId}").hasAuthority("CUSTOMER")  
					.requestMatchers("/api/payments_new/get-all").hasAuthority("ADMIN")  
					.requestMatchers("/api/payments_new/get-one/customer/{customerId}").hasAnyAuthority("CUSTOMER","ADMIN") 
					.requestMatchers("/api/payments_new/get-one/quote/{quoteId}").hasAnyAuthority("CUSTOMER","ADMIN")
					.requestMatchers("/api/payments_new/get-one/{paymentId}").hasAnyAuthority("CUSTOMER","ADMIN")
					.requestMatchers("/api/payments_new/delete/{paymentId}").hasAnyAuthority("CUSTOMER","ADMIN") 
					
					//CLAIM
					.requestMatchers("/api/claims/add/customer/{customerId}/proposal/{proposalId}").hasAuthority("CUSTOMER")   
					.requestMatchers("/api/claims/get-all").hasAuthority("ADMIN")                                        
					.requestMatchers("/api/claims/get-one-cusotmer").hasAuthority("CUSTOMER") 
					.requestMatchers("/api/claims/get-all/proposal/{proposalId}").hasAnyAuthority("CUSTOMER","ADMIN") //.hasAuthority("ADMIN")
					.requestMatchers("/api/claims/get-one/{claimId}").hasAnyAuthority("CUSTOMER","ADMIN")
					.requestMatchers("/api/claims/delete/{claimId}").hasAnyAuthority("CUSTOMER","ADMIN") 
					.requestMatchers("/api/claims/update-status/{claimId}").hasAuthority("ADMIN") 

					//DOCUMENT
					.requestMatchers("/api/document/add/{proposalId}").hasAuthority("CUSTOMER")
					.requestMatchers("/api/document/get-all").hasAuthority("ADMIN") 
					.requestMatchers("/api/document/delete/{documentId}").hasAuthority("CUSTOMER")
					
					// REVIEW
					.requestMatchers("/api/review/add/{customerId}/{policyId}").hasAuthority("CUSTOMER") 
					.requestMatchers("/api/review/get-all/rating").permitAll()
					.requestMatchers("/api/review/get-all").permitAll()                                  

					
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