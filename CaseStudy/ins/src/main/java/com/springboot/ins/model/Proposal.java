package com.springboot.ins.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "proposal")
public class Proposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proposalId;
    
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;  
    
    @Column(name = "policy_id")
    private String policyId;
    
    @Column(name = "vehicle_type", nullable = false)
    private String vehicleType;

    @Column(name = "vehicle_model", nullable = false)
    private String vehicleModel;

    @Column(name = "registration_number", nullable = false)
    private String registrationNumber;
    
    @Column(name = "manufacture_year", nullable = false)
    private String manufactureYear;

    @Column(name = "submitted_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date submittedDate;
    
    // Constructors   
    public Proposal() {
    }
    
    public Proposal(Long proposalId, Customer customer, String policyId, String vehicleType, String vehicleModel,
            String registrationNumber, String manufactureYear, Date submittedDate) {
        this.proposalId = proposalId;
        this.customer = customer;
        this.policyId = policyId;
        this.vehicleType = vehicleType;
        this.vehicleModel = vehicleModel;
        this.registrationNumber = registrationNumber;
        this.manufactureYear = manufactureYear;
        this.submittedDate = submittedDate;
    }

    // Getters and Setters
	public Long getProposalId() {
		return proposalId;
	}

	public void setProposalId(Long proposalId) {
		this.proposalId = proposalId;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public String getPolicyId() {
		return policyId;
	}

	public void setPolicyId(String policyId) {
		this.policyId = policyId;
	}

	public String getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	public String getVehicleModel() {
		return vehicleModel;
	}

	public void setVehicleModel(String vehicleModel) {
		this.vehicleModel = vehicleModel;
	}

	public String getRegistrationNumber() {
		return registrationNumber;
	}

	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}

	public String getManufactureYear() {
		return manufactureYear;
	}

	public void setManufactureYear(String manufactureYear) {
		this.manufactureYear = manufactureYear;
	}

	public Date getSubmittedDate() {
		return submittedDate;
	}

	public void setSubmittedDate(Date submittedDate) {
		this.submittedDate = submittedDate;
	}
}