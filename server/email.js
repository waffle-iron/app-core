Accounts.emailTemplates.siteName = "Tiempo de Siembra";
Accounts.emailTemplates.from = "Tiempo de Siembra <no-contestes@tiempodesiembra.es>";

Accounts.emailTemplates.sendResetPasswordEmail = {
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
    return `¡Hola! <br>
Visita el siguiente enlace para restrableder tu contraseña en Tiempo de Siembra.
${url} <br> <br>

Si no has solicitado este email, simplemente ingnóralo. <br> <br>

¡Gracias! <br>
El equipo detrás de Tiempo de Siembra.
`
  }
};

Accounts.emailTemplates.sendEnrollmentEmail = {
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
}/*,
  html(user, url) {}*/
};

Accounts.emailTemplates.sendVerificationEmail = {
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
}/*,
  html(user, url) {}*/
};