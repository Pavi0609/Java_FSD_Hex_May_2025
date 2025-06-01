package com.ecom.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

import com.ecom.Dao.CustomerDao;
import com.ecom.Dao.ProductDao;
import com.ecom.Dao.PurchaseDao;
import com.ecom.Dao.Impl.CustomerDaoImpl;
import com.ecom.Dao.Impl.ProductDaoImpl;
import com.ecom.Dao.Impl.PurchaseDaoImpl;
import com.ecom.Enums.Coupon;
import com.ecom.Exception.InvalidIdException;
import com.ecom.Model.Customer;
import com.ecom.Model.Product;
import com.ecom.Model.Purchase;

public class PurchaseService {
	
    private PurchaseDao purchaseDao = new PurchaseDaoImpl();
    private CustomerDao customerDao = new CustomerDaoImpl();
    private ProductDao productDao = new ProductDaoImpl();

    public void insert(int customerId, int productId, Scanner scanner) throws InvalidIdException {
    	
        Customer customer = customerDao.getById(customerId);
        
        Product product = productDao.getById(productId);

        System.out.print("Enter coupon code or press Enter for none: ");
        String couponInput = scanner.nextLine().toUpperCase().trim();

        Coupon coupon = null;
        if (!couponInput.isEmpty()) {	
            try {
                coupon = Coupon.valueOf(couponInput);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid coupon code!");
            }
        }

        double discountPercent = coupon == null ? 0 : coupon.getDiscount();
        double discountAmount = product.getPrice() * discountPercent / 100;
        double amountToPay = product.getPrice() - discountAmount;

        Purchase purchase = new Purchase();
        purchase.setCustomer(customer);
        purchase.setProduct(product);
        purchase.setCoupon(coupon);
        purchase.setAmountPaid(amountToPay);
   
        String currentDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        purchase.setDateOfPurchase(currentDate);

        purchaseDao.insert(purchase);
    }
}
