package com.ecom.Exception;

public class InvalidInputException extends Exception {
	
		private static final long serialVersionUID=6293585605622409887L;
		
	private String message;

	public InvalidInputException(String message) {

		this.message = message;
	}

	public String getMessage() {
		return message;
	}

}