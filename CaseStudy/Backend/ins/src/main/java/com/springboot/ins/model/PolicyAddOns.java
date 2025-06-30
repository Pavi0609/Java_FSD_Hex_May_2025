package com.springboot.ins.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "policy_addOns")
public class PolicyAddOns {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer addonId;
    
    @ManyToOne
    private Policy policy;

    @Column(name = "addo_name", nullable = false)
    private String addonName;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "additional_premium", nullable = false)
    private BigDecimal additionalPremium;

    // Constructors
	public PolicyAddOns() {
		super();
	}
	
	public PolicyAddOns(Integer addonId, Policy policy, String addonName, String description, BigDecimal additionalPremium) {
		this.addonId = addonId;
		this.policy = policy;
		this.addonName = addonName;
		this.description = description;
		this.additionalPremium = additionalPremium;
	}

    // Getters and Setters
	public Integer getAddonId() {
		return addonId;
	}

	public void setAddonId(Integer addonId) {
		this.addonId = addonId;
	}

	public Policy getPolicy() {
		return policy;
	}

	public void setPolicy(Policy policy) {
		this.policy = policy;
	}

	public String getAddonName() {
		return addonName;
	}

	public void setAddonName(String addonName) {
		this.addonName = addonName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getAdditionalPremium() {
		return additionalPremium;
	}

	public void setAdditionalPremium(BigDecimal additionalPremium) {
		this.additionalPremium = additionalPremium;
	}
    
}