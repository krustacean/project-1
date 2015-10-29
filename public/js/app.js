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
     console.log(msg);
   });
  });

  //attach listerner to the delete button

  $(document).on('click', '.delete',  function(){
  deletePost(this);
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
/************************************
Helper Functions
************************************/


//delete todos
function deletePost(context) {
  console.log('context in deletePost: ', context);
  // context is the button that was clicked
  var userId = $('#user').data().id;
  var todoId = $(context).data().id;
  console.log(todoId);
  $.ajax({
    url: '/api/user/' + userId + '/todos/' + todoId,
    type: 'DELETE',
    success: function(response) {
      console.log('removed' + response)
      $(context).closest('li').remove();
    }
  });
}
