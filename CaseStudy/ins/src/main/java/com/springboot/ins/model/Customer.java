package com.springboot.ins.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "customer_address", nullable = false)
    private String customerAddress;
    
    @Column(name = "customer_dob")
    @Temporal(TemporalType.DATE)
    private Date customerDob;

    @Column(name = "customer_age")
    private Integer customerAge;
    
    @Column(name = "customer_aadhar_no", unique = true)
    private String customerAadharNo;

    @Column(name = "customer_pan_no", unique = true)
    private String customerPanNo;
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user; 
    
    @OneToMany(mappedBy = "customer")
    @JsonIgnoreProperties("customer")  // Prevents infinite recursion
    private List<Payment> payments;

	// Constructors
    public Customer() {
		super();
    }
    
	public Customer(Long id, String customerName, String customerAddress, Date customerDob, Integer customerAge,
			String customerAadharNo, String customerPanNo, User user) {
		this.id = id;
		this.customerName = customerName;
		this.customerAddress = customerAddress;
		this.customerDob = customerDob;
		this.customerAge = customerAge;
		this.customerAadharNo = customerAadharNo;
		this.customerPanNo = customerPanNo;
		this.user = user;
	}

    // Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerAddress() {
		return customerAddress;
	}

	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}

	public Date getCustomerDob() {
		return customerDob;
	}

	public void setCustomerDob(Date customerDob) {
		this.customerDob = customerDob;
	}

	public Integer getCustomerAge() {
		return customerAge;
	}

	public void setCustomerAge(Integer customerAge) {
		this.customerAge = customerAge;
	}

	public String getCustomerAadharNo() {
		return customerAadharNo;
	}

	public void setCustomerAadharNo(String customerAadharNo) {
		this.customerAadharNo = customerAadharNo;
	}

	public String getCustomerPanNo() {
		return customerPanNo;
	}

	public void setCustomerPanNo(String customerPanNo) {
		this.customerPanNo = customerPanNo;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public List<Payment> getPayments() {
		return payments;
	}

	public void setPayments(List<Payment> payments) {
		this.payments = payments;
	}
	
}