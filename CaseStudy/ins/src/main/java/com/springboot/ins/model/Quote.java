package com.springboot.ins.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "quote")
public class Quote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quoteId;
    
    @OneToOne
    private Proposal proposal;
    
    @Column(name = "premium_amount", nullable = false)
    private BigDecimal premiumAmount;
    
    @Column(name = "generated_date", nullable = false)
    private LocalDate generatedDate;
    
    @Column(name = "validity_period", nullable = false)
    private Integer validityPeriod;
    
    // Constructors 
	public Quote() {
		super();
	}
	
	public Quote(Long quoteId, Proposal proposal, BigDecimal premiumAmount, LocalDate generatedDate,
			Integer validityPeriod) {
		super();
		this.quoteId = quoteId;
		this.proposal = proposal;
		this.premiumAmount = premiumAmount;
		this.generatedDate = generatedDate;
		this.validityPeriod = validityPeriod;
	}

	// Getters and Setters
	public Long getQuoteId() {
		return quoteId;
	}

	public void setQuoteId(Long quoteId) {
		this.quoteId = quoteId;
	}

	public Proposal getProposal() {
		return proposal;
	}

	public void setProposal(Proposal proposal) {
		this.proposal = proposal;
	}

	public BigDecimal getPremiumAmount() {
		return premiumAmount;
	}

	public void setPremiumAmount(BigDecimal premiumAmount) {
		this.premiumAmount = premiumAmount;
	}

	public LocalDate getGeneratedDate() {
		return generatedDate;
	}

	public void setGeneratedDate(LocalDate generatedDate) {
		this.generatedDate = generatedDate;
	}

	public Integer getValidityPeriod() {
		return validityPeriod;
	}

	public void setValidityPeriod(Integer validityPeriod) {
		this.validityPeriod = validityPeriod;
	}	
	
}