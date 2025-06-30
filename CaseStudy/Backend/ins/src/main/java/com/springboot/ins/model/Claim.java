package com.springboot.ins.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "claims")
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer claimId;
    
    @ManyToOne
    private Proposal proposal;

    @ManyToOne
    private Customer customer;
    
    @Column(name = "incident_description", nullable = false)
    private String incidentDescription;
    
    @Column(name = "claim_date", nullable = false)
    private LocalDate claimDate;
    
    @Column(name = "settlement_amount", nullable = false)
    private BigDecimal settlementAmount;
    
    @Column(name = "claim_status")
    private boolean claimStatus;

    // Constructors 
    public Claim() {
        super();
    }

    public Claim(Integer claimId, Proposal proposal, Customer customer, String incidentDescription, 
                LocalDate claimDate, BigDecimal settlementAmount, boolean claimStatus) {
        super();
        this.claimId = claimId;
        this.proposal = proposal;
        this.customer = customer;
        this.incidentDescription = incidentDescription;
        this.claimDate = claimDate;
        this.settlementAmount = settlementAmount;
        this.claimStatus = claimStatus;
    }

    // Getters and Setters
    public Integer getClaimId() {
        return claimId;
    }

    public void setClaimId(Integer claimId) {
        this.claimId = claimId;
    }

    public Proposal getProposal() {
        return proposal;
    }

    public void setProposal(Proposal proposal) {
        this.proposal = proposal;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getIncidentDescription() {
        return incidentDescription;
    }

    public void setIncidentDescription(String incidentDescription) {
        this.incidentDescription = incidentDescription;
    }

    public LocalDate getClaimDate() {
        return claimDate;
    }

    public void setClaimDate(LocalDate claimDate) {
        this.claimDate = claimDate;
    }

    public BigDecimal getSettlementAmount() {
        return settlementAmount;
    }

    public void setSettlementAmount(BigDecimal settlementAmount) {
        this.settlementAmount = settlementAmount;
    }
    
    public boolean isClaimStatus() {
        return claimStatus;
    }

    public void setClaimStatus(boolean claimStatus) {
        this.claimStatus = claimStatus;
    }
    
}