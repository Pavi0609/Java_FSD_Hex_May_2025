package com.ecom.Model;

public class Product {
	private int id;
	private String title;
	private Double price;
	private String description;
	private Category category;
	
	public Product() {}

	public Product(int id, String title, Double price, String description, Category category) {
		super();
		this.id = id;
		this.title = title;
		this.price = price;
		this.description = description;
		this.category = category;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}

	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", title=" + title + ", price=" + price + ", description=" + description + ", category=" + category + "]";
	}	
}