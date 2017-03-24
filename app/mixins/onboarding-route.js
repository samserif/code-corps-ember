import Ember from 'ember';

const {
  get,
  inject: { service },
  Mixin
} = Ember;

export default Mixin.create({
  currentUser: service(),
  onboarding: service(),

  beforeModel(transition) {
    let isOnboarding = get(this, 'onboarding.isOnboarding');
    let expectedOnboardingRoute = get(this, 'onboarding.currentRoute');
    let allowedRoutes = get(this, 'onboarding.allowedRoutes');
    let target = transition.targetName;
    let user = get(this, 'currentUser.user');
    if (isOnboarding) {
      return this._super(...arguments);
    } else if (user && allowedRoutes.includes(target)) {
      this.transitionTo('projects-list');
    }
  }
});
