package com.springboot.ins;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.springboot.ins.exception.CustomerNotFoundException;
import com.springboot.ins.model.Customer;
import com.springboot.ins.model.User;
import com.springboot.ins.repository.CustomerRepository;
import com.springboot.ins.service.CustomerService;
import com.springboot.ins.service.UserService;

@SpringBootTest
public class CustomerServiceTest {

    @InjectMocks
    private CustomerService customerService;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private UserService userService;

    private Customer customer;
    private User user;

    @BeforeEach
    public void setUp() {
    	
    	// create test user
        user = new User(1, "john_doe", "pass123", "USER");

        // create test customer
        customer = new Customer();
        customer.setId(1L);
        customer.setCustomerName("John Doe");
        customer.setCustomerAddress("123 Street");
        customer.setCustomerDob(new Date());
        customer.setCustomerAge(30);
        customer.setCustomerAadharNo("1234567890");
        customer.setCustomerPanNo("ABCDE12345");
        customer.setUser(user);

        System.out.println("Customer created: " + customer);
    }

    @Test
    public void testInsertCustomer() {
        when(userService.signUp(user)).thenReturn(user);
        when(customerRepository.save(customer)).thenReturn(customer);

        Customer saved = customerService.insertCustomer(customer);

        // assertNotNull(saved);
        assertEquals("John Doe", saved.getCustomerName());
        assertEquals("CUSTOMER", saved.getUser().getRole());
    }

    @Test
    public void testUpdateCustomerByUsername() { 
    	// Setup test data
        String username = "jane.doe";
        Customer updateData = new Customer();
        updateData.setCustomerName("Jane Doe");
        updateData.setCustomerAddress("456 Avenue");

        // Mock repository responses
        when(customerRepository.findByUsername(username)) 
          	.thenReturn(Optional.of(customer));
            when(customerRepository.save(any(Customer.class)))
                .thenReturn(customer);

        // Execute the test
        Customer updated = customerService.updateByCustomerId(username, updateData);

        // Verify results
        assertEquals("Jane Doe", updated.getCustomerName());
        assertEquals("456 Avenue", updated.getCustomerAddress());
        verify(customerRepository).findByUsername(username);
        verify(customerRepository).save(customer);
        }

    @Test
    public void testUpdateCustomerByUsername_NotFound() {
    	String nonExistingUsername = "non.existing";

        when(customerRepository.findByUsername(nonExistingUsername))
            .thenReturn(Optional.empty());

        CustomerNotFoundException ex = assertThrows(CustomerNotFoundException.class, () -> {
            customerService.updateByCustomerId(nonExistingUsername, new Customer());
        });

        assertEquals("Customer not found with username: " + nonExistingUsername, ex.getMessage());
        verify(customerRepository).findByUsername(nonExistingUsername);
        verify(customerRepository, never()).save(any());
    }
       
    @AfterEach
    public void afterEach() {
        customer = null;
        user = null;
        System.out.println("Test objects released.");
    }
    
}