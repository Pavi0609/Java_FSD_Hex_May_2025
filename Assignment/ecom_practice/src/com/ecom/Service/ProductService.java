package com.ecom.Service;

import java.util.List;

import com.ecom.Dao.CategoryDao;
import com.ecom.Dao.ProductDao;
import com.ecom.Dao.Impl.CategoryDaoImpl;
import com.ecom.Dao.Impl.ProductDaoImpl;
import com.ecom.Exception.InvalidIdException;
import com.ecom.Exception.InvalidInputException;
import com.ecom.Model.Category;
import com.ecom.Model.Product;

public class ProductService {
    private ProductDao productDao = new ProductDaoImpl();
    private CategoryDao categoryDao = new CategoryDaoImpl();

    public void insertProduct(Product product, int categoryId) throws InvalidIdException, InvalidInputException {
        if (product.getPrice() <= 0) {
        	
            throw new InvalidInputException("Price must be greater than zero");
        }
        
        Category category = categoryDao.getById(categoryId);
        product.setCategory(category);
        productDao.insert(product);
    }   

    public List<Product> getByCategoryId(int categoryId) throws InvalidIdException {
        return productDao.getByCategoryId(categoryId);
    }

	public void insertProduct1(Product product, int categoryId) {
		// TODO Auto-generated method stub
		
	}

}