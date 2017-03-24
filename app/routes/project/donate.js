import Ember from 'ember';

const {
  get,
  inject: { service },
  Route,
  RSVP,
  set
} = Ember;

const ALREADY_A_SUBSCRIBER = "You're already supporting this project.";

export default Route.extend({
  flashMessages: service(),
  session: service(),
  userSubscriptions: service(),

  model() {
    return this.modelFor('project').reload().then((project) => {
      if (get(this, 'session.isAuthenticated')) {
        let subscription = get(this, 'userSubscriptions').fetchForProject(project);
        return RSVP.hash({ project, subscription });
      } else {
        return RSVP.hash({ project, subscription: null });
      }
    });
  },

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
  },

  renderTemplate() {
    this.render('project/donate', { into: 'application' });
  }
});
