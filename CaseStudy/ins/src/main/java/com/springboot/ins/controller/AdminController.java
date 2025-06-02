package com.springboot.ins.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springboot.ins.model.Admin;
import com.springboot.ins.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Add new admin
    @PostMapping("/add")
    public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin) {
        Admin saved = adminService.insertAdmin(admin);
        return ResponseEntity.ok(saved);
    }

    // Get all admins
    @GetMapping("/get-all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(adminService.getAll());
    }

    // Get admin by ID
    @GetMapping("/get-one/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable Long id) {
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(adminService.getAdminById(id));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    // Get admin by username (logged-in user)
    @GetMapping("/get-one-username")
    public Admin getAdminByUsername(Principal principal) {
        String username = principal.getName();
        return adminService.getAdminByUsername(username);
    }
}