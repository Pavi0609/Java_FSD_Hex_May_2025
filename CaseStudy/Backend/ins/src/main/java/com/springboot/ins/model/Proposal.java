package com.springboot.ins.model;

import java.util.Date; 

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "proposal")
public class Proposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proposalId;
    
    @ManyToOne
    private Customer customer;
    
    @ManyToOne
    private Policy policy;
    
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
    
    @Column(name = "proposal_status")
    private boolean proposalStatus;
    
    // Constructors   
    public Proposal() {
    }

    public Proposal(Long proposalId, Customer customer, Policy policy, String vehicleType, String vehicleModel,
            String registrationNumber, String manufactureYear, Date submittedDate, boolean proposalStatus) {
        super();
        this.proposalId = proposalId;
        this.customer = customer;
        this.policy = policy;
        this.vehicleType = vehicleType;
        this.vehicleModel = vehicleModel;
        this.registrationNumber = registrationNumber;
        this.manufactureYear = manufactureYear;
        this.submittedDate = submittedDate;
        this.proposalStatus = proposalStatus;
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

    public Policy getPolicy() {
        return policy;
    }

    public void setPolicy(Policy policy) {
        this.policy = policy;
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

    public boolean isProposalStatus() {
        return proposalStatus;
    }

    public void setProposalStatus(boolean proposalStatus) {
        this.proposalStatus = proposalStatus;
    }
}