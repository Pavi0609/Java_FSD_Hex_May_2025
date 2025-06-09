package com.springboot.hospital.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.hospital.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
	
    @Query("SELECT p FROM Patient p JOIN p.doctors d WHERE d.id = ?1")
    List<Patient> findPatientsByDoctorId(int doctorId);

    @Query("SELECT p FROM Patient p WHERE p.id = ?1")
    Patient findPatientById(int id);

    @Query("SELECT p FROM Patient p WHERE p.username = ?1")
    Patient getPatientByUsername(@Param("username") String username);

    Patient findByUserUsername(String username);
	
    List<Patient> findByDoctorsDoctorId(int doctorId);
    
}