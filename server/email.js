/**
 * Copyright (c) 2016-2016 "Jose Constela" [jose@joseconstela.com]
 * Tiempo de Siembra [http://app.tiempodesiembra.es]
 *
 * This file is part of iempo de Siembra core's app.
 *
 * Tiempo de Siembra is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

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
