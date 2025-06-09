package com.springboot.ins.controller;

import java.security.Principal; 

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.ins.model.Admin;
import com.springboot.ins.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Add new admin
 	@PostMapping("/add")
	public Admin addAdmin(@RequestBody Admin admin) {
		return adminService.addAdmin(admin);
	}

    // get all admins
    @GetMapping("/get-all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(adminService.getAll());
    }
    
    // get admin by id (using token)
    @GetMapping("/get-one-username")
    public Admin getAdminByUsername(Principal principal) {
    	String username = principal.getName(); 
    	return adminService.getAdminByUsername(username) ;
    } 
    
    // delete customer by id
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteByAdminId(@PathVariable Long adminId) {
        adminService.deleteByAdminId(adminId);
        return ResponseEntity
        		.status(HttpStatus.OK)
        		.body("Admin deleted");
    }
 	
}