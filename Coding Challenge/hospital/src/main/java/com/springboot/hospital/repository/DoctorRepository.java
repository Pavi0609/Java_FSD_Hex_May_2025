package com.springboot.hospital.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.hospital.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
	
    @Query("SELECT d FROM Doctor d WHERE d.username = ?1")
    Optional<Doctor> getDoctorByUsername(String username);

    @Query("SELECT d FROM Doctor d WHERE d.id = ?1")
	Optional<Doctor> findById(Long doctorId);
	
}