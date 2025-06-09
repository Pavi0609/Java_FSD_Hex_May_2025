package com.springboot.hospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.hospital.model.Doctor;
import com.springboot.hospital.model.User;
import com.springboot.hospital.repository.DoctorRepository;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserService userService;

    public DoctorService(DoctorRepository doctorRepository, UserService userService) {
        this.doctorRepository = doctorRepository;
        this.userService = userService;
    }

    // Add new doctor
    public Doctor addDoctor(Doctor doctor) {
    	
        User user = doctor.getUser();
        
        user.setRole("DOCTOR");

        user = userService.signUp(user);

        doctor.setUser(user);

        return doctorRepository.save(doctor);
    }

    // Get all doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

}