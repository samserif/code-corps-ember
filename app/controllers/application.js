import Ember from 'ember';

const {
  computed,
  Controller,
  get,
  inject: { service },
  observer
} = Ember;

export default Controller.extend({
  codeTheme: service(),
  currentRoute: service(),
  onboarding: service(),
  projectTaskBoard: service(),
  session: service(),

  isNotOnboarding: computed.not('isOnboarding'),
  isNotViewingProjectTaskBoard: computed.not('isViewingProjectTaskBoard'),
  isOnboarding: computed.alias('onboarding.isOnboarding'),
  isViewingProjectTaskBoard: computed.alias('projectTaskBoard.isViewing'),

  shouldShowFooter: computed.and('isNotOnboarding', 'isNotViewingProjectTaskBoard'),
  shouldShowSpacer: computed.alias('isNotViewingProjectTaskBoard'),

  _updateRoute: observer('currentRouteName', function() {
    get(this, 'currentRoute').didTransition();
  }),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
