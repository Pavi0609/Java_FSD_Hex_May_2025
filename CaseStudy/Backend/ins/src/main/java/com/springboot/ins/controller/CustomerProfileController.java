package com.springboot.ins.controller;

import com.springboot.ins.model.CustomerProfile;
import com.springboot.ins.service.CustomerProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/customer/profile")
@CrossOrigin(origins = { "http://localhost:5174", "https://localhost:5174" })
public class CustomerProfileController {

    @Autowired
    private CustomerProfileService profileService;

    // add new profile picture
    @PostMapping("/upload/{customerId}")
    public ResponseEntity<String> uploadProfilePicture(
            @PathVariable Long customerId,
            @RequestParam("file") MultipartFile file) {
        try {
            profileService.uploadProfilePicture(customerId, file);
            return ResponseEntity.ok("Profile picture uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Could not upload the file: " + file.getOriginalFilename());
        }
    }

    // get the profile picture
    @GetMapping("/get/{customerId}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable Long customerId) {
        CustomerProfile profile = profileService.getProfilePicture(customerId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(profile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + profile.getFileName() + "\"")
                .body(profile.getData());
    }

    // delete the profile picture
    @DeleteMapping("/delete/{customerId}")
    public ResponseEntity<String> deleteProfilePicture(@PathVariable Long customerId) {
        profileService.deleteProfilePicture(customerId);
        return ResponseEntity.ok("Profile picture deleted successfully");
    }
    
}