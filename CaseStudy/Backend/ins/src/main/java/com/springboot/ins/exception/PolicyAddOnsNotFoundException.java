package com.springboot.ins.exception;

public class PolicyAddOnsNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	private String message;

	public PolicyAddOnsNotFoundException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	} 
	
}