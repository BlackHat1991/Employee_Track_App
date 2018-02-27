package com.elan.empApp.model;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "T_CUSTOMER")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Customer extends AbstractAuditingEntity implements Serializable {
	private static final long serialVersionUID = -7722544975069356302L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "NAME", length = 250)
    private String name;
	
	@Column(name = "CITY", length = 250)
    private String city;
	 
	@Column(name = "CUSTOMER_KEY", length = 250)
    private String customerKey;
	
	@Column(name = "COUNTRY", length = 250)
    private String country;
	
	@Column(name = "ADDRESS", length = 250)
    private String address;
	
	@JsonIgnore
	@Column(name = "SYSTEM_DELETE")
	private Boolean systemDelete;
	
	@ManyToMany(cascade = CascadeType.PERSIST)
	@JoinTable(name = "USER_CUSTOMER_GRP", joinColumns = @JoinColumn(name = "CUSTOMER_ID", referencedColumnName = "ID", nullable = false, updatable = false), inverseJoinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID", nullable = false, updatable = false))
	private List<User> users = new ArrayList<User>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCustomerKey() {
		return customerKey;
	}

	public void setCustomerKey(String customerKey) {
		this.customerKey = customerKey;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Boolean getSystemDelete() {
		return systemDelete;
	}

	public void setSystemDelete(Boolean systemDelete) {
		this.systemDelete = systemDelete;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}
}
