package com.springboot.ins.exception;

public class DocumentNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	private String message;

	public DocumentNotFoundException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	} 
	
}