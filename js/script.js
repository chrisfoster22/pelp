// From main.js


$.noConflict();jQuery( document ).ready(function( $ ) {
  // Code that uses jQuery's $ can follow here.



  // Date of Birth Placeholder
    $('body').on('focus', "#dob", function(){
      $(this).attr('placeholder', 'MM/DD/YYYY');
    });

    $('body').on('blur', "#dob", function(){
      $(this).attr('placeholder', 'Date of Birth');
    });


}); //end noConflict

// Code that uses other library's $ can follow here.
