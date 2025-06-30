package com.springboot.ins;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.springboot.ins.enums.PolicyStatus;
import com.springboot.ins.model.Policy;
import com.springboot.ins.repository.PolicyRepository;
import com.springboot.ins.service.PolicyService;

@SpringBootTest
public class PolicyServiceTest {

    @InjectMocks
    private PolicyService policyService;

    @Mock
    private PolicyRepository policyRepository;

    private Policy policy;

    @BeforeEach
    public void init() {
    	
    	// create test policy
        policy = new Policy();
        policy.setPolicyId(1L);
        policy.setPolicyName("Comprehensive Car Insurance");
        policy.setPremiumAmount(5000.0);
        policy.setPolicyStatus(PolicyStatus.ACTIVE);
        policy.setStartDate(new Date());
        policy.setEndDate(new Date());
        System.out.println("Policy created: " + policy);
    }

    @Test
    public void testCreatePolicy() {
        when(policyRepository.save(policy)).thenReturn(policy);
        Policy created = policyService.createPolicy(policy);
        assertEquals(policy.getPolicyName(), created.getPolicyName());
    }

    @Test
    public void testGetPolicyById() {
        when(policyRepository.findById(1L)).thenReturn(Optional.of(policy));
        Policy result = policyService.getPolicyById(1L);
        assertEquals(5000.0, result.getPremiumAmount());
    }

    @Test
    public void testGetPolicyByIdNotFound() {
        when(policyRepository.findById(2L)).thenReturn(Optional.empty());
        RuntimeException ex = assertThrows(RuntimeException.class, () -> policyService.getPolicyById(2L));
        assertEquals("Policy not found", ex.getMessage());
    }

    @AfterEach
    public void afterEach() {
        policy = null;
        System.out.println("Policy object cleared.");
    }
}