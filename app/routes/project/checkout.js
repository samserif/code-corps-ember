import Ember from 'ember';
import DonationRouteMixin from 'code-corps-ember/mixins/donation-route';

const {
  get,
  inject: { service },
  Route,
  RSVP,
  set
} = Ember;

export default Route.extend(DonationRouteMixin, {
  session: service(),
  userSubscriptions: service(),

  beforeModel(transition) {
    let session = get(this, 'session');
    if (get(session, 'isAuthenticated')) {
      return this._super(...arguments);
    } else {
      set(session, 'attemptedTransition', transition);
      let queryParams = { donate: true };
      return this.transitionTo('signup', { queryParams });
    }
  },

  model() {
    return this.modelFor('project').reload().then((project) => {
      let subscription = get(this, 'userSubscriptions').fetchForProject(project);
      return RSVP.hash({ project, subscription });
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  },

  renderTemplate() {
    this.render('project/checkout', { into: 'application' });
  }
});
