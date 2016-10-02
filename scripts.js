$( document ).ready(function() {

  $.get( "http://localhost:8080/api/getpoop", function( data ) {
    $( ".result" ).html( data )
  });

});
