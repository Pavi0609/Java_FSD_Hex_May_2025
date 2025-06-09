package com.springboot.ins.controller;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.ins.model.Review;
import com.springboot.ins.service.ReviewService;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;
	
	// add new review 
	@PostMapping("/add/{customerId}/{policyId}")
	public Review insertReview(@PathVariable Long customerId, 
						       @PathVariable Long policyId, 
						       @RequestBody Review review) {
		return reviewService.insertReview(customerId, policyId, review);
	}
	
	// get reviews by rating
	@GetMapping("/get-all/rating")
	public List<Review> getReviewByRating(@RequestParam String rating) {
		return reviewService.getReviewByRating(rating);
	}
}