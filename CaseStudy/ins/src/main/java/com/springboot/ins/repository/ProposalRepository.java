package com.springboot.ins.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.ins.model.Proposal;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {

	List<Proposal> findByCustomer_Id(Long customerId);

}