import Ember from 'ember';

const {
  get,
  inject: { service },
  Mixin
} = Ember;

const ALREADY_A_SUBSCRIBER = "You're already supporting this project.";

export default Mixin.create({
  flashMessages: service(),

  afterModel({ project, subscription }) {
    if (subscription) {
      get(this, 'flashMessages').success(ALREADY_A_SUBSCRIBER);
      this.transitionTo('project', project);
    } else {
      this._super(...arguments);
    }
  },

  setupController(controller, models) {
    controller.setProperties(models);
  }
});
