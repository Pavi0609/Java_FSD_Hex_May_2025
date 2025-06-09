package com.springboot.hospital.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.hospital.dto.MedicalHistoryDto;
import com.springboot.hospital.dto.PatientWithHistoryDto;
import com.springboot.hospital.model.Patient;
import com.springboot.hospital.model.User;
import com.springboot.hospital.repository.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserService userService;

    public PatientService(PatientRepository patientRepository, UserService userService) {
        this.patientRepository = patientRepository;
        this.userService = userService;
    }

    // Add new patient
    public Patient addPatient(Patient patient) {
    	
        User user = patient.getUser();

        user.setRole("PATIENT");

        user = userService.signUp(user);

        patient.setUser(user);

        return patientRepository.save(patient);
    }
    
    // Get all patients for a given doctor ID
    public List<Patient> getPatientsByDoctorId(int doctorId) {
        return patientRepository.findByDoctorsDoctorId(doctorId);
    }
    
    // Get patient with medical history by ID
    public Patient getPatientWithMedicalHistoryById(int patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + patientId));
    }
    
    public PatientWithHistoryDto getPatientWithMedicalHistory(int patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + patientId));

        List<MedicalHistoryDto> medicalHistoryDtos = patient.getMedicalHistories().stream()
            .map(mh -> new MedicalHistoryDto(
                mh.getIllness(),
                mh.getNumOfYears(),
                mh.getCurrentMedication()
            ))
            .collect(Collectors.toList());

        return new PatientWithHistoryDto(
            patient.getPatientId(),
            patient.getName(),
            patient.getAge(),
            medicalHistoryDtos
        );
    }

    // Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

}