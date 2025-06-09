package com.springboot.ins.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "review")
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reviewId; 
	
	@Column(length = 1000)
	private String comment; 
	
	private String rating;
	
    @ManyToOne
    private Proposal proposal;
    
    // Constructors
	public Review() {
		super();
	}

	public Review(int reviewId, String comment, String rating, Proposal proposal) {
		super();
		this.reviewId = reviewId;
		this.comment = comment;
		this.rating = rating;
		this.proposal = proposal;
	}

	// Getters and Setters
	public int getReviewId() {
		return reviewId;
	}

	public void setReviewId(int reviewId) {
		this.reviewId = reviewId;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public Proposal getProposal() {
		return proposal;
	}

	public void setProposal(Proposal proposal) {
		this.proposal = proposal;
	}
	
}