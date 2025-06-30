package com.springboot.ins.repository;

import com.springboot.ins.model.Document; 

import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Integer> {
	
}