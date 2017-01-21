import { Meteor } from 'meteor/meteor';
import { fakeData } from './fake';

Meteor.startup(() => {
  
  if (process.env.NODE_ENV === 'development') {
    fakeData()
  }
  
});
