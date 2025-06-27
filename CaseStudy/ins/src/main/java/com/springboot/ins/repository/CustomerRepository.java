package com.springboot.ins.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository; 
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.ins.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
    @Query("SELECT c FROM Customer c WHERE c.user.username = ?1")
    Customer getCustomerByUsername(String username);

    @Query("DELETE FROM Customer c WHERE c.id = ?1")
	void deleteCustomerById(Long id);
    
    @Query("SELECT c FROM Customer c WHERE c.user.username = :username")
    Optional<Customer> findByUsername(@Param("username") String username);
	
}