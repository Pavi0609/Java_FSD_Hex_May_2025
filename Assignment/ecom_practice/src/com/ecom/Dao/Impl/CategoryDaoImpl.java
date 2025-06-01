package com.ecom.Dao.Impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ecom.Dao.CategoryDao;
import com.ecom.Exception.InvalidIdException;
import com.ecom.Model.Category;
import com.ecom.Utility.DBUtility;

public class CategoryDaoImpl implements CategoryDao {
	
	DBUtility db = DBUtility.getInstance();

    @Override
    public Category getById(int id) throws InvalidIdException {
    	
        Connection con = db.connect();
        String sql = "SELECT * FROM category WHERE id = ?";
        
        try (PreparedStatement pstmt = con.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
            	
                Category category = new Category();
                category.setId(rs.getInt("id"));
                category.setName(rs.getString("name"));
                
                return category;
            }
        } catch (SQLException e) {
        	
            System.out.println(e.getMessage());
        } finally {
        	
            db.close();
        }
        throw new InvalidIdException("Category ID is invalid: " + id);
    }
}