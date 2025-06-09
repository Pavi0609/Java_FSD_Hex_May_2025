package com.springboot.ins.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.ins.exception.ResourceNotFoundException;
import com.springboot.ins.model.Proposal;
import com.springboot.ins.model.Review;
import com.springboot.ins.repository.ProposalRepository;
import com.springboot.ins.repository.ReviewRepository;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository reviewRepository;
	private ProposalRepository proposalRepository;

	public ReviewService(ReviewRepository reviewRepository, ProposalRepository proposalRepository) {
		super();
		this.reviewRepository = reviewRepository;
		this.proposalRepository = proposalRepository;
	}

	// add new review 
	public Review insertReview(Long customerId, Long policyId, Review review) {
		Proposal proposal = proposalRepository.findById(customerId, policyId)
				.orElseThrow(() -> new ResourceNotFoundException("Proposal not found"));

		// Attach Proposal in review
		review.setProposal(proposal);

		// Add review in DB
		return reviewRepository.save(review);
	}

	// get reviews by rating
	public List<Review> getReviewByRating(String rating) {
		return reviewRepository.getByRating(rating);
	}
}