package com.elan.empApp.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.elan.empApp.dto.UserDataViewDTO;
import com.elan.empApp.model.Customer;
import com.elan.empApp.repository.CustomerRepository;
import com.elan.empApp.service.CustomerService;

@Controller
@RequestMapping("/rest/customer")
public class CustomerController extends AbstractController {
	
	@Inject
	CustomerService customerService;
	
	@Inject
	CustomerRepository customerRepository;
	
	@RequestMapping(value = "/save",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Customer> saveCustomer(@RequestBody Customer customer) throws Exception {
		if (customer.getCustomerKey() == null || customer.getCustomerKey() == "") {
			customer.setCustomerKey(customerService.generateCustomerKey());
		}
		customer = customerService.saveCustomer(customer);
		return new ResponseEntity<Customer>(customer, HttpStatus.OK);
    }
	
	@RequestMapping(value = "/delete/{id}",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Customer> deleteCustomer(@PathVariable("id") Long id) throws Exception {
		Customer customer = customerRepository.findOne(id);
		customer.setSystemDelete(true);
		customer = customerService.saveCustomer(customer);
		return new ResponseEntity<Customer>(customer, HttpStatus.OK);
    }
	
	@RequestMapping(value = "/allCustomerList",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Customer>> allCustomer() throws Exception {
		List<Customer> customers = new ArrayList<Customer>();
		customers = customerService.allList();
		return new ResponseEntity<List<Customer>>(customers, HttpStatus.OK);
    }
	
	@RequestMapping(value = "/list",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Customer>> fetchCustomers(String userEmail, String type) throws Exception {
		List<Customer> customers = new ArrayList<Customer>();
		UserDataViewDTO userDataviewDTO = null;
		//Following code is added to retain customer dropdown list for specific user.
		if(type != null && type.equalsIgnoreCase("selectDropDown")){
			userDataviewDTO = USER_SpecificDATA.get(userEmail);
		}else{
			userDataviewDTO = USER_DATA.get(userEmail);
		}
		if(userDataviewDTO != null){
			String custlist = userDataviewDTO.getCustList();
	    	if(custlist != null){
	    		custlist = custlist.replace("[","");
		    	custlist = custlist.replace("]","");
	    	}
	    	if(!custlist.isEmpty()){
	    		customers = customerService.fetchCustomers(custlist);
	    	}	
		}
        return new ResponseEntity<List<Customer>>(customers, HttpStatus.OK);
    }

}
