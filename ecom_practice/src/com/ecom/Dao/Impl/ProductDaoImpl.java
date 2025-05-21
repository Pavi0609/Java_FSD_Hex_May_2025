package com.ecom.Dao.Impl;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.ecom.Dao.ProductDao;
import com.ecom.Exception.InvalidIdException;
import com.ecom.Model.Category;
import com.ecom.Model.Product;
import com.ecom.Utility.DBUtility;

public class ProductDaoImpl implements ProductDao {
	DBUtility db = DBUtility.getInstance();

    @Override
    public void insert(Product product) {
    	
        Connection con = db.connect();
        String sql = "INSERT INTO product(id, title, price, description, category_id) VALUES (?, ?, ?, ?, ?)";
        
        try (PreparedStatement pstmt = con.prepareStatement(sql)) {
            pstmt.setInt(1, product.getId());
            pstmt.setString(2, product.getTitle());
            pstmt.setDouble(3, product.getPrice());
            pstmt.setString(4, product.getDescription());
            pstmt.setInt(5, product.getCategory().getId());
            pstmt.executeUpdate();
        } catch (SQLException e) {
        	
            System.out.println(e.getMessage());
            
        } finally {
        	
            db.close();
        }
    }

    @Override
    public List<Product> getByCategoryId(int categoryId) throws InvalidIdException {
    	
        Connection con = db.connect();
        String sql = "SELECT * FROM product WHERE category_id = ?";
        
        List<Product> products = new ArrayList<>();
        
        try (PreparedStatement pstmt = con.prepareStatement(sql)) {
            pstmt.setInt(1, categoryId);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
            	
                Product product = new Product();
                
                product.setId(rs.getInt("id"));
                product.setTitle(rs.getString("title"));
                product.setPrice(rs.getDouble("price"));
                product.setDescription(rs.getString("description"));

                Category category = new Category();
                category.setId(categoryId);
              
                product.setCategory(category);

                products.add(product);
            }
            if (products.isEmpty()) {
                throw new InvalidIdException("No products found for category ID " + categoryId);
            }
            return products;
        } catch (SQLException e) {
        	
            System.out.println(e.getMessage());
        } finally {
        	
            db.close();
        }
        throw new InvalidIdException("Category ID is invalid: " + categoryId);
    }

    @Override
    public Product getById(int id) throws InvalidIdException {
    	
        Connection con = db.connect();
        String sql = "SELECT * FROM product WHERE id = ?";
        
        try (PreparedStatement pstmt = con.prepareStatement(sql)) {
        	
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                Product product = new Product();
                product.setId(rs.getInt("id"));
                product.setTitle(rs.getString("title"));
                product.setPrice(rs.getDouble("price"));
                product.setDescription(rs.getString("description"));
             
                return product;
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            db.close();
        }
        throw new InvalidIdException("Product ID is invalid: " + id);
    }
}