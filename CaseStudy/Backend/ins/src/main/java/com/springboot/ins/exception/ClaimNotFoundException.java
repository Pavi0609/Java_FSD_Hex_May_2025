package com.springboot.ins.exception;

public class ClaimNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	private String message;

	public ClaimNotFoundException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	} 
	
}