import Ember from 'ember';
import DonationRouteMixin from 'code-corps-ember/mixins/donation-route';

const {
  get,
  inject: { service },
  Route,
  RSVP
} = Ember;

export default Route.extend(DonationRouteMixin, {
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

  renderTemplate() {
    this.render('project/donate', { into: 'application' });
  }
});
