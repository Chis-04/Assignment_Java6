package com.poly.Domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
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
@Table(name = "Accounts")
public class Account implements Serializable {
	@Id
	private String email;
	@Column(columnDefinition = "nvarchar(100) not null")
	private String name;
	@Column(columnDefinition = "nvarchar(500) not null")
	private String photo;

	private String password;
	@Temporal(TemporalType.DATE)
	private Date registerDate;
	@JsonIgnore
	@OneToMany(mappedBy = "account", fetch = FetchType.LAZY)
	@Cascade(value = { CascadeType.SAVE_UPDATE })
	@OnDelete(action = OnDeleteAction.CASCADE)
	Set<AccountRoles> accountRoles;

	@JsonIgnore
	@OneToMany(mappedBy = "accountoder", fetch = FetchType.LAZY)
	@Cascade(value = { CascadeType.SAVE_UPDATE })
	@OnDelete(action = OnDeleteAction.CASCADE)
	Set<Order> order;

	@JsonIgnore
	@OneToMany(mappedBy = "accountCart", fetch = FetchType.LAZY)
	@Cascade(value = { CascadeType.SAVE_UPDATE })
	@OnDelete(action = OnDeleteAction.CASCADE)
	Set<CartItem> cartitem;
}
