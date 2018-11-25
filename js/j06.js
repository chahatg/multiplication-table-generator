


function formValidation(){

  $("#multTableForm").validate({
  //Validation Rules
  rules:{
    hStart:{
      number:true,
      min: -75,
      max: 75,

      required:true
    },

    vStart:{
      number:true,
      min: -75,
      max: 75,
      required:true
    },

    hEnd:{
      number:true,
      min: -75,
      max: 75,
      greaterThan: "#hStart",
      required:true
    },

    vEnd:{
      number:true,
      min: -75,
      max: 75,
      greaterThan: "#vStart",
      required:true
    }
  },

  // Prompt User with Error Messages, notifying them of In-valid input
  messages: {
    h_start: {
      
      min: "ERROR: Out of range.Please enter a number between (-75,75)",
      max: "ERROR: Out of range.Please enter a number between (-75,75)",
     
    },
    v_start: {
      
      min: "ERROR: Out of range.Please enter a number between (-75,75)",
      max: "ERROR: Out of range.Please enter a number between (-75,75)",
      
    },
    h_end: {
     
      min: "ERROR: Out of range.Please enter a number between (-75,75)",
      max: "ERROR: Out of range.Please enter a number between (-75,75)",
      greaterThan: "ERROR: Horizontal Ending number must be greater than Horizontal Starting Number"
    },
    v_end: {
      
      min: "ERROR: Out of range.Please enter a number between (-75,75)",
      max: "ERROR: Out of range.Please enter a number between (-75,75)",
      greaterThan: "ERROR: Vertical Ending number must be greater than Vertical Starting Number"
    }
  },

  /*Ensures error message will not alter the forms disposition */
  errorElement: "div",  /*########*/
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    },

  /*Clear error-messages: This allows the user to attempt inputing valid input
                          without the display of past errors, this also allows
                          the system to project new error messages if the Users
                          attempted input is still invalid
                                                                            */
  invalidHandler: function(){
  $("#Error").empty();  /*########*/
  $("#MultTable").empty();
  },

  //Function called when User-Input is valid
  submitHandler: function(form){

    multiplicationTable();
    return false;
  }


});

};




function multiplicationTable() {

	var hstart = Number(document.getElementById('hStart').value);
	var hend = Number(document.getElementById('hEnd').value);
	var vstart = Number(document.getElementById('vStart').value);
	var vend = Number(document.getElementById('vEnd').value);


	//I decided to flip the starting and ending values of 
		//the horizontal and vertical ranges in case they are out of order.
	/*if(hstart > hend){
		var temp = hstart;
	 	hstart = hend;
	 	hend = temp;
	}

	if(vstart > vend){
		var temp = vstart;
	  	vstart = vend;
	 	vend = temp;
	}*/
	
	//declaring matrix that will hold the Multiplication table
	var multTable = {};
	
	//making sure we are only dealing with positive values
	var hrow = hend-hstart;
	var vcolumn = vend-vstart;
	var rows = Math.abs(hrow);
	var columns = Math.abs(vcolumn);

	//2D array horizontal and vertical indices
	var v2D_index = vstart;
	var h2D_index = hstart;


	var i = 0;
  	while(i <= columns){
		var tempArr = [];
		var j = 0;
      	while(j <= rows){
			var index = v2D_index*h2D_index;
			tempArr[j] = index;
			h2D_index++;
			j++;
		}

		multTable[ "row" + i ] = tempArr;

		//resetting
		h2D_index = hstart;

		v2D_index++;
		i++;
	}

	createTable(multTable);
	return false;
}

function createTable(multTable){
	var hstart = Number(document.getElementById('hStart').value);
	var hend = Number(document.getElementById('hEnd').value);
	var vstart = Number(document.getElementById('vStart').value);
	var vend = Number(document.getElementById('vEnd').value);


	//I decided to flip the starting and ending values of 
		//the horizontal and vertical ranges in case they are out of order.
	/*if(hstart > hend){
		var temp = hstart;
	 	hstart = hend;
	 	hend = temp;
	}

	if(vstart > vend){
		var temp = vstart;
	  	vstart = vend;
	 	vend = temp;
	}*/


	var rows = Math.abs(hend-hstart);
	var columns = Math.abs(vend-vstart);


	//To fill up the multiplication table
	var full_table = "";
	full_table += "<table>";
	full_table += "<tr><td></td>";

	for(var fillRow = hstart; fillRow <= hend; fillRow++){
		full_table += "<td>" + fillRow + "</td>";
	}
	full_table += "</tr>";

	var vcolumn = vstart;
	var i = 0;
	while(i <= columns){
		full_table += "<tr><td>" + vcolumn + "</td>";

		var j =0;
 		while(j <= rows){
			full_table += "<td>" + multTable["row" + i][j] + "</td>";
			j++;
		}
		vcolumn++
		full_table += "</tdr>";
		i++;
	}
	
	full_table += "</table>";
	$("#MultTable").html(full_table);	

}



 