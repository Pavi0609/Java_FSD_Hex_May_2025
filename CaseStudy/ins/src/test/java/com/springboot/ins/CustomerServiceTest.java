package com.springboot.ins;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

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
    public void testUpdateCustomerById() {
        Customer updateData = new Customer();
        updateData.setCustomerName("Jane Doe");
        updateData.setCustomerAddress("456 Avenue");

        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);

        Customer updated = customerService.updateByCustomerId(1L, updateData);

        assertEquals("Jane Doe", updated.getCustomerName());
        assertEquals("456 Avenue", updated.getCustomerAddress());
    }

    @Test
    public void testUpdateCustomerById_NotFound() {
        when(customerRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> {
            customerService.updateByCustomerId(99L, customer);
        });

        assertEquals("Customer not found with ID: 99", ex.getMessage());
    }

    @AfterEach
    public void afterEach() {
        customer = null;
        user = null;
        System.out.println("Test objects released.");
    }
    
}