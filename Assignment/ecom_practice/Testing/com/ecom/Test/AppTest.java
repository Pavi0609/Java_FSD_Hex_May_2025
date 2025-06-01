package com.ecom.Test;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Scanner;
import com.ecom.Exception.InvalidIdException;
import com.ecom.Exception.InvalidInputException;
import com.ecom.Model.Product;
import com.ecom.Service.ProductService;
import com.ecom.Service.PurchaseService;

public class AppTest {

    ProductService productService;
    PurchaseService purchaseService;
    Scanner scanner;

    @BeforeEach
    public void init() {
        productService = new ProductService();
        purchaseService = new PurchaseService();
        scanner = new Scanner(System.in);
    }

    @Test
    public void addProductTest() throws InvalidIdException {
       
        System.out.println("Testing Add Product");

        //1: Add a valid product
        Product product = new Product();
        product.setTitle("Samsung Galaxy");
        product.setPrice(40000.0);
        product.setDescription("Latest model with advanced features");

        assertDoesNotThrow(() -> {
            productService.insertProduct(product, 1);  //category ID is 1 
        });

        // 2: Invalid Product name if product namw is Empty means throw the - InvalidInputException
        product.setTitle("");
        InvalidInputException exception = assertThrows(InvalidInputException.class, () -> {
            productService.insertProduct(product, 1);  
        });
        assertEquals("Product name cannot be empty".toLowerCase(), exception.getMessage().toLowerCase());

        // 3: Invalid Category ID 
        product.setTitle("vivo v3");
        InvalidIdException idException = assertThrows(InvalidIdException.class, () -> {
            productService.insertProduct(product, 9999); 
        });
        assertEquals("ID given is Invalid".toLowerCase(), idException.getMessage().toLowerCase());
    }

    @Test
    public void getProductsByCategoryTest() {

        System.out.println("Testing Get Products by Category");

        // 1: Fetch products by valid category ID
        assertDoesNotThrow(() -> {
            productService.getByCategoryId(1);  
        });

        // 2: Invalid Category ID 
        InvalidIdException exception = assertThrows(InvalidIdException.class, () -> {
            productService.getByCategoryId(999); 
        });
        assertEquals("Invalid Category ID : No products found".toLowerCase(), exception.getMessage().toLowerCase());
    }

    @Test
    public void addPurchaseDetailsTest() {

        System.out.println("Testing Add Purchase Details");

        // with coupon code
        assertDoesNotThrow(() -> {
        	purchaseService.Purchase(2, 3, new Scanner("BIRTHDAYBONUS\n"));
            
        });

        // without coupon code
        assertDoesNotThrow(() -> {
            purchaseService.Purchase(2, 2, new Scanner("\n"));
        });

        // Invalid Customer ID
        InvalidIdException customerException = assertThrows(InvalidIdException.class, () -> {
            purchaseService.Purchase(999, 1, new Scanner("\n"));
        });
        assertEquals("ID given is Invalid".toLowerCase(), customerException.getMessage().toLowerCase());

        // Invalid Product ID
        InvalidIdException productException = assertThrows(InvalidIdException.class, () -> {
            purchaseService.Purchase(1, 74189, new Scanner("\n"));
        });
        assertEquals("ID given is Invalid".toLowerCase(), productException.getMessage().toLowerCase());
    }   
}