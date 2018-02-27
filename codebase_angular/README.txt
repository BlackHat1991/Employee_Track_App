# Angular-2 Set up IOT
  
 Pre-Requisite:
  npm = 3.10.10
  node = 6.9.3 
 
   
 1. cd to the directory where you have pull this repository code and run the following commands:
   - "npm install"   //required only once
   - create an empty director under "src" folder by name "meta" 
   - "npm run build:prod"  //this will compile the code
   - "npm run server:prod"    // this will start a http server

 2. This should launch the application on our browser, please use user1@testing.com and pw: 123456 to login as admin. 

 3. Next you need to setup all the users, followed by customers and their location.
 
 # Building Application for Android
 
 1. cd to the directory where you have pull this repository code and run the following commands:
 
	npm install -g cordova
	
 2. Create Directory by Folder name 'www' and run following command:
	
	- "cordova platform add android"
	
	- "npm run build:dev" //this will compile the code generate dist folder
	
 3. Copy all the files from dist folder to www folder.
 
INSERT INTO t_user VALUES (10, '2017-02-24 18:24:34.407', '2017-02-24 18:24:34.407', 'user1@test.com', 'Admin', 'test', '$2a$10$lOl6fTDHIBQ/MaVjjtIQa.tMDQx69H6b3FwVVu39IYyqs4.VKGo8u', 'ADMIN', NULL);
 
  