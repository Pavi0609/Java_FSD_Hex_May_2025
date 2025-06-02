package com.springboot.ins.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.ins.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
    @Query("SELECT c FROM Customer c WHERE c.user.username = ?1")
    Customer getCustomerByUsername(String username);

}