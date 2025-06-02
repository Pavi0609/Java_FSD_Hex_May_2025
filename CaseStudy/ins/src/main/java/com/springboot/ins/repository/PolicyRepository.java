package com.springboot.ins.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.ins.model.Policy;

public interface PolicyRepository extends JpaRepository<Policy, Long> {

}