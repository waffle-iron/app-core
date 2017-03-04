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

Template.weatherHome.helpers({
  data: () => {
    if (!Session.get('weatherResults')) { return; }
    try {
      return JSON.parse(Session.get('weatherResults'))
    } catch (ex) {
      return;
    }
  }
})

Template.registerHelper('weatherRowClass', function() {
  if (!!this && this.icon) {
    if (this.icon === 'snow' || this.icon === 'hail' || this.icon === 'tornado' || this.icon === 'thunderstorm') {
      return 'danger'
    }
    if (this.icon === 'sleet' || this.icon === 'wind') {
      return 'warning'
    }
    if (this.icon === 'rain') {
      return 'info'
    }
  }
})

Template.weatherHome.rendered= function() {

  let showWeather = (weather) => {
    Session.set('weatherResults', JSON.stringify(weather));
  }

  var geooptions = {
    enableHighAccuracy: true,
    timeout: 60000,
    maximumAge: 0
  };

  function success(pos) {
    var lat = pos.coords.latitude;
    var lng = pos.coords.longitude;

    Meteor.call('userProfileSetGeo', lat + ',' + lng)

    Session.set('weatherLocation', lat + ',' + lng);
    // Request to the BE
    Meteor.call('weatherDetails', lat + ',' + lng, (error, result) => {
      if (error) {
        return '';
      }
      showWeather(result)
    })
  }

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  let cu = Meteor.users.findOne({
    _id: Meteor.userId()
  });

  let cuGeo = cu.profile && cu.profile.geo ? cu.profile.geo : false;

  if (!!Session.get('weatherResults')) {
    showWeather(
      JSON.parse( Session.get('weatherResults') )
    );
  }
  else if (cuGeo) {
    let weatherLocation = cuGeo.split(',');
    success({
      coords: {
        latitude: weatherLocation[0],
        longitude: weatherLocation[1]
      }
    })
  }
  else {
    if (!Session.get('weatherLocation')) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, geooptions);
      }
    }
    else {
      let weatherLocation = Session.get('weatherLocation').split(',');
      success({
        coords: {
          latitude: weatherLocation[0],
          longitude: weatherLocation[1]
        }
      })
    }
  }

}
