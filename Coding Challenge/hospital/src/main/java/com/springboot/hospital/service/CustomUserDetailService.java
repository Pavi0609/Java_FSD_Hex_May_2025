package com.springboot.hospital.service;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.springboot.hospital.model.User;
import com.springboot.hospital.repository.UserRepository;

@Service
public class CustomUserDetailService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.getByUsername(username);
		SimpleGrantedAuthority sga = new SimpleGrantedAuthority(user.getRole()); 
		List<GrantedAuthority> list = List.of(sga);
		org.springframework.security.core.userdetails.User springuser = 
			new org.springframework.security.core.userdetails.User
				(user.getUsername(), 
				 user.getPassword(), 
				 list);
		
		return springuser;
	}
	
}