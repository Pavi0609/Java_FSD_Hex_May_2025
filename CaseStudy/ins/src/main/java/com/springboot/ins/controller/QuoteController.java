package com.springboot.ins.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.springboot.ins.model.Quote;  
import com.springboot.ins.service.QuoteService;

@RestController
@RequestMapping("/api/quote")
public class QuoteController {

    @Autowired
    private QuoteService quoteService;
    
    // add new quote with proposal_id
    @PostMapping("/add/proposal/{proposalId}")
    public ResponseEntity<Quote> insertQuote(@PathVariable Long proposalId,
    										 @RequestBody Quote quote) {
    	Quote created = quoteService.insertQuote(proposalId, quote);
        return ResponseEntity.ok(created);
    }
    
    // Get all quotes
    @GetMapping("/get-all")    
    public ResponseEntity<List<Quote>> getAllQuotes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<Quote> quote = quoteService.getAllQuotes(page, size);
        return ResponseEntity.ok(quote);
    }

    // Get quote by Proposal ID
    @GetMapping("/get-one/proposal/{proposalId}")
    public ResponseEntity<Quote> getQuoteByProposalId(@PathVariable Long proposalId) {
        return ResponseEntity.ok(quoteService.getQuoteByProposalId(proposalId));
    }
    
    // Get quote by ID
    @GetMapping("/get/{quoteId}")
    public ResponseEntity<Quote> getQuoteById(@PathVariable Long quoteId) {
        return ResponseEntity.ok(quoteService.getQuoteById(quoteId));
    }

    // Delete quote
    @DeleteMapping("/delete/{quoteId}")
    public ResponseEntity<Void> deleteQuote(@PathVariable Long quoteId) {
        quoteService.deleteQuote(quoteId);
        return ResponseEntity.noContent().build();
    }
	
}