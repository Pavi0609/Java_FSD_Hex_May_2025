package com.springboot.ins.controller;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = {"http://localhost:5174", "https://localhost:5174"}) 
public class ReviewController {

	@Autowired
	private ReviewService reviewService;
	
	// add new review by customerId & policyId
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
	
    // get all reviews
    @GetMapping("/get-all")
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }
    
}