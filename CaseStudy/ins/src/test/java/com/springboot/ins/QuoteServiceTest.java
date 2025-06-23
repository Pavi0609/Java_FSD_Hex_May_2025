package com.springboot.ins;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.springboot.ins.exception.ProposalNotFoundException;
import com.springboot.ins.exception.QuoteNotFoundException;
import com.springboot.ins.model.Proposal;
import com.springboot.ins.model.Quote;
import com.springboot.ins.repository.ProposalRepository;
import com.springboot.ins.repository.QuoteRepository;
import com.springboot.ins.service.QuoteService;

@ExtendWith(MockitoExtension.class)
class QuoteServiceTest {

    @Mock
    private QuoteRepository quoteRepository;
    
    @Mock
    private ProposalRepository proposalRepository;
    
    @InjectMocks
    private QuoteService quoteService;
    
    private Quote quote;
    private Proposal proposal;
    
    @BeforeEach
    void setUp() {
        proposal = new Proposal();
        proposal.setProposalId(1L);
        
        quote = new Quote();
        quote.setQuoteId(1L);
        quote.setProposal(proposal);
        quote.setPremiumAmount(new BigDecimal("1000.00"));
        quote.setGeneratedDate(LocalDate.now());
        quote.setValidityPeriod(30);
    }
    
    @Test
    void insertQuote_Success() {
        when(proposalRepository.findById(1L)).thenReturn(Optional.of(proposal));
        when(quoteRepository.save(any(Quote.class))).thenReturn(quote);
        
        Quote createdQuote = quoteService.insertQuote(1L, quote);
        
        assertNotNull(createdQuote);
        assertEquals(1L, createdQuote.getQuoteId());
        assertEquals(LocalDate.now(), createdQuote.getGeneratedDate());
        verify(quoteRepository, times(1)).save(any(Quote.class));
    }
    
    @Test
    void insertQuote_ProposalNotFound() {
        when(proposalRepository.findById(1L)).thenReturn(Optional.empty());
        
        assertThrows(ProposalNotFoundException.class, () -> {
            quoteService.insertQuote(1L, quote);
        });
    }
    
    @Test
    void getQuoteByProposalId_Success() {
        when(quoteRepository.findByProposalProposalId(1L)).thenReturn(Optional.of(quote));
        
        Quote foundQuote = quoteService.getQuoteByProposalId(1L);
        
        assertNotNull(foundQuote);
        assertEquals(1L, foundQuote.getQuoteId());
    }
    
    @Test
    void getQuoteByProposalId_NotFound() {
        when(quoteRepository.findByProposalProposalId(1L)).thenReturn(Optional.empty());
        
        assertThrows(QuoteNotFoundException.class, () -> {
            quoteService.getQuoteByProposalId(1L);
        });
    }
    
    @Test
    void getQuoteById_Success() {
        when(quoteRepository.findById(1L)).thenReturn(Optional.of(quote));
        
        Quote foundQuote = quoteService.getQuoteById(1L);
        
        assertNotNull(foundQuote);
        assertEquals(1L, foundQuote.getQuoteId());
    }
    
    @Test
    void getQuoteById_NotFound() {
        when(quoteRepository.findById(1L)).thenReturn(Optional.empty());
        
        assertThrows(QuoteNotFoundException.class, () -> {
            quoteService.getQuoteById(1L);
        });
    }
    
    @Test
    void deleteQuote_Success() {
        when(quoteRepository.existsById(1L)).thenReturn(true);
        doNothing().when(quoteRepository).deleteById(1L);
        
        quoteService.deleteQuote(1L);
        
        verify(quoteRepository, times(1)).deleteById(1L);
    }
    
    @Test
    void deleteQuote_NotFound() {
        when(quoteRepository.existsById(1L)).thenReturn(false);
        
        assertThrows(QuoteNotFoundException.class, () -> {
            quoteService.deleteQuote(1L);
        });
        
        verify(quoteRepository, never()).deleteById(1L);
    }
    
}