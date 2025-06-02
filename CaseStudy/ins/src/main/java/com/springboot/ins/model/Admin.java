package com.springboot.ins.model;

import jakarta.persistence.*;

@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;

    @Column(name = "admin_name")
    private String adminName;
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user; 

    // Constructors
    public Admin() {}

    public Admin(String adminName, String password, User user) {
        this.adminName = adminName;
        this.user = user;
    }

	// Getters and Setters
    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }
    
    public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}