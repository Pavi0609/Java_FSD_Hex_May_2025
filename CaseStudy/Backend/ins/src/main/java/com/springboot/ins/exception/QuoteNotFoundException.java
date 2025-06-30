package com.springboot.ins.exception;

public class QuoteNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	private String message;

	public QuoteNotFoundException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	} 
	
}