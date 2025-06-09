package com.springboot.ins.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.ins.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer>{
	
	@Query("SELECT r FROM Review r WHERE r.rating > ?1")
	List<Review> getByRating(String rating);
	
}