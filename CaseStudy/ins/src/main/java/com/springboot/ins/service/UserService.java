package com.springboot.ins.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.ins.model.Admin;
import com.springboot.ins.model.Customer;
import com.springboot.ins.model.User;
import com.springboot.ins.repository.AdminRepository;
import com.springboot.ins.repository.CustomerRepository;
import com.springboot.ins.repository.UserRepository;

@Service
public class UserService {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private CustomerRepository customerRepository;
	private AdminRepository adminRepository;
	
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomerRepository customerRepository, AdminRepository adminRepository) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.customerRepository = customerRepository;
		this.adminRepository = adminRepository;
	}

	// add new user (CUSTOMER/ADMIN) with username & password
	public User signUp(User user) {
		String plainPassword = user.getPassword(); 
		String encodedPassword =  passwordEncoder.encode(plainPassword);
		user.setPassword(encodedPassword); 
		
		return userRepository.save(user);
	}
	
	// get user details
	public Object getUserInfo(String username) {
		Object user = userRepository.findByUsername(username);
		switch (((User) user).getRole().toUpperCase()) {
			case "CUSTOMER":
				Customer customer = customerRepository.getCustomerByUsername(username);
				return customer;
			case "ADMIN":
				Admin admin = adminRepository.getAdminByUsername(username);
					return admin;
			default:
				return null;
		}

	}

}