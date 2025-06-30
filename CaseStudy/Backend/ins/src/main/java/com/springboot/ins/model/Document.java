package com.springboot.ins.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "document")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer documentId;
    
    @OneToOne
    private Proposal proposal;
    
    @Column(name = "document_name", nullable = false)
    private String documentName;
    
    @Column(name = "document_type", nullable = false)
    private String documentType;
    
    @Column(name = "upload_date", nullable = false)
    private LocalDate uploadDate;
    
    // Constructors 
	public Document() {
		super();
	}
	
	public Document(Integer documentId, Proposal proposal, String documentName, String documentType, LocalDate uploadDate) {
		this.documentId = documentId;
		this.proposal = proposal;
		this.documentName = documentName;
		this.documentType = documentType;
		this.uploadDate = uploadDate;
	}

	// Getters and Setters
	public Integer getDocumentId() {
		return documentId;
	}

	public void setDocumentId(Integer documentId) {
		this.documentId = documentId;
	}

	public Proposal getProposal() {
		return proposal;
	}

	public void setProposal(Proposal proposal) {
		this.proposal = proposal;
	}

	public String getDocumentName() {
		return documentName;
	}

	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}

	public String getDocumentType() {
		return documentType;
	}

	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}

	public LocalDate getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(LocalDate uploadDate) {
		this.uploadDate = uploadDate;
	}
	
}