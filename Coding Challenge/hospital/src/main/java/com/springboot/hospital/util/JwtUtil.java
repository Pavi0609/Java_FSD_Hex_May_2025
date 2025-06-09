package com.springboot.hospital.util;

import java.security.Key; 
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

 @Component
public class JwtUtil {
	
	private static final String secretKey = "HOSPITAL_HEX_MAY_78090679090990674890909";
	private static final long expirationTimeInMills=43200000; //12 hrs 
	
	private Key getSigningKey(){
		return Keys.hmacShaKeyFor(secretKey.getBytes());
	}
	// Method to Generate JWT Token
	public String createToken(String email){
		 
		return Jwts.builder()
	                .setSubject(email)
	                .setIssuedAt(new Date(System.currentTimeMillis()))
	                .setExpiration(new Date(System.currentTimeMillis() + expirationTimeInMills)) 
	                .signWith(getSigningKey(),SignatureAlgorithm.HS256)
	                .compact();
		}
	
	// Method to Verify JWT Token 
	public boolean verifyToken(String token, String email) {
		String extractedEmail = Jwts.parserBuilder()
									.setSigningKey(getSigningKey())
									 .build()
									 .parseClaimsJws(token)
									 .getBody()
									 .getSubject(); 
		Date expirationDate = Jwts.parserBuilder()
									.setSigningKey(getSigningKey())
									 .build()
									 .parseClaimsJws(token)
									 .getBody()
									 .getExpiration(); 
		 
		return extractedEmail.equals(email) && new Date().before(expirationDate); 			
	}
	
	public String extractUsername(String token) {
		 
		return  Jwts.parserBuilder()
				.setSigningKey(getSigningKey())
				 .build()
				 .parseClaimsJws(token)
				 .getBody()
				 .getSubject(); 
	}
	   
}