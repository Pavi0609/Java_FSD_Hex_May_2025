package com.ecom.Dao;

import java.util.List;

import com.ecom.Model.Product;
import com.ecom.Exception.InvalidIdException;

public interface ProductDao {
    void insert(Product product);
    List<Product> getByCategoryId(int categoryId) throws InvalidIdException;
    Product getById(int id) throws InvalidIdException;
}