Accounts.config({
  sendVerificationEmail: true
});

Accounts.validateLoginAttempt(function(attempt) {
  var user = attempt.user;
  if (!!user && !user.emails[0].verified) {
    throw new Meteor.Error(403, 'Necesitas verificar tu correo electrónico. Revisa el email que te hemos enviado.');
  }
  return true;
});

Accounts.emailTemplates.siteName = "Tiempo de Siembra";
Accounts.emailTemplates.from = "Tiempo de Siembra <no-contestes@tiempodesiembra.es>";

Accounts.emailTemplates.resetPassword = {
  subject(user) {
    return "Cambiar tu contraseña en Tiempo de Siembra";
  },
  text(user, url) {
    return `¡Hola!
Visita el siguiente enlace para restrableder tu contraseña en Tiempo de Siembra.
${url}

Si no has solicitado este email, simplemente ingnóralo.

¡Gracias!
El equipo detrás de Tiempo de Siembra.
`
},
  html(user, url) {
    return `¡Hola! <br> <br>
Visita el siguiente enlace para restrableder tu contraseña en Tiempo de Siembra.
${url} <br> <br>

Si no has solicitado este email, simplemente ingnóralo. <br> <br>

¡Gracias! <br>
El equipo detrás de Tiempo de Siembra.
`
  }
};

Accounts.emailTemplates.enrollAccount = {
  subject(user) {
    return "Tu invitación a Tiempo de Siembra";
  },
  text(user, url) {
    return `¡Hola!
Has sido invitad@ a usar Tiempo de Siembra. Visita el siguiente enlace para comenzar:
${url}

¡Gracias!
El equipo detrás de Tiempo de Siembra.
`
},
  html(user, url) {
    return `¡Hola! <br>
Has sido invitad@ a usar Tiempo de Siembra. Visita el siguiente enlace para comenzar:
${url} <br><br>

¡Gracias! <br>
El equipo detrás de Tiempo de Siembra.
`
  }
};

Accounts.emailTemplates.verifyEmail = {
  subject(user) {
    return "Verifica tu email";
  },
  text(user, url) {
    return `¡Hola!
Visita el siguiente enlace para verificar tu dirección de correo electrónico:
${url}

¡Gracias!
El equipo detrás de Tiempo de Siembra.
`
},
  html(user, url) {
    return `¡Hola! <br>
Visita el siguiente enlace para verificar tu dirección de correo electrónico:
${url} <br><br>

¡Gracias! <br>
El equipo detrás de Tiempo de Siembra.
`
  }
};