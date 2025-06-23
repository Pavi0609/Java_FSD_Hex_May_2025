package com.springboot.ins.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.ins.model.User;
import com.springboot.ins.service.UserService;
import com.springboot.ins.util.JwtUtil;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:5174", "https://localhost:5174"}) 
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	// add new user (CUSTOMER/ADMIN) with username & password
	@PostMapping("/signup")
	public User signUp(@RequestBody User user ) {
		return userService.signUp(user);
	}
	
	// get user (CUSTOMER/ADMIN) with username & password and generate token
	@GetMapping("/token")
	public ResponseEntity<?> getToken(Principal principal) {
		try {
			String token = jwtUtil.createToken(principal.getName());
			Map<String, Object> map = new HashMap<>();
			map.put("token", token);
			return ResponseEntity.status(HttpStatus.OK).body(map);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
	}
	
	// get user details
	@GetMapping("/details")
	public Object getLoggedInUserDetails(Principal principal) {
		String username = principal.getName(); // loggedIn username
		Object object = userService.getUserInfo(username);
		return object;
	}

}