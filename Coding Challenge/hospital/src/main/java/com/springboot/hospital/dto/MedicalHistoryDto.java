package com.springboot.hospital.dto;

public class MedicalHistoryDto {

    private String illness;
    private int numOfYears;
    private String currentMedication;
    
    // Constructors
    public MedicalHistoryDto(String illness, int numOfYears, String currentMedication) {
		super();
		this.illness = illness;
		this.numOfYears = numOfYears;
		this.currentMedication = currentMedication;
	}

	// Getters and Setters
    public String getIllness() {
        return illness;
    }

    public void setIllness(String illness) {
        this.illness = illness;
    }

    public int getNumOfYears() {
        return numOfYears;
    }

    public void setNumOfYears(int numOfYears) {
        this.numOfYears = numOfYears;
    }

    public String getCurrentMedication() {
        return currentMedication;
    }

    public void setCurrentMedication(String currentMedication) {
        this.currentMedication = currentMedication;
    }
}