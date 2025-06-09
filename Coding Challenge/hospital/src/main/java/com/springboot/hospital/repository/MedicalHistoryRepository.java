package com.springboot.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.hospital.model.MedicalHistory;

import java.util.List;

public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Integer> {

	@Query("SELECT m FROM MedicalHistory m WHERE m.patient.id = ?1")
	List<MedicalHistory> findAllByPatientId(int patientId);
    
	@Query("SELECT mh FROM MedicalHistory mh WHERE mh.patient.user.username = ?1")
	MedicalHistory getMedicalHistoryByUsername(String username);
	
	List<MedicalHistory> findByPatientPatientId(int patientId);
	
}