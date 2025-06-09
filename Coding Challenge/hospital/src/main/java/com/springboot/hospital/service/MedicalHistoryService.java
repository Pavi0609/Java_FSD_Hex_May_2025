package com.springboot.hospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.hospital.model.MedicalHistory;
import com.springboot.hospital.model.Patient;
import com.springboot.hospital.repository.MedicalHistoryRepository;
import com.springboot.hospital.repository.PatientRepository;

@Service
public class MedicalHistoryService {

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;
    @Autowired
    private PatientRepository patientRepository;

    public MedicalHistoryService(MedicalHistoryRepository medicalHistoryRepository,
			PatientRepository patientRepository) {
		super();
		this.medicalHistoryRepository = medicalHistoryRepository;
		this.patientRepository = patientRepository;
	}

    // Add medical history for logged-in patient
    public MedicalHistory addMedicalHistory(String username, MedicalHistory medicalHistory) {
        Patient patient = patientRepository.findByUserUsername(username);
        if (patient == null) {
            throw new RuntimeException("Patient not found for username: " + username);
        }
        medicalHistory.setPatient(patient);
        return medicalHistoryRepository.save(medicalHistory);
    }

    // Get all medical histories
    public List<MedicalHistory> getAllMedicalHistories() {
        return medicalHistoryRepository.findAll();
    }

    // Get a specific medical history by ID
    public MedicalHistory getMedicalHistoryById(int id) {
        return medicalHistoryRepository.findById(id).orElse(null);
    }

    // Get all medical histories for a specific patient
    public List<MedicalHistory> getByPatientId(int patientId) {
        return medicalHistoryRepository.findByPatientPatientId(patientId);
    }
    
    // Add medical history directly using full entity
    public MedicalHistory addMedicalHistoryByEntity(MedicalHistory medicalHistory) {
        return medicalHistoryRepository.save(medicalHistory);
    }
    
}