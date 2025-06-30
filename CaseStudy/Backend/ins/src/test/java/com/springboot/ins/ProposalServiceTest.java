package com.springboot.ins;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.springboot.ins.exception.CustomerNotFoundException;
import com.springboot.ins.exception.PolicyNotFoundException;
import com.springboot.ins.exception.ProposalNotFoundException;
import com.springboot.ins.model.Customer;
import com.springboot.ins.model.Policy;
import com.springboot.ins.model.Proposal;
import com.springboot.ins.repository.CustomerRepository;
import com.springboot.ins.repository.PolicyRepository;
import com.springboot.ins.repository.ProposalRepository;
import com.springboot.ins.service.ProposalService;

@ExtendWith(MockitoExtension.class)
class ProposalServiceTest {

    @Mock
    private ProposalRepository proposalRepository;
    
    @Mock
    private CustomerRepository customerRepository;
    
    @Mock
    private PolicyRepository policyRepository;
    
    @InjectMocks
    private ProposalService proposalService;
    
    private Proposal proposal;
    private Customer customer;
    private Policy policy;
    
    @BeforeEach
    void setUp() {
        customer = new Customer();
        customer.setId(1L);
        
        policy = new Policy();
        policy.setPolicyId(1L);
        
        proposal = new Proposal();
        proposal.setProposalId(1L);
        proposal.setCustomer(customer);
        proposal.setPolicy(policy);
        proposal.setVehicleType("Car");
        proposal.setVehicleModel("Model X");
        proposal.setRegistrationNumber("ABC123");
        proposal.setManufactureYear("2020");
        proposal.setSubmittedDate(new Date());
        proposal.setProposalStatus(false);
    }
    
    @Test
    void createProposal_Success() {
        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(policyRepository.findById(1L)).thenReturn(Optional.of(policy));
        when(proposalRepository.save(any(Proposal.class))).thenReturn(proposal);
        
        Proposal createdProposal = proposalService.createProposal(proposal, 1L, 1L);
        
        assertNotNull(createdProposal);
        assertEquals(1L, createdProposal.getProposalId());
        verify(proposalRepository, times(1)).save(any(Proposal.class));
    }
    
    @Test
    void createProposal_CustomerNotFound() {
        when(customerRepository.findById(1L)).thenReturn(Optional.empty());
        
        assertThrows(CustomerNotFoundException.class, () -> {
            proposalService.createProposal(proposal, 1L, 1L);
        });
    }
    
    @Test
    void createProposal_PolicyNotFound() {
        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(policyRepository.findById(1L)).thenReturn(Optional.empty());
        
        assertThrows(PolicyNotFoundException.class, () -> {
            proposalService.createProposal(proposal, 1L, 1L);
        });
    }
    
    @Test
    void deleteByProposalId_Success() {
        doNothing().when(proposalRepository).deleteByProposalId(1L);
        
        proposalService.deleteByProposalId(1L);
        
        verify(proposalRepository, times(1)).deleteByProposalId(1L);
    }
    
    @Test
    void updateProposalStatus_Success() {
        when(proposalRepository.findById(1L)).thenReturn(Optional.of(proposal));
        when(proposalRepository.save(any(Proposal.class))).thenReturn(proposal);
        
        Proposal updatedProposal = proposalService.updateProposalStatus(1L, true);
        
        assertTrue(updatedProposal.isProposalStatus());
        verify(proposalRepository, times(1)).save(any(Proposal.class));
    }
    
    @Test
    void updateProposalStatus_NotFound() {
        when(proposalRepository.findById(1L)).thenReturn(Optional.empty());
        
        assertThrows(ProposalNotFoundException.class, () -> {
            proposalService.updateProposalStatus(1L, true);
        });
    }
}