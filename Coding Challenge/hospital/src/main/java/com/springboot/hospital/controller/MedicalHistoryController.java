package com.springboot.hospital.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.springboot.hospital.model.MedicalHistory;
import com.springboot.hospital.service.MedicalHistoryService;

@RestController
@RequestMapping("/api/medical-history")
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService medicalHistoryService;

    // Add medical history for logged-in patient
    @PostMapping("/add")
    public ResponseEntity<MedicalHistory> addMedicalHistory(@RequestBody MedicalHistory medicalHistory, Principal principal) {
        String username = principal.getName();
        MedicalHistory savedHistory = medicalHistoryService.addMedicalHistory(username, medicalHistory);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedHistory);
    }

    // Get all medical histories
    @GetMapping("/get-all")
    public ResponseEntity<List<MedicalHistory>> getAllMedicalHistories() {
        List<MedicalHistory> histories = medicalHistoryService.getAllMedicalHistories();
        return ResponseEntity.ok(histories);
    }

    // Get a specific medical history by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<MedicalHistory> getMedicalHistoryById(@PathVariable int id) {
        MedicalHistory history = medicalHistoryService.getMedicalHistoryById(id);
        if (history != null) {
            return ResponseEntity.ok(history);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Get all medical histories for a specific patient
    @GetMapping("/get-by-patient/{patientId}")
    public ResponseEntity<List<MedicalHistory>> getByPatientId(@PathVariable int patientId) {
        List<MedicalHistory> histories = medicalHistoryService.getByPatientId(patientId);
        return ResponseEntity.ok(histories);
    }
    
    // Add medical history directly using full entity
    @PostMapping("/add-entity")
    public ResponseEntity<MedicalHistory> addMedicalHistoryByEntity(@RequestBody MedicalHistory medicalHistory) {
        MedicalHistory savedHistory = medicalHistoryService.addMedicalHistoryByEntity(medicalHistory);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedHistory);
    }


}