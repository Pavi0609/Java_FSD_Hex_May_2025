package com.springboot.ins.service;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service;

import com.springboot.ins.model.Admin;
import com.springboot.ins.model.User;
import com.springboot.ins.repository.AdminRepository;

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

    // add new admin 
    public Admin addAdmin(Admin admin) {

        // Extract user from admin
        User user = admin.getUser();

        // Assign role
        user.setRole("ADMIN");

        // Save user in DB
		user = userService.signUp(user);

        // Attach user back to admin
        admin.setUser(user);

        // Save admin to DB
        return adminRepository.save(admin);
    }
    
    // Get all admins
    public List<Admin> getAll() {
        return adminRepository.findAll();
    }
    
    // get admin by id (using token)
	public Admin getAdminByUsername(String username) {
		return adminRepository.getAdminByUsername(username);
	}
	
	// delete customer by id
	public void deleteByAdminId(Long adminId) {
		adminRepository.deleteByAdminId(adminId);
	}
    
}