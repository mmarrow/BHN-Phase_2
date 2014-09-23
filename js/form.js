// This adds the additional company information and animates removal with alert

	
$(function () {
    $('#add-btn').click(function () {
        var num     = $('.clonedInput').length, // Checks to see how many "duplicatable" input fields we currently have
						newNum  = new Number(num + 1),      // The numeric ID of the new input field being added, increasing by 1 each time
            newElem = $('#entry' + num).clone().attr('id', 'entry' + newNum).fadeIn('slow'); // create the new element via clone(), and manipulate it's ID using newNum value
			
        // Heading - section
        newElem.find('.heading-reference').attr('id', 'ID' + newNum + '_reference').attr('name', 'ID' + newNum + '_reference').html('COMPANY #' + newNum + ' CONTACT INFORMATION');
			
        // Company phone - text
			  newElem.find('.label-phn').parent().removeClass('error')
        newElem.find('.label-phn').removeClass('error').attr('for', 'ID' + newNum + '_company_phone');
        newElem.find('.input-phn').removeAttr('data-invalid').attr('id', 'ID' + newNum + '_company_phone').attr('name', 'ID' + newNum + '_company_phone').val('');
						
        // Address - text
				newElem.find('.label-add').parent().removeClass('error')
        newElem.find('.label-add').removeClass('error').attr('for', 'ID' + newNum + '_address');
        newElem.find('.input-add').removeAttr('data-invalid').attr('id', 'ID' + newNum + '_address').attr('name', 'ID' + newNum + '_address').val('');
       
        // City - text
			  newElem.find('.label-city').parent().removeClass('error')
        newElem.find('.label-city').removeClass('error').attr('for', 'ID' + newNum + '_city');
        newElem.find('.input-city').removeAttr('data-invalid').attr('id', 'ID' + newNum + '_city').attr('name', 'ID' + newNum + '_city').val('');
				
        // State - text
			  newElem.find('.label-st').parent().removeClass('error')
        newElem.find('.label-st').removeClass('error').attr('for', 'ID' + newNum + '_state');
        newElem.find('.input-st').removeAttr('data-invalid').attr('id', 'ID' + newNum + '_state').attr('name', 'ID' + newNum + '_state').val('');
      
        // Zip - text
			  newElem.find('.label-zip').parent().removeClass('error')
        newElem.find('.label-zip').removeClass('error').attr('for', 'ID' + newNum + '_zip');
        newElem.find('.input-zip').removeAttr('data-invalid').attr('id', 'ID' + newNum + '_zip').attr('name', 'ID' + newNum + '_zip').val('');

    // Insert the new element after the last "duplicatable" input field
        $('#entry' + num).after(newElem);
        $('#ID' + newNum + '_company_name').focus();
			  $('#RegistrationForm').foundation({bindings: 'events'});

    // Enable the "remove" button. This only shows once you have a duplicated section.
				$('#del-btn').attr('disabled', false);
			
    // Change max number of sections you want to allow.
        if (newNum == 10)
        $('#add-btn').attr('disabled', true).prop('value', "You've reached the limit"); // value here updates the text in the 'add' button when the limit is reached **** May remove **** -Mike
    });

    $('#del-btn').click(function () {
    // Confirmation dialog box. ***** May remove *****   -Mike
        if (confirm("Are you sure you wish to remove this section? This cannot be undone."))
            {
                var num = $('.clonedInput').length;
                // how many "duplicatable" input fields we currently have
                $('#entry' + num).slideUp('slow', function () {$(this).remove();
                // if only one element remains, disable the "remove" button
                if (num -1 === 1)
                $('#del-btn').attr('disabled', true);
                // enable the "add" button
                $('#add-btn').attr('disabled', false).prop('value', "Add A Company Location (optional)");});
            }
        return false; // Removes the last section you added
    });
    // Enable the "add" button
    $('#add-btn').attr('disabled', false);
	
		//Disable the "remove" button unless it's the update page. Then only disable if entry1.
		if ($('#update-page').length) {
				$('#entry1').next('div.row').find('#del-btn').attr('disabled', true);
		} else {
				$('#del-btn').attr('disabled', true);
		}
		
		
});                      
                          

// This hides part one and displays part 2

$( "#next-btn" ).click(function() {
  $( "#step-1" ).hide( "slow", function() {
    $("#step-2").show("slow");
  });
});

$( "#prev-btn" ).click(function() {
  $( "#step-2" ).hide( "slow", function() {
    $("#step-1").show("slow");
  });
});

/* This is a fix for the broken nav initiated on IOS when the keyboard is used during form input related styles are in custom.css */


/* We need this only on touch devices */
if (Modernizr.touch) {
    /* cache dom references */ 
    var $body = jQuery('body'); 

    /* bind events */
    $(document)
    .on('focus', 'input', function(e) {
        $body.addClass('fixfixed');
    })
    .on('blur', 'input', function(e) {
        $body.removeClass('fixfixed');
    });
} 




