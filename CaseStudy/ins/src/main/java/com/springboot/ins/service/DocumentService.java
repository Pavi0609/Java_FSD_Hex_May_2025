package com.springboot.ins.service;

import com.springboot.ins.exception.ResourceNotFoundException;
import com.springboot.ins.model.Document;
import com.springboot.ins.model.Proposal;
import com.springboot.ins.repository.DocumentRepository;
import com.springboot.ins.repository.ProposalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private ProposalRepository proposalRepository;

    // upload a document
    public Document addDocument(Document document, Long proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal not found with ID: " + proposalId));

        document.setProposal(proposal);
        document.setUploadDate(LocalDate.now());

        return documentRepository.save(document);
    }

    // get all documents
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    // delete document by id
    public void deleteDocument(Integer documentId) {
        if (!documentRepository.existsById(documentId)) {
            throw new ResourceNotFoundException("Document not found with ID: " + documentId);
        }
        documentRepository.deleteById(documentId);
    }
    
}