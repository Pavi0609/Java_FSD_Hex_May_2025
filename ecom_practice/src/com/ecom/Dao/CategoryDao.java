package com.ecom.Dao;

import com.ecom.Model.Category;
import com.ecom.Exception.InvalidIdException;

public interface CategoryDao {
    Category getById(int id) throws InvalidIdException;

	void insert(Category c);
}