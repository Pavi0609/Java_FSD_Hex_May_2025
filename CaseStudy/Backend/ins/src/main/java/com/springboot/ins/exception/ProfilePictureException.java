package com.springboot.ins.exception;

public class ProfilePictureException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	private String message;

	public ProfilePictureException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	} 
	
}