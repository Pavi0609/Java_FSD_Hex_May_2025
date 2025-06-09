package com.springboot.ins;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.springboot.ins.exception.ResourceNotFoundException;
import com.springboot.ins.model.Claim;
import com.springboot.ins.model.Customer;
import com.springboot.ins.model.Policy;
import com.springboot.ins.repository.ClaimRepository;
import com.springboot.ins.repository.CustomerRepository;
import com.springboot.ins.repository.PolicyRepository;
import com.springboot.ins.service.ClaimService;

@SpringBootTest
public class ClaimServiceTest {

    @InjectMocks
    private ClaimService claimService;

    @Mock
    private ClaimRepository claimRepository;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private PolicyRepository policyRepository;

    private Claim claim;
    private Customer customer;
    private Policy policy;

    @BeforeEach
    public void init() {
    	
        // Create test policy
        policy = new Policy();
        policy.setPolicyId(1L);
        policy.setPolicyName("Test Policy");
        
        // Create test customer
        customer = new Customer();
        customer.setId(1L);
        customer.setCustomerName("John Doe");
        customer.setCustomerAddress("10, xy street, chennai");
        
        // Create test claim
        claim = new Claim();
        claim.setClaimId(1);
        claim.setPolicy(policy);
        claim.setCustomer(customer);
        claim.setIncidentDescription("Car accident");
        claim.setClaimDate(LocalDate.now());
        claim.setSettlementAmount(BigDecimal.valueOf(5000));
        
        System.out.println("Test objects initialized");
    }

    @Test
    public void testCreateClaim() {
        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(policyRepository.findById(1L)).thenReturn(Optional.of(policy));
        when(claimRepository.save(claim)).thenReturn(claim);
        
        Claim created = claimService.createClaim(claim, 1L, 1L);
        
        assertEquals("Car accident", created.getIncidentDescription());
        assertEquals(LocalDate.now(), created.getClaimDate());
    }

    @Test
    public void testCreateClaimCustomerNotFound() {
        when(customerRepository.findById(2L)).thenReturn(Optional.empty());
        
        ResourceNotFoundException ex = assertThrows(ResourceNotFoundException.class, 
            () -> claimService.createClaim(claim, 2L, 1L));
        
        assertEquals("Customer not found with ID: 2", ex.getMessage());
    }

    @Test
    public void testCreateClaimPolicyNotFound() {
        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(policyRepository.findById(2L)).thenReturn(Optional.empty());
        
        ResourceNotFoundException ex = assertThrows(ResourceNotFoundException.class, 
            () -> claimService.createClaim(claim, 1L, 2L));
        
        assertEquals("Policy not found with ID: 2", ex.getMessage());
    }

    @Test
    public void testGetAllClaims() {
        List<Claim> claims = Arrays.asList(claim);
        Page<Claim> page = new PageImpl<>(claims);
        Pageable pageable = PageRequest.of(0, 10);
        
        when(claimRepository.findAll(pageable)).thenReturn(page);
        
        List<Claim> result = claimService.getAllClaims(0, 10);
        
        assertEquals(1, result.size());
        assertEquals(1, result.get(0).getClaimId());
    }

    @Test
    public void testGetClaimByIdNotFound() {
        when(claimRepository.findById(2)).thenReturn(Optional.empty());
        
        ResourceNotFoundException ex = assertThrows(ResourceNotFoundException.class, 
            () -> claimService.getClaimById(2));
        
        assertEquals("Claim not found with ID: 2", ex.getMessage());
    }

    @AfterEach
    public void afterEach() {
        claim = null;
        customer = null;
        policy = null;
        System.out.println("Test objects cleared");
    }
}