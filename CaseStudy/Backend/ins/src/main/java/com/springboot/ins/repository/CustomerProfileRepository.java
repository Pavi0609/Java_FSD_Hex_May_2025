package com.springboot.ins.repository;

import com.springboot.ins.model.CustomerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerProfileRepository extends JpaRepository<CustomerProfile, Long> {
	
    Optional<CustomerProfile> findByCustomerId(Long customerId);

    void deleteByCustomerId(Long customerId);
    
}