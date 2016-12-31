Meteor.methods({
  'comments-modal-submit': (data) => {

    try {
      Email.send({
        to: 'joseconstela@icloud.com',
        from: 'joseconstela@icloud.com',
        subject: 'Comentario via Tiempo de Siembra',
        text: `${data.email} ha enviado un comentario:
  ${data.comment}`
      });

      return true;

    } catch (ex) {
      throw new Meteor.Error( 500, 'email-error' );
    }
  }
})