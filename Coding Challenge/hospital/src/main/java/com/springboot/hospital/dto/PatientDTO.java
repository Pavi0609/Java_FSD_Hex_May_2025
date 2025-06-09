package com.springboot.hospital.dto;

//DTO class to return limited patient info
class PatientDTO {
 private String name;
 private int age;

 public PatientDTO(String name, int age) {
     this.name = name;
     this.age = age;
 }

 // Getters & Setters
 public String getName() { return name; }
 public void setName(String name) { this.name = name; }

 public int getAge() { return age; }
 public void setAge(int age) { this.age = age; }
}