package com.springboot.ins.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.ins.dto.CustomerDto;
import com.springboot.ins.exception.CustomerNotFoundException;
import com.springboot.ins.model.Customer;
import com.springboot.ins.model.User;
import com.springboot.ins.repository.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
	private UserService userService;
	
	Logger logger = LoggerFactory.getLogger("CustomerService");

    public CustomerService(CustomerRepository customerRepository, UserService userService) {
		super();
		this.customerRepository = customerRepository;
		this.userService = userService;
	}
    
	// add new customer
	public Customer insertCustomer(Customer customer) { 
		
		// Get user from Customer 
		User user = customer.getUser();
		logger.info("Fetch User from Customer");

		// Give role to this user 
		user.setRole("CUSTOMER");
		
		// Save this User in the DB 
		user = userService.signUp(user);
		logger.info("User Details saved in DB");
		
		// Attach this user back to Customer
		customer.setUser(user);
		
		// Save Customer in DB
		return customerRepository.save(customer);
	}  
	
    // get all customers
    public List<Customer> getAll() { 
        return customerRepository.findAll();
    }
    
	// get all customers by dto
	public List<CustomerDto> getAllCustomers() {
	    List<Customer> customer = customerRepository.findAll();
	    return CustomerDto.convertCustomerIntoDto(customer);
	}
    
    // get customer by id (using token)
	public Customer getCustomerByUsername(String username) {
		return customerRepository.getCustomerByUsername(username);
	}
	
	// update customer by id
	public Customer updateByCustomerId(String username, Customer updateCustomer) {
		
		// Fetch Customer by CustomerId
	    Customer customer = customerRepository.findByUsername(username)
	        .orElseThrow(() -> new CustomerNotFoundException("Customer not found with ID: " + username));

	    if (updateCustomer.getCustomerName() != null) {
	        customer.setCustomerName(updateCustomer.getCustomerName());
	    }
	    
	    if (updateCustomer.getCustomerAddress() != null) {
	        customer.setCustomerAddress(updateCustomer.getCustomerAddress());
	    }
	    
	    if (updateCustomer.getCustomerDob() != null) {
	        customer.setCustomerDob(updateCustomer.getCustomerDob()); 
	    }
	    
	    if (updateCustomer.getCustomerAge() != null) {
	        customer.setCustomerAge(updateCustomer.getCustomerAge()); 
	    }
	    
	    if (updateCustomer.getCustomerAadharNo() != null) {
	        customer.setCustomerAadharNo(updateCustomer.getCustomerAadharNo());
	    }
	    if (updateCustomer.getCustomerPanNo() != null) {
	        customer.setCustomerPanNo(updateCustomer.getCustomerPanNo());
	    }

	    return customerRepository.save(customer);
	}
	
	// delete customer by id
	public void deleteCustomerById(Long id) {
		customerRepository.deleteCustomerById(id);
	}

}