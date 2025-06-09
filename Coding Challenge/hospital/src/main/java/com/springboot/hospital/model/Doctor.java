package com.springboot.hospital.model;

import java.util.List;

import com.springboot.hospital.enums.Speciality;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int doctorId;

    private String doctorName;

    @Enumerated(EnumType.STRING)
    private Speciality speciality;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToMany(mappedBy = "doctors")
    private List<Patient> patients;

    @Column(unique = true, nullable = false)
	private String username;
    
    // Constructors
	public Doctor() {
		super();
	}

	public Doctor(int doctorId, String doctorName, Speciality speciality, User user, List<Patient> patients, String username) {
		this.doctorId = doctorId;
		this.doctorName = doctorName;
		this.speciality = speciality;
		this.user = user;
		this.patients = patients;
		this.username = username;
	}

	// Getters and Setters
	public int getDoctorId() {
		return doctorId;
	}
	
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public Speciality getSpeciality() {
		return speciality;
	}

	public void setSpeciality(Speciality speciality) {
		this.speciality = speciality;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Patient> getPatients() {
		return patients;
	}

	public void setPatients(List<Patient> patients) {
		this.patients = patients;
	}
	
    public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
   
}