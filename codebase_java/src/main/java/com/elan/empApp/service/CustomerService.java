package com.elan.empApp.service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.elan.empApp.model.Customer;
import com.elan.empApp.repository.CustomerRepository;

@Service("customerService")
public class CustomerService {
	
	@Inject
	CustomerRepository customerRepository;
	
	@PersistenceContext
	private EntityManager entityManager;
	
	
	public Customer saveCustomer(Customer customer){
		if (customer.getId() == null) {
			customer = entityManager.merge(customer);
		}
		customer = customerRepository.saveAndFlush(customer);
		return customer;
	}
	
	public List<Customer> fetchCustomers(String custIDs){
		custIDs = custIDs.replace(" ", "");
		String[] custlist = custIDs.split(",");
		
		List<Long> custListLong = new ArrayList<Long>();
		
		if(custlist != null) {
			for (int i = 0; i < custlist.length; i++) {
				custListLong.add(Long.parseLong(custlist[i]));
			}
		}
		
		String hql="select c from Customer c where (c.systemDelete = null or c.systemDelete= false) ";
		if(custListLong != null && custListLong.size() > 0){
			hql += " and c.id in :custlist";			
		}
		hql += " order by name";
		Query query= entityManager.createQuery(hql);
		query.setParameter("custlist", custListLong); 
		
		return query.getResultList();
	}
	
	public List<Customer> allList(){
		String hql="select c from Customer c where (c.systemDelete = null or c.systemDelete= false) order by name ";
		Query query= entityManager.createQuery(hql);
		return query.getResultList();
	}
	
	public String generateCustomerKey() {
		Calendar cal = Calendar.getInstance();
		Integer year = cal.get(Calendar.YEAR) - 2000;
		Integer month = cal.get(Calendar.MONTH) + 1;
		Integer date = cal.get(Calendar.DATE);
		DecimalFormat twoDigits = new DecimalFormat("00");

		String prefix = "WC-CK"+year.toString() + twoDigits.format(month) + twoDigits.format(date) + "-";
		String prefixMatch = prefix + "%";
		Query q = entityManager.createQuery("select count(o) from Customer o where o.customerKey like :x");
		q.setParameter("x", prefixMatch);
		Long count = (Long) q.getSingleResult();
		if (count != null) {
			count++;
			DecimalFormat formatter = new DecimalFormat("0000");
			prefix += formatter.format(count);

			return prefix;
		}

		return null;
	}
	
	public List<Long> getCustomerIds(Long userId){
		String hql="select l.id from t_customer l join user_customer_grp u on u.customer_id = l.id where u.user_id= "+userId+"";
		Query query=entityManager.createNativeQuery(hql);
		return query.getResultList();	
	}

}
