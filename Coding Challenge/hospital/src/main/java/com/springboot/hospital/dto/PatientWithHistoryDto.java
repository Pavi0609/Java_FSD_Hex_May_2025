package com.springboot.hospital.dto;

import java.util.List;

public class PatientWithHistoryDto {
    private int patientId;
    private String name;
    private int age;
    private List<MedicalHistoryDto> medicalHistories;

    public PatientWithHistoryDto(int patientId, String name, int age, List<MedicalHistoryDto> medicalHistories) {
        this.patientId = patientId;
        this.name = name;
        this.age = age;
        this.medicalHistories = medicalHistories;
    }
    // getters and setters

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public List<MedicalHistoryDto> getMedicalHistories() {
		return medicalHistories;
	}

	public void setMedicalHistories(List<MedicalHistoryDto> medicalHistories) {
		this.medicalHistories = medicalHistories;
	}
    
}