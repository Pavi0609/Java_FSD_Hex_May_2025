package com.springboot.ins.repository;

import org.springframework.data.jpa.repository.JpaRepository; 
import org.springframework.data.jpa.repository.Query;

import com.springboot.ins.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{

	@Query("SELECT u FROM User u WHERE u.username = ?1")
	User getByUsername(String username);

	@Query("SELECT u FROM User u WHERE u.username = ?1")
	Object findByUsername(String username);
	
}