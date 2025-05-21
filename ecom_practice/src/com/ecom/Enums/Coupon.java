package com.ecom.Enums;

public enum Coupon {
	PROMO_CODE20(5),
	GREATINDIANFESTIVAL(10),
	FLASHDEAL(15),
	BIRTHDAYBONUS(20);

    private final int discount;

    Coupon(int discount) {
        this.discount = discount;
    }

    public int getDiscount() {
        return discount;
    }
}