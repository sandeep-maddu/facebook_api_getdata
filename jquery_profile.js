$(document).ready(function() {
		
	var token='EAACEdEose0cBADlqxQ1fLhaWIU3qOKFmvpyNOOrNXd0fRGwZCW5ToYHaFYIlusXaQnM1S9m02ZCzMUJZBOz5J1ezCS2XWdOLv3dD4tNQCrZAilEe8xVKCk4ZBeURN8r7DZCAMMayWtc0dsNXPNzmpZAguHHTndkBEwMZCnByjHHyTSt1wyZCZAhQlHFpV9W6qfgIBHqeEuwlrg9wZDZD';
	var fields='fields=address,id,name,birthday,education,email,about,age_range,context,cover,devices,favorite_athletes,favorite_teams,hometown,inspirational_people,interested_in,currency,first_name,gender,languages,last_name,location,middle_name,is_verified,link,locale,name_format,political,quotes,relationship_status,religion,meeting_for,install_type';
	//display is designed for only three fields - name, email, city - but object returned by API has all the above fields which we can display if we want
	var facebookGraphURL='https://graph.facebook.com/me?access_token='+token+'&'+fields;
	
	function getFacebookData_default(facebookGraphURL) {     //ajax call if user did not enter his token - we need to display default information
		
	$.ajax({
    url: facebookGraphURL,
    dataType: 'json',
    success: function(data, status) {
      //console.log(data);
	  //console.log(status);
	  $("#name").html(data.name);    //fill the name field in table with user name
	  $("#email").html(data.email);  //fill the email field in table with user email
	  $("#city").html(data.hometown.name);  //fill the city field in table with user city
	  },
    error: function(status) {
      $("#yoursoption").hide();    //since error, clear the screen and show just the error message
	  $("#errormessage").html("Error: "+status.responseJSON.error.message+" The token is normally valid for two hours. I don't think you can see my data now. However enter your token to see your data");
	  $("#errormessage").show();  //display the error message
	  $("#profile").hide(); //hide the result table
	  $("#back").show(); //after showing error message, give option to user to go back to home page
	 
    }
})
	} //end getFacebookData_default
	
	
	function getFacebookData_userentry(facebookGraphURL) {    //ajax call if user has entered his token
		
	$.ajax({
    url: facebookGraphURL,
    dataType: 'json',
    success: function(data, status) {    //if call is successful
      //console.log(data);
	  //console.log(status);
	  $("#name").html(data.name);   //populate name field in table with name returned by the API
	  $("#email").html(data.email); //populate email field in table with email returned by the API
	  $("#city").html(data.hometown.name); //populate city field in table with city returned by the API
	  
	  $("#profile").show();   //display the table containing profile information
	  $("#entrytext").hide();  //since output is being shown, no need to show entry options like enter token, etc.
	  $("#showmineoption").hide();  //since output is being shown, no need to show - I want to see mine 
	  $("#back").show();  //after showing error message, give option to user to go back to home page
	  
    },
    error: function(status) {   //if call failed
      $("#entrytext").hide();
	  $("#yoursoption").hide(); //since error, clear the screen and shouw just the error message
	  $("#errormessage").html("Error: "+status.responseJSON.error.message+". Please enter valid token");
	  $("#errormessage").show();  //display the error message
	  $("#profile").hide(); //hide the result table
	  $("#back").show(); //after showing error message, give option to user to go back to home page
	  //console.log(status)
	      }
})
	} //end getFacebookData_userentry
	
	
	$("#profile").hide();  //on page load, table and errormessage are hidden i.e. table containing profile information
	$("#errormessage").hide();
	$("#back").hide();
	
	$("#yoursoption").click(function() {             //if user selects No thanks show yours, call relevant function
		getFacebookData_default(facebookGraphURL);
		$("#entrytext").hide();    //since output is being shown, no need to show entry options like enter token, etc.
		$("#profile").show();      //table containing profile information is displayed
		
	});
	
	$("#showmineoption").click(function() {
		$("#profile").hide();  //since user now wants to see his Facebook data, we need to hide the table of default user
		$("#entrytext").show(); //since user now wants to see his Facebook data, we need to display entry options like enter token, etc.
		$("#usertoken").val(''); //clears past entered token if any
		});
	
	$("#submit").click(function() {
		var usertoken=$("#usertoken").val();
		if(usertoken!='') {    //if something is entered in token field
		var url='https://graph.facebook.com/me?access_token='+usertoken+'&'+fields;
		getFacebookData_userentry(url);  //ajax call with entered token as parameter
		}
		else {            //if token field is blank
			$("#yoursoption").hide();     //hide - No thanks show yours 
			$(".intro").hide();   //hide entry screen- Want to see your Facebook profile, enter tken, etc.
			$("#errormessage").show();   //show the error message
			$("#errormessage").text("You have not entered token. Please enter valid token");
			$("#back").show(); //after showing error message, give option to user to go back to home page
			//console.log("Please enter valid token");
			}
		});
	
	$("back").click(function() {
	$("#name").html(''); //clears name field of table since we will now populate it with name of user
    $("#email").html(''); //clears name field of table since we will now populate it with email of user
    $("#city").html(''); //clears name field of table since we will now populate it with city of user
	});
	
	});

	
