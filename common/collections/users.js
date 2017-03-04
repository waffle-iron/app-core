/**
 * Copyright (c) 2016-2017 "Jose Constela" [jose@joseconstela.com]
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

Schema = {};

Schema.UserCountry = new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String,
        regEx: /^[A-Z]{2}$/
    }
});

Schema.UserProfile = new SimpleSchema({
    firstName: {
      type: String,
      optional: true,
      label: "Nombre"
    },
    lastName: {
      type: String,
      optional: true,
      label: "Apellidos"
    },
    birthday: {
      type: Date,
      optional: true,
      label: "Fecha de cumpleaños"
    },
    organization : {
      type: String,
      optional: true,
      label: "Empresa"
    },
    website: {
      type: String,
      regEx: SimpleSchema.RegEx.Url,
      optional: true,
      label: "Dirección web"
    },
    bio: {
      type: String,
      optional: true,
      label: "Bio",
      autoform: {
        rows: 5
      }
    },
    country: {
      type: Schema.UserCountry,
      optional: true,
      label: "País"
    },
    geo: {
      type: String,
      optional: true
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
    registered_emails: {
        type: Array,
        optional: true
    },
    'registered_emails.$': {
        type: Object,
        blackbox: true
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }
});

Meteor.users.attachSchema(Schema.User);
