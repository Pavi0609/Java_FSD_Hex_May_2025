package com.springboot.ins.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.springboot.ins.model.Customer;

@Component
public class CustomerDto {
    private Long id;
    private String customerName;
	private String customerAadharNo;
	
    // Getters and Setters
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerAadharNo() {
		return customerAadharNo;
	}

	public void setCustomerAadharNo(String customerAadharNo) {
		this.customerAadharNo = customerAadharNo;
	}

	public static List<CustomerDto> convertCustomerIntoDto(List<Customer> list) {
        List<CustomerDto> listDto = new ArrayList<>();
        list.stream().forEach(customer -> {
        	CustomerDto dto = new CustomerDto();
            dto.setId(customer.getId());
            dto.setCustomerName(customer.getCustomerName());
            dto.setCustomerAadharNo(customer.getCustomerAadharNo());
            listDto.add(dto);
        });

        return listDto;
    }
	
}