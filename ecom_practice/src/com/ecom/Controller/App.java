package com.ecom.Controller;

import java.util.Scanner;

import com.ecom.Model.Product;
import com.ecom.Service.ProductService;
import com.ecom.Service.PurchaseService;
import com.ecom.Exception.InvalidIdException;
import com.ecom.Exception.InvalidInputException;

public class App {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ProductService productService = new ProductService();
        PurchaseService purchaseService = new PurchaseService();
        
        while (true) {
            System.out.println("******************** MAIN MENU ****************");
            System.out.println("1. Add Product");
            System.out.println("2. Get Products by Category");
            System.out.println("3. Add Purchase Details");
            System.out.println("0. Exit");
            System.out.println("***********************************************");
            System.out.print("Enter your choice: ");
            
            int choice = scanner.nextInt();
            scanner.nextLine();  // Consume newline
            
            if (choice == 0) {
                System.out.println("Exiting... Thank you!");
                break;
            }
            
            switch (choice) {
                case 1:
                    Product product = new Product();
                    System.out.print("Enter Product Name: ");
                    product.setTitle(scanner.nextLine());
                    
                    System.out.print("Enter Price: ");
                    product.setPrice(scanner.nextDouble());
                    scanner.nextLine();
                    
                    System.out.print("Enter Description: ");
                    product.setDescription(scanner.nextLine());
                    
                    System.out.print("Enter Category ID: ");
                    int categoryId = scanner.nextInt();
                    scanner.nextLine();
                    
                    try {
                        productService.insertProduct(product, categoryId);
                        System.out.println("Product added successfully.");
                    } catch (InvalidIdException | InvalidInputException e) {
                        System.out.println("Error: " + e.getMessage());
                    }
                    break;
                    
                case 2:
                    System.out.print("Enter Category ID to fetch products: ");
                    int catId = scanner.nextInt();
                    scanner.nextLine();
                    try {
                        productService.getByCategoryId(catId)
                            .forEach(p -> System.out.println(p.getId() + "\t" + p.getTitle() + "\t" + p.getPrice() + "\t" + p.getDescription() + "\t" + p.getCategory().getName()));
                    } catch (InvalidIdException e) {
                        System.out.println("Error: " + e.getMessage());
                    }
                    break;
                    
                case 3:
                    System.out.print("Enter Customer ID: ");
                    int customerId = scanner.nextInt();
                    
                    System.out.print("Enter Product ID: ");
                    int productId = scanner.nextInt();
                    scanner.nextLine();
                    
                    try {
                        purchaseService.insert(customerId, productId, scanner);
                        System.out.println("Purchase details added successfully.");
                    } catch (InvalidIdException e) {
                        System.out.println("Error: " + e.getMessage());
                    } catch (IllegalArgumentException e) {
                        System.out.println("Invalid coupon code!");
                    }
                    break;
                    
                default:
                    System.out.println("Invalid input! Please try again.");
                    break;
            }
            
            System.out.println();
        }
        
        scanner.close();
    }
}