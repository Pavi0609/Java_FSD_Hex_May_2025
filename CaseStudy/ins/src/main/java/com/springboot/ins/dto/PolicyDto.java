package com.springboot.ins.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.springboot.ins.model.Policy;

@Component
public class PolicyDto {
    private Long policyId;
    private String policyName;
	private Double premiumAmount;

    // Getters and Setters
    public Long getPolicyId() {
		return policyId;
	}
    
	public void setPolicyId(Long policyId) {
		this.policyId = policyId;
	}
	
	public String getPolicyName() {
		return policyName;
	}
	
	public void setPolicyName(String policyName) {
		this.policyName = policyName;
	}
	
	public Double getPremiumAmount() {
		return premiumAmount;
	}
	
	public void setPremiumAmount(Double premiumAmount) {
		this.premiumAmount = premiumAmount;
	}
	
    public static List<PolicyDto> convertPolicyIntoDto(List<Policy> list) {
        List<PolicyDto> listDto = new ArrayList<>();
        list.stream().forEach(policy -> {
        	PolicyDto dto = new PolicyDto();
            dto.setPolicyId(policy.getPolicyId());
            dto.setPolicyName(policy.getPolicyName());
            dto.setPremiumAmount(policy.getPremiumAmount());
            listDto.add(dto);
        });

        return listDto;
    }
	
}