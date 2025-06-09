package com.springboot.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.springboot.hospital.dto.PatientWithHistoryDto;
import com.springboot.hospital.model.MedicalHistory;
import com.springboot.hospital.model.Patient;
import com.springboot.hospital.service.MedicalHistoryService;
import com.springboot.hospital.service.PatientService;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;
    private MedicalHistoryService medicalHistoryService;
    
    // Add a new patient with medical history and user details
    @PostMapping("/add-with-history")
    public ResponseEntity<Patient> addPatientWithMedicalHistory(@RequestBody Patient patient) {
        // Save patient first (including user details)
        Patient savedPatient = patientService.addPatient(patient);

        // If there are medical histories in the request, save them linked to this patient
        if (patient.getMedicalHistories() != null) {
            for (MedicalHistory mh : patient.getMedicalHistories()) {
                mh.setPatient(savedPatient);
                medicalHistoryService.addMedicalHistoryByEntity(mh); 
            }
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(savedPatient);
    }
    
    // Get all patients for a given doctor ID
    @GetMapping("/get/doctor/{doctorId}")
//    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<List<Patient>> getPatientsByDoctorId(@PathVariable int doctorId) {
        List<Patient> patients = patientService.getPatientsByDoctorId(doctorId);
        return ResponseEntity.ok(patients);
    }
    
    // Get patient with medical history by ID
    @GetMapping("/get/{patientId}")
    public ResponseEntity<Patient> getPatientWithMedicalHistory(@PathVariable int patientId) {
        Patient patient = patientService.getPatientWithMedicalHistoryById(patientId);
        return ResponseEntity.ok(patient);
    }

    @GetMapping("/get/{id}/with-history")
    public ResponseEntity<PatientWithHistoryDto> getPatientWithHistory(@PathVariable int id) {
        PatientWithHistoryDto dto = patientService.getPatientWithMedicalHistory(id);
        return ResponseEntity.ok(dto);
    }

    // Get all patients
    @GetMapping("/get-all")
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }

}