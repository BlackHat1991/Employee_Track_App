<%@page import="java.security.MessageDigest"%>
<%@page import="java.security.NoSuchAlgorithmException"%>
<html>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	
	<script type="text/javascript">
        
		
		function submitPayuForm(value, al) {
			var successStatus='<%= request.getAttribute("amount") %>';
			console.log("status: " + value +" " +  al );
            jQuery(document).ready(function($) {
			
			 $.ajax({
                     type: "GET",
                     contentType : "application/json",
                     url:"http://localhost:8080/rest/order/updateOrderedItems",
                     data: { status : value,
                        transactionIds : al },
                     success : 
                    function(response) {
                    },
                    error: function(response) {
                        //alert('mail failed');
                    },
                    done : function(e) {
                       //alert('done');
                    }
                 });
            });
			
			}
		
		/* $(document).ready(function(){
    
            $("#submit").click(function(){
				if(validation()){
					var EmailData = {
                         name : $("#name").val(),
                        email : $("#email").val(),
                        message : $("#message").val()
                     }
                $.ajax({
                     type: "GET",
                     contentType : "application/json", 
                     url:"http://31.220.7.107:8080/IOT/rest/admin/submitEmail",
                     data: { name : $("#name").val(),
                        email : $("#email").val(),
                        message : $("#message").val() },
                     success : 
                    function(response) {
                        document.getElementById("successMail").style.display = "block";
                        document.getElementById("name").value = '';
                        document.getElementById("email").value = '';
                        document.getElementById("message").value = '';
                    },
                    error: function(response) {
                        //alert('mail failed');
                    },
                    done : function(e) {
                       //alert('done');
                    }
                 });	
				}
                
            });
          });*/
		
		</script>
	
    <body >

   
<%
        String amount = request.getParameter("amount");
	String productinfo= request.getParameter("productinfo");
	String txnid = request.getParameter("txnid");
	String phone = request.getParameter("phone");
	String firstname = request.getParameter("firstname");
	String key = request.getParameter("key");
	String salt = request.getParameter("salt");;
	String status = request.getParameter("status");
	String r_h =request.getParameter("hash");
        String hashString="";
        String udf1 =request.getParameter("udf1");
        String udf2 =request.getParameter("udf2");
        String udf3 =request.getParameter("udf3");
        String udf4 =request.getParameter("udf4");
        String udf5 =request.getParameter("udf5");
        String p_Id = request.getParameter("mihpayid");
        String additionalCharges = request.getParameter("additionalCharges");
        out.println("Your paymnet with Payment ID is :" + p_Id + "is ");
        //String udf2 = request.getParameter("udf2");
        String hash;
        String email = request.getParameter("email");
        if(status=="success"){
                if(additionalCharges!=null){
		String hashSequence = additionalCharges+"|"+salt+"|"+status+"||||||"+udf5+"|"+udf4+"|"+udf3+"|"+udf2+"|"+udf1+"|"+email+"|"+firstname+"|"+productinfo+"|"+amount+"|"+txnid+"|";
		
		
			hashString=hashSequence.concat(key);
                        out.println(hashString);
                        hash=hashCal("SHA-512",hashString);
                        out.println(hash);
			if(r_h.equals(hash)){
		         out.println("Successfull with additiona charges");
                        out.println("Transaction details:");
                            out.println("Amount:"+amount);
                            out.println("additionalCharges:"+additionalCharges);
                            out.println("Status of Transaction:"+status);}
			                  
                        else {out.println("Transaction details:");
                            out.println("Amount:"+amount);
                            out.println("additionalCharges:"+additionalCharges);
                            out.println("Status of Transaction:"+status);
                        }
                }
                else {
                String hashSequence = salt+"|"+status+"||||||"+udf5+"|"+udf4+"|"+udf3+"|"+udf2+"|"+udf1+"|"+email+"|"+firstname+"|"+productinfo+"|"+amount+"|"+txnid+"|";
		
		
			hashString=hashSequence.concat(key);
                        out.println(hashString);
                        hash=hashCal("SHA-512",hashString);
                        out.println(hash);
			if(r_h.equals(hash)){
		         out.println("Successfull");
                        out.println("Transaction details:");
                            out.println("Amount:"+amount);
                            out.println("additionalCharges:"+additionalCharges);
                            out.println("Status of Transaction:"+status);}
			                  
                        else{ out.println("failure");
                        out.println("Transaction details:");
                            out.println("Amount:"+amount);
                            out.println("additionalCharges:"+additionalCharges);
                            out.println("Status of Transaction:"+status);}
                }	
        }else {out.println("Transaction details:");
                            out.println("Amount:"+amount);
                            out.println("additionalCharges:"+additionalCharges);
                            out.println("Status of Transaction:"+status);
   				%>
        <script>
        submitPayuForm('<%=status%>', '<%=txnid%>'); //No need to put java script code inside scriptlet
        </script>
    	<%
                        }
	%>
<%!
	public String hashCal(String type,String str){
		byte[] hashseq=str.getBytes();
		StringBuffer hexString = new StringBuffer();
		try{
		MessageDigest algorithm = MessageDigest.getInstance(type);
		algorithm.reset();
		algorithm.update(hashseq);
		byte messageDigest[] = algorithm.digest();
            
		
		for (int i=0;i<messageDigest.length;i++) {
			String hex=Integer.toHexString(0xFF & messageDigest[i]);
			if(hex.length()==1) hexString.append("0");
			hexString.append(hex);
		}
			
		}catch(NoSuchAlgorithmException nsae){ }
		
		return hexString.toString();
	}
%>
    </body>
</html>