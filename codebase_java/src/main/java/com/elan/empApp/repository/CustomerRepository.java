package com.elan.empApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elan.empApp.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
