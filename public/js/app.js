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
     console.log(msg.todos[0].content);
     var newPost = writePost(msg);
     console.log(newPost)
     $('.list-group').prepend(newPost);
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

function writePost(msg){
  var userId = $('#user').data().id;
  var postHtml = '<li><div class="panel panel-default"><div class="panel-body"><div class="button-group pull-right">'
        + '<span class="badge">' + msg.todos[0].count + 'x</span>' + '<button type="button" name="repeat-button" id="repeat-button" class="btn btn-xs edit" data-id="' + userId + '">'
        +  '<a href="/api/user/' + userId + '/todos/' + msg.todos[0]._id + '/repeat" method="put"><span class="glyphicon glyphicon-repeat"></span></a>'
        + '</button> <button type="button" name="del-button" class="btn btn-xs delete" data-id="' + msg.todos[0]._id + '">'
        +  '<span class="glyphicon glyphicon-remove"></span></button></div><p>' + msg.todos[0].content + '</p>'
        + '<p><small><i>' + moment(msg.todos[0].timestamp).fromNow() + '</i></p></small></div></div></li>'
  return postHtml;
}
