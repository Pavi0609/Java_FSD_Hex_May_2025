package com.springboot.hospital.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "medical_history")
public class MedicalHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int medicalHistoryId;

    private String illness;
    
    private int numOfYears;

    @Column(length = 1000)
    private String currentMedication;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    // Constructors
	public MedicalHistory() {
		super();
	}

	public MedicalHistory(int medicalHistoryId, String illness, int numOfYears, String currentMedication, Patient patient) {
		this.medicalHistoryId = medicalHistoryId;
		this.illness = illness;
		this.numOfYears = numOfYears;
		this.currentMedication = currentMedication;
		this.patient = patient;
	}

	// Getters and Setters
	public int getMedicalHistoryId() {
		return medicalHistoryId;
	}

	public void setMedicalHistoryId(int medicalHistoryId) {
		this.medicalHistoryId = medicalHistoryId;
	}

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

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}
    
}