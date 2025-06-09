package com.springboot.ins.exception;

public class CustomerNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	private String message;

	public CustomerNotFoundException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	} 
	
}