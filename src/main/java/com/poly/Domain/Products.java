package com.poly.Domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Products")
public class Products implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer productID;
	@Column(columnDefinition = "nvarchar(50) not null")
	private String name;
	private Integer quantity;
	private Double unitPrice;
	@Column(columnDefinition = "nvarchar(500)")
	private String image;
	@Column(columnDefinition = "nvarchar(500) not null")
	private String description;
	private Integer discount;
	@Temporal(TemporalType.DATE)
	private Date enteredDate;

	@ManyToOne
	@JoinColumn(name = "brandID")
	private Brand brand;

	@ManyToOne
	@JoinColumn(name = "categoryID")
	private Category category;

	@JsonIgnore
	@OneToMany(mappedBy = "productOrder", fetch = FetchType.LAZY)
	@Cascade(value = { CascadeType.SAVE_UPDATE })
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Set<OrderDetail> orderDetails;

	@JsonIgnore
	@OneToMany(mappedBy = "products", fetch = FetchType.LAZY)
	@Cascade(value = { CascadeType.SAVE_UPDATE })
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Set<CartItemDetail> cartDetail;
}
