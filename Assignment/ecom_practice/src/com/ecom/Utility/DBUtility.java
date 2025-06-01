package com.ecom.Utility;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtility {
	
	private String url="jdbc:mysql://localhost:3307/ecom_practice";
	private String userDB="root";
	private String passDB="root";
	private String driver="com.mysql.cj.jdbc.Driver";
	
	private Connection con;
	private static DBUtility db = new DBUtility();
	
	private DBUtility() {}
	
	public static DBUtility getInstance() {
		return db;
	}
	
	public Connection connect() {
		
		try {
			Class.forName(driver);
		} catch (ClassNotFoundException e) {
			System.out.println(e.getMessage());
		}
		
		try {
			con=DriverManager.getConnection(url,userDB,passDB);
			
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return con;
	}
	
	public void close() {
		try {
			if(!con.isClosed())
				con.close();
		} catch (Exception e) {
		System.out.println(e.getMessage());
		}
	}
}