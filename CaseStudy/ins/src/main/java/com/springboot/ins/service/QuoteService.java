package com.springboot.ins.service;

import java.time.LocalDate; 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.springboot.ins.exception.ProposalNotFoundException;
import com.springboot.ins.exception.QuoteNotFoundException;
import com.springboot.ins.model.Proposal;
import com.springboot.ins.model.Quote;
import com.springboot.ins.repository.ProposalRepository;
import com.springboot.ins.repository.QuoteRepository;

@Service
public class QuoteService {

    @Autowired
    private QuoteRepository quoteRepository;

    @Autowired
    private ProposalRepository proposalRepository;

    public QuoteService(QuoteRepository quoteRepository, ProposalRepository proposalRepository) {
		super();
		this.quoteRepository = quoteRepository;
		this.proposalRepository = proposalRepository;
	}

	// add new quote by proposal ID
    public Quote insertQuote(Long proposalId, Quote quote) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ProposalNotFoundException("Proposal not found with ID: " + proposalId));

        quote.setProposal(proposal);
        quote.setGeneratedDate(LocalDate.now()); 

        return quoteRepository.save(quote);
    }

    // Get all quotes
    public List<Quote> getAllQuotes(int page, int size) {
    	
        // Activate Pageable Interface 
        Pageable pageable = PageRequest.of(page, size);
        
        // Call findAll inbuilt method as pass this pageable interface ref 
        return quoteRepository.findAll(pageable).getContent();
    }

    // Get quote by proposal ID
    public Quote getQuoteByProposalId(Long proposalId) {
        return quoteRepository.findByProposalProposalId(proposalId)
                .orElseThrow(() -> new QuoteNotFoundException("Quote not found for proposal ID: " + proposalId));
    }
    
    // Get quote by ID
    public Quote getQuoteById(Long quoteId) {
        return quoteRepository.findById(quoteId)
                .orElseThrow(() -> new QuoteNotFoundException("Quote not found with ID: " + quoteId));
    }

    // Delete quote
    public void deleteQuote(Long quoteId) {
        if (!quoteRepository.existsById(quoteId)) {
            throw new QuoteNotFoundException("Quote not found with ID: " + quoteId);
        }
        quoteRepository.deleteById(quoteId);
    }
    
}