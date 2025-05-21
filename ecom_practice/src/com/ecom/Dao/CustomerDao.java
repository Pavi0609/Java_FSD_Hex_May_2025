package com.ecom.Dao;

import com.ecom.Model.Customer;
import com.ecom.Exception.InvalidIdException;

public interface CustomerDao {
    Customer getById(int id) throws InvalidIdException;
}