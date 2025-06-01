package com.ecom.Model;

import com.ecom.Enums.Coupon;

public class Purchase {
	private int id;
    private Customer customer;
    private Product product;
    private String dateOfPurchase;
    private Coupon coupon;
    private double amountPaid;
    
	public Purchase () {}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}

	public String getDateOfPurchase() {
		return dateOfPurchase;
	}
	public void setDateOfPurchase(String dateOfPurchase) {
		this.dateOfPurchase = dateOfPurchase;
	}

	public Coupon getCoupon() {
		return coupon;
	}
	public void setCoupon(Coupon coupon) {
		this.coupon = coupon;
	}

	public double getAmountPaid() {
		return amountPaid;
	}
	public void setAmountPaid(double amountPaid) {
		this.amountPaid = amountPaid;
	}

	@Override
	public String toString() {
		return "Purchase [id=" + id + ", customer=" + customer + ", product=" + product + ", dateOfPurchase=" + dateOfPurchase + ", coupon=" + coupon + ", amountPaid=" + amountPaid + "]";
	}
}