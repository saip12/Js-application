var isValidForm=false;
$(document).ready(function(){

	//hide the shipping-company

	if($.cookie('formSaved')){
		
		$(".wine-already-ordered").show();
		$("#wine-order-form").hide();
	}
	selectCurrentRegion();
	$("#shipping-company").hide();
	$("#commercial").on('click',function(){
		$("#shipping-company").show();
	});
	$("#residential").on('click',function(){
		$("#shipping-company").hide();
	});
	$("#submit-form").on('click',function(){
		//validate Email Address
		validateEmailAddressInForm();
		validateEmailAddressInFormAreSame();
		validateUSPhoneNumber();


		//if form submit is valid then set cookies and move it to next page

		if(validateEmailAddressInForm() && validateEmailAddressInFormAreSame() && validateUSPhoneNumber()){
			//set Cookies
			$.cookie('formSaved', 'true');
			//get all the values in an array
			var formValue=[];
			formValue[0]=$("#email-address").val();
			formValue[1]=$("#email-address-confirm").val();
			formValue[2]=$("#first-name").val();
			formValue[3]=$("#last-name").val();
			formValue[4]=$("#address-1").val();
			formValue[5]=$("#address-2").val();
			formValue[6]=$("#city").val();
			formValue[7]=$("#shipping-state").val();
			formValue[8]=$("#zip").val();
			formValue[9]=$("#phone").val();
			formValue[10]=$("input[name='addressorComm']:checked").val();
			formValue[11]=$("#company").val();

			console.log("Form Submitted with Values"+formValue);
			//hide the form and show message
			$(".wine-already-ordered").show();
			$("#wine-order-form").hide();

		}

	});

	$('#stateValue').change(function() {
    	var val = $("#stateValue option:selected").text();
    	var unEligibleState=['CA','MA','NY','MD','PA'];
    	if(unEligibleState.indexOf(val)>=0){
    	//if(val==='NY' || val==='CA' || val==='MA'){

    		$("#submit-form").hide();
    		$("#confirmStateError").show();
    		isValidForm=false;
    		return false;


    	}
    	else{
    			$("#submit-form").show();
    			$("#confirmStateError").hide();
    			isValidForm=true;
    			return true;


	}

});

	

});

function selectCurrentRegion(){
	$.get("http://ipinfo.io", function(response) {
	    var state_code=getUSStateCode(response.region);
	    $("#stateValue").val(state_code);
	}, "jsonp");
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validateEmailAddressInForm(){

	    var email=$("#email-address").val();
		var isValidEmail=validateEmail(email);
		if(!isValidEmail){
			$("#emailError").show();
			isValidForm=false;
			return false;
			
		}
		else{
			$("#emailError").hide();
			isValidForm=true;
			return true;
			
		}
}
function validateEmailAddressInFormAreSame(){

	var email=$("#email-address").val();
	var confirm_email=$("#email-address-confirm").val();
	if(email!==confirm_email){
		$("#confirmemailError").show();
		isValidForm=false;
		return false;
	}
	else{
		$("#confirmemailError").hide();
		isValidForm=true;
		return true;
	}

}

function validateUSPhoneNumber(){
	var phone_no=$("#phone").val();
	var isValidPhone=validatePhone(phone_no);
	if(isValidPhone){
		
		$("#phoneError").hide();
		isValidForm=true;
		return true;

	}
	else{
		$("#phoneError").show();
		isValidForm=false;
		return false;

	}
}

function validatePhone(phoneNumber){
   var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;  
   return phoneNumberPattern.test(phoneNumber); 
}

function getUSStateCode(name){
	var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    for(var i=0;i<states.length;i++){
    	if(states[i][0]===name){
    		return states[i][1];

    	}
    }
}