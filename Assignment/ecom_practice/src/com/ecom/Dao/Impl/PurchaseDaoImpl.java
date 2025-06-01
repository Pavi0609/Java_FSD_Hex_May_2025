package com.ecom.Dao.Impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.ecom.Dao.PurchaseDao;
import com.ecom.Model.Purchase;
import com.ecom.Utility.DBUtility;

public class PurchaseDaoImpl implements PurchaseDao {
	DBUtility db = DBUtility.getInstance();

	@Override
	public void insert(Purchase purchase) {
	    Connection con = db.connect();
	    String sql = "INSERT INTO purchase(customer_id, product_id, date_of_purchase, coupon, amount_paid) VALUES (?, ?, ?, ?, ?)";
	    try (PreparedStatement pstmt = con.prepareStatement(sql)) {
	        pstmt.setInt(1, purchase.getCustomer().getId());
	        pstmt.setInt(2, purchase.getProduct().getId());
	        pstmt.setString(3, purchase.getDateOfPurchase());
	        
	        if (purchase.getCoupon() != null) {
	            pstmt.setString(4, purchase.getCoupon().name());
	        } else {
	            pstmt.setNull(4, java.sql.Types.VARCHAR);
	        }
	        
	        pstmt.setDouble(5, purchase.getAmountPaid());

	        pstmt.executeUpdate();
	    } catch (SQLException e) {
	        System.out.println(e.getMessage());
	    } finally {
	        db.close();
	    }
	}
}