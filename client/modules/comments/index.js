Template.commentsModal.events({
  "click .btn.btn-primary": function(event, template){

    let email = $("#comments-modal").find('[name="email"]').val();
    let comment = $("#comments-modal").find('[name="comment"]').val();
        comment = comment === '' ? null : comment;
    try {
      check(comment, String);

      Meteor.call('comments-modal-submit', {email, comment}, (error, result) => {
        if (error) {
          if (error === 'email-error') {
            sAlert.error('Vaya, no se ha podido enviar tu comentario. ¡Lo siento!');
          } else {
            sAlert.error('Vaya, algo ha ido mal y no se sabe porqué... ¡lo siento!');
          }
        } else {
          sAlert.success('Tu comentario ha sido enviado. ¡Gracias!');
          $("#comments-modal").find('[name="email"]').val('');
          $("#comments-modal").find('[name="comment"]').val('');
          $('#comments-modal').modal('toggle');
        }
      })
      
    } catch (ex) {
      sAlert.warning('Ooops... ¡falta tu comentario!');
    }
    
    

  }
});