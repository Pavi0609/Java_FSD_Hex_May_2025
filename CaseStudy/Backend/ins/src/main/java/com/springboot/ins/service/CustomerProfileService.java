package com.springboot.ins.service;

import com.springboot.ins.exception.CustomerNotFoundException;
import com.springboot.ins.exception.ProfilePictureException;
import com.springboot.ins.model.Customer;
import com.springboot.ins.model.CustomerProfile;
import com.springboot.ins.repository.CustomerProfileRepository;
import com.springboot.ins.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.Objects;
import java.util.Optional;

@Service
public class CustomerProfileService {

    @Autowired
    private CustomerProfileRepository profileRepository;

    @Autowired
    private CustomerRepository customerRepository;

    // add new profile picture
    public CustomerProfile uploadProfilePicture(Long customerId, MultipartFile file) throws IOException {
    	
        // Validate file
        if (file.isEmpty()) {
            throw new ProfilePictureException("Failed to store empty file");
        }

        // Check if customer exists
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id: " + customerId));

        // Check if customer already has a profile picture
        Optional<CustomerProfile> existingProfile = profileRepository.findByCustomerId(customerId);

        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        CustomerProfile profile;

        if (existingProfile.isPresent()) {
            // Update existing profile
            profile = existingProfile.get();
            profile.setFileName(fileName);
            profile.setFileType(file.getContentType());
            profile.setData(file.getBytes());
        } else {
            // Create new profile
            profile = new CustomerProfile(
                    fileName,
                    file.getContentType(),
                    file.getBytes(),
                    customer);
        }

        return profileRepository.save(profile);
    }

    // get the profile picture
    public CustomerProfile getProfilePicture(Long customerId) {
        return profileRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new ProfilePictureException("Profile picture not found for customer id: " + customerId));
    }

    // delete the profile picture
    public void deleteProfilePicture(Long customerId) {
        profileRepository.deleteByCustomerId(customerId);
    }
    
}