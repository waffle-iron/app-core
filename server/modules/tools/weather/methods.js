Meteor.methods({
  'weatherDetails': (location) => {
    try {
      let url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${location}?lang=es&units=auto`
      return HTTP.call('GET', url).data;
    } catch (e) {
      // Got a network error, time-out or HTTP error in the 400 or 500 range.
      return false;
    }
  }
})
