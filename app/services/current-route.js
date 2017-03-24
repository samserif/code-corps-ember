import Ember from 'ember';

const {
  getOwner,
  Service,
  set
} = Ember;

export default Service.extend({
  currentRouteName: null,

  didTransition() {
    let { currentPath } = getOwner(this).lookup('controller:application');
    set(this, 'currentRouteName', currentPath);
  }
});
