package com.springboot.ins.repository;

import org.springframework.data.jpa.repository.JpaRepository; 
import org.springframework.data.jpa.repository.Query;

import com.springboot.ins.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    @Query("SELECT a FROM Admin a WHERE a.user.username = ?1")
    Admin getAdminByUsername(String username);

    void deleteByAdminId(Long adminId);
    
}