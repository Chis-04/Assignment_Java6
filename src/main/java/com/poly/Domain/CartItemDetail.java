package com.poly.Domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CartItemDetails")
public class CartItemDetail implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer cartDetailID;
	private Integer quantity;
	private Double realPrice;

	@ManyToOne
	@JoinColumn(name = "productID")
	private Products products;

	@ManyToOne
	@JoinColumn(name = "cartID")
	private CartItem cartItems;
}
