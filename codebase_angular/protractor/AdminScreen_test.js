describe('Login', function () {
	
    it('Login TO RMC and Select Customer', function () {
		browser.waitForAngularEnabled(false);
        browser.get('http://31.220.7.107:8080/IOT/');
		
		browser.executeScript('document.querySelector(\'[id="demo"]\').style.display = "block"');
		browser.executeScript('document.querySelector(\'[id="demo1"]\').style.display = "none"');
		element(by.id('username')).sendKeys('user1@testing.com');
		element(by.id('password')).sendKeys('123456');
		var loginId = element(by.id('loginButton'));
		loginId.click();
		browser.sleep('3000');
		
		//Selecting the customers
		var customerHeader = element(by.id('customerLinkHeader'));
		customerHeader.click();
		browser.sleep('3000');
	});
	
	it(' Adding Customer', function () {
		//Adding the customer to the list
		element(by.cssContainingText('.btn-primary', 'Add Customer')).click();
		browser.sleep('3000');
		element(by.css('[name="name"]')).sendKeys('Tests');
		element(by.css('[name="customerCity"]')).sendKeys('TestsCity');
		element(by.css('[name="customerAddress"]')).sendKeys('TestsAdress');
		element(by.css('[name="customerCountry"]')).sendKeys('India');
		element(by.id('customerRole')).click();
		element.all(by.css('.dropdown-item')).get(0).click();
		element(by.id('csrRole')).click();
		element.all(by.css('.dropdown-item')).get(0).click();
		element(by.id('csrRole')).click();
		browser.sleep('1000');
		element(by.id('saveCustomerButton')).click();
		browser.sleep('6000');		
	});	
		
	it(' Edit Customer', function () {
		//Edit the customer and will save the customer		
		element.all(by.css('.fa-pencil')).get(0).click();
		element(by.css('[name="name"]')).sendKeys('Tests1234');
		element(by.css('[name="customerCity"]')).sendKeys('TestsCity123');
		element(by.id('saveCustomerButton')).click();
		browser.sleep('6000');	
	});
	
	it(' Deleting Customer', function () {
		//Delete the customer and will add the customer
		element.all(by.css('.fa-trash')).get(0).click();
		browser.sleep('3000');
    });
	
	
	it(' Selecting Location', function () {
		//Selecting the Location
		var locationHeader = element(by.id('locationLinkHeader'));
		locationHeader.click();
		browser.sleep('3000');
    });
	
	it(' Adding Location',  function (){
		//Adding the Location to the list
		element(by.cssContainingText('.btn-primary', 'Add Location')).click();
		browser.sleep('3000');
		element(by.css('[name="locationName"]')).sendKeys('TestsLocationName');
		element(by.css('[name="locAddress"]')).sendKeys('TestsLocationCity');
		element(by.css('[name="locZipcode"]')).sendKeys('12345');
		browser.sleep('3000');
		element(by.css('[name="locCountry"]')).sendKeys('India');
		browser.sleep('3000');
		
		var selectDropdownElement= element(by.css('[name="customer"]'));
		selectDropdownElement.all(by.tagName('option'))
			  .then(function (options) {
				  options[2].click();
			  });
		
		element(by.id('customerRole')).click();
		element.all(by.css('.dropdown-item')).get(0).click();
		element(by.id('csrRole')).click();
		element.all(by.css('.dropdown-item')).get(0).click();
		element(by.id('csrRole')).click();
		browser.sleep('1000');
		element(by.id('saveLocationButton')).click();
		browser.sleep('3000');		
		
	});
	
	it(' Editing Location',  function (){
		
		//Edit the Location and will save the customer		
		element.all(by.css('.fa-pencil')).get(0).click();
		element(by.css('[name="locationName"]')).sendKeys('Tests1234');		
		element(by.css('[name="locAddress"]')).sendKeys('TestsCity123');
		element(by.id('saveLocationButton')).click();
		browser.sleep('3000');	
		
	});
	
	it(' deleting Location',  function (){	
		//Delete the Location and will add the customer
		element.all(by.css('.fa-trash')).get(0).click();
		browser.sleep('3000');
    });
	
	it(' Selecting User', function () {
		//Selecting the User
		var locationHeader = element(by.id('userLinkHeader'));
		locationHeader.click();
		browser.sleep('3000');
    });
	
	it(' Adding User', function () {
		//Adding the User to the list
		element(by.cssContainingText('.btn-primary', 'Add User')).click();
		browser.sleep('3000');
		element(by.css('[name="firstName"]')).sendKeys('Tests');
		element(by.css('[name="lastName"]')).sendKeys('TestsCity');
		element(by.css('[name="email"]')).sendKeys('TestsAdress');
		element(by.css('[name="pwd"]')).sendKeys('India');
		
		var selectDropdownElement= element(by.id('userRoles'));
		selectDropdownElement.all(by.tagName('option'))
		  .then(function (options) {
			  options[2].click();
		  });
		  
		browser.sleep('3000');
		element(by.id('saveUserButton')).click();
		browser.sleep('3000');		
	});
	
	it(' Deleting User', function () {
		//Delete the User and will add the User
		element.all(by.css('.fa-trash')).get(0).click();
		browser.sleep('6000');
    });
   
});

