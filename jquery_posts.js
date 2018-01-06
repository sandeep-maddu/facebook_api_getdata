$(document).ready(function() {
		
	
	var token='EAACEdEose0cBADlqxQ1fLhaWIU3qOKFmvpyNOOrNXd0fRGwZCW5ToYHaFYIlusXaQnM1S9m02ZCzMUJZBOz5J1ezCS2XWdOLv3dD4tNQCrZAilEe8xVKCk4ZBeURN8r7DZCAMMayWtc0dsNXPNzmpZAguHHTndkBEwMZCnByjHHyTSt1wyZCZAhQlHFpV9W6qfgIBHqeEuwlrg9wZDZD';
	var fields='fields=posts';
	var facebookGraphURL='https://graph.facebook.com/me?access_token='+token+'&'+fields;
	var arr;
		
	function getFacebookData(facebookGraphURL) {
	
	$.ajax({
    url: facebookGraphURL,
    dataType: 'json',
    success: function(data, status) {
      console.log(data);
	  //console.log(status);
	  arr=data["posts"]["data"];
	  $.each(arr,function(index,value) {
		if(value.message!=undefined) {
			 var row = $('<tr>');
			 var dt=value.created_time.substring(0,10)
			 row.append($('<td>').html(index+1));
			 row.append($('<td>').html(dt));
			 row.append($('<td style="width:60%">').html(value.message));
			 $('#table-posts').append(row,);
		  }
		  
	  });
	  
	  },
    error: function(status) {
      console.log("Error: "+status.responseJSON.error.message)
    }
})
	} //end getFacebookData
	
	function getFacebookData_userentry(facebookGraphURL) {    //ajax call if user has entered his token
		
	$.ajax({
    url: facebookGraphURL,
    dataType: 'json',
    success: function(data, status) {    //if call is successful
      //console.log(data);
	  //console.log(status);
	    arr=data["posts"]["data"];
		
		$("#table-posts tbody").remove();
	  
	  $.each(arr,function(index,value) {
		 if(value.message!=undefined) {
			 var row = $('<tr>');
			 var dt=value.created_time.substring(0,10)
			 row.append($('<td>').html(index+1));
			 row.append($('<td>').html(dt));
			 row.append($('<td style="width:60%">').html(value.message));
			 $('#table-posts').append(row,);
		  }
		  
	  });
	  $("#table-posts").show(); 
	  $("#diventertoken").hide();
	  $("#back2").show();  //after showing error message, give option to user to go back to home page
	  
    },
    error: function(status) {   //if call failed
      $("#entrytext").hide();
	  $("#yoursoption").hide(); //since error, clear the screen and shouw just the error message
	  $("#errormsg").html("Error: "+status.responseJSON.error.message+". Please enter valid token");
	  $("#errormsg").show();  //display the error message
	  $("#profile").hide(); //hide the result table
	  $("#back2").show(); //after showing error message, give option to user to go back to home page
	  //console.log(status)
	  }
})
	} //end getFacebookData_userentry
	
	getFacebookData(facebookGraphURL);
	$("#diventertoken").hide();
	$("#errormsg").hide();
	$("#back2").hide(); 
	
	$("#showmyposts").click(function() {
		$("#postsheader").hide();
		$("#table-posts").hide();
		$("#diventertoken").show();
		$("#showmyposts").hide();
		
	});

	$("#submittoken").click(function() {
		var usertoken=$("#token").val();
		if(usertoken!='') {    //if something is entered in token field
		var url='https://graph.facebook.com/me?access_token='+usertoken+'&'+fields;
		
		getFacebookData_userentry(url);  //ajax call with entered token as parameter
		}
		else {            //if token field is blank
			
			$("#diventertoken").hide();   //hide entry screen- Want to see your Facebook profile, enter tken, etc.
			$("#errormsg").show();   //show the error message
			$("#errormsg").text("You have not entered token. Please enter valid token");
			$("#back2").show(); //after showing error message, give option to user to go back to home page
			//console.log("Please enter valid token");
		}
		
	});
	
	
});