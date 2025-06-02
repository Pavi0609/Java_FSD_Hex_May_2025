package com.springboot.ins.model;

import jakarta.persistence.*;
import java.util.Date;

import com.springboot.ins.enums.PolicyStatus;

@Entity
@Table(name = "policy")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "policy_id")
    private Long policyId;

    @Column(name = "policy_name", nullable = false)
    private String policyName;

    @Column(name = "premium_amount", nullable = false)
    private Double premiumAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "policy_status", nullable = false)
    private PolicyStatus policyStatus;

    @Column(name = "start_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date endDate;
    
  //   @OneToOne
  //   @JoinColumn(name = "user_id")
  //   private User user; 
    
    // Constructors
    public Policy() {
    }
    
	public Policy(Long policyId, String policyName, Double premiumAmount, PolicyStatus policyStatus, Date startDate, Date endDate) {

		this.policyId = policyId;
		this.policyName = policyName;
		this.premiumAmount = premiumAmount;
		this.policyStatus = policyStatus;
		this.startDate = startDate;
		this.endDate = endDate;
	}

	// Getters and Setters
	public Long getPolicyId() {
		return policyId;
	}

	public void setPolicyId(Long policyId) {
		this.policyId = policyId;
	}

	public String getPolicyName() {
		return policyName;
	}

	public void setPolicyName(String policyName) {
		this.policyName = policyName;
	}

	public Double getPremiumAmount() {
		return premiumAmount;
	}

	public void setPremiumAmount(Double premiumAmount) {
		this.premiumAmount = premiumAmount;
	}

	public PolicyStatus getPolicyStatus() {
		return policyStatus;
	}

	public void setPolicyStatus(PolicyStatus policyStatus) {
		this.policyStatus = policyStatus;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
}