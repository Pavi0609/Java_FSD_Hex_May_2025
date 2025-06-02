package com.springboot.ins.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.ins.model.Admin;
import com.springboot.ins.model.User;
import com.springboot.ins.repository.AdminRepository;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserService userService;

    public AdminService(AdminRepository adminRepository, UserService userService) {
        this.adminRepository = adminRepository;
        this.userService = userService;
    }

    // Insert new admin with user and role
    public Admin insertAdmin(Admin admin) {

        // Extract user from admin
        User user = admin.getUser();

        // Assign role
        user.setRole("ADMIN");

        // Save user
        User savedUser = userService.signUp(user);

        // Attach user back to admin
        admin.setUser(savedUser);

        // Save admin to DB
        return adminRepository.save(admin);
    }

    // Create new admin
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Get all admins
    public List<Admin> getAll() {
        return adminRepository.findAll();
    }

    // Get admin by ID
    public Admin getAdminById(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin ID not found: " + id));
    }

    // Get admin by username
    public Admin getAdminByUsername(String username) {
        return adminRepository.getAdminByUsername(username);
    }
}