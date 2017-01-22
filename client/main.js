document.documentElement.lang = 'es'
accountsUIBootstrap3.setLanguage('es')
TAPi18n.setLanguage('es')
moment.locale('es')

Meteor.subscribe('userData')

_ = lodash

Avatar.setOptions({
  fallbackType: 'initials',
  customImageProperty : 'profile.avatarUrl',
  imageSizes: {
    'xlarge': '400'
  }
});

SimpleSchema.debug = true