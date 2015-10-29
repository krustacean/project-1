console.log('app.js loaded')


$( document ).ready(function() {
  //post new todos from the list submit button
  $('#todoButton').on('click', function(e){
    $.ajax({
      method: "POST",
      url: "api/todos",
      data: $('#newTodo').serialize()
    })
    .done(function( msg ) {
    alert( "Data Saved: " + msg );
  });
});


  //jquery validate sign in form validation
  $(".form-signin").validate({
    rules: {
      password: {
        required: true,
        minlength: 8
      },
      email: {
        required: true,
      }
    },
    messages: {
      email: {
        required: "We need your email address to contact you, person!",
      },
      password: {
        required: "You must enter a password",
        minlength: jQuery.validator.format("Password must be at least {0} characters long!")
      }
    },
    submitHandler: function(form) {
      //submit if rules are met
      form.submit();
    }
  });
});
