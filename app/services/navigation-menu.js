import Ember from 'ember';

const {
  computed,
  computed: { alias, equal },
  get,
  getOwner,
  inject: { service },
  Service,
  set
} = Ember;

export default Service.extend({
  currentRoute: service(),
  currentUser: service(),
  onboarding: service(),

  currentRouteName: alias('currentRoute.currentRouteName'),

  hasDonated: computed('user', function() {
    let user = get(this, 'user');
    return user.hasMany('stripeConnectSubscriptions').value() !== null;
  }),

  isDefault: equal('menuType', 'default'),
  isOnboarding: equal('menuType', 'onboarding'),

  menuType: computed('onboarding.isOnboarding', function() {
    let isOnboarding = get(this, 'onboarding.isOnboarding');
    if (isOnboarding) {
      return 'onboarding';
    } else {
      return 'default';
    }
  }),

  onOnboardingRoute: computed('currentRouteName', 'onboarding.onboardingRoutes', function() {
    return get(this, 'onboarding.onboardingRoutes').includes(get(this, 'currentRouteName'));
  }),

  user: alias('currentUser.user')
});
