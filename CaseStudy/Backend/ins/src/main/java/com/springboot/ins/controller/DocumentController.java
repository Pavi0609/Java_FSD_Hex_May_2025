package com.springboot.ins.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.springboot.ins.model.Document; 
import com.springboot.ins.service.DocumentService;

@RestController
@RequestMapping("/api/document")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // upload a document
    @PostMapping("/add/{proposalId}")
    public ResponseEntity<Document> addDocument(@RequestBody Document document, 
    		                                    @PathVariable Long proposalId) {
        return ResponseEntity.ok(documentService.addDocument(document, proposalId));
    }

    // get all documents
    @GetMapping("/get-all")
    public ResponseEntity<List<Document>> getAllDocuments() {
        return ResponseEntity.ok(documentService.getAllDocuments());
    }

    // delete document by id
    @DeleteMapping("/delete/{documentId}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Integer documentId) {
        documentService.deleteDocument(documentId);
        return ResponseEntity.noContent().build();
    }
    
}