package com.springboot.ins.exception;

public class ProposalNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	private String message;

	public ProposalNotFoundException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	} 
	
}