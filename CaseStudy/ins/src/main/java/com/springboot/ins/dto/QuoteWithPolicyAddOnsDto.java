package com.springboot.ins.dto;

import java.util.List;

import org.springframework.stereotype.Component;

import com.springboot.ins.model.PolicyAddOns;
import com.springboot.ins.model.Quote;

@Component
public class QuoteWithPolicyAddOnsDto {
	
	private Quote quote;
	private List<PolicyAddOns> addOns;
	
	
	public Quote getQuote() {
		return quote;
	}
	public void setQuote(Quote quote) {
		this.quote = quote;
	}
	public List<PolicyAddOns> getPolicyAddOns() {
		return addOns;
	}
	public void setPolicyAddOns(List<PolicyAddOns> addOns) {
		this.addOns = addOns;
	}
	
}