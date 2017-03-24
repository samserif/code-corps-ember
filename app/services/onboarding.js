import Ember from 'ember';

const {
  computed,
  get,
  inject: { service },
  Service
} = Ember;

export default Service.extend({
  currentUser: service(),
  totalSteps: computed.alias('_steps.length'),

  _steps: [
    {
      number: 1,
      state: 'signed_up',
      currentRoute: 'start.hello',
      nextRoute: 'start.interests',
      nextStateTransition: 'edit_profile'
    },
    {
      number: 1,
      state: 'signed_up_donating',
      currentRoute: 'start.hello',
      nextRoute: 'start.interests',
      nextStateTransition: 'edit_profile'
    },
    {
      number: 2,
      state: 'edited_profile',
      currentRoute: 'start.interests',
      nextRoute: 'start.expertise',
      nextStateTransition: 'select_categories'
    },
    {
      number: 3,
      state: 'selected_categories',
      currentRoute: 'start.expertise',
      nextRoute: 'start.skills',
      nextStateTransition: 'select_roles'
    },
    {
      number: 4,
      state: 'selected_roles',
      currentRoute: 'start.skills',
      nextRoute: 'projects-list',
      nextStateTransition: 'select_skills'
    }
  ],

  _currentStep: computed('currentUser.user.state', function() {
    let state = get(this, 'currentUser.user.state');
    let steps = get(this, '_steps');
    return steps.find((step) => {
      return step.state === state;
    });
  }),

  _allowedRoutes: [
    'project.checkout',
    'project.donate',
    'project.thank-you',
    'terms',
    'privacy'
  ],

  allowedRoutes: computed.union('_allowedRoutes', 'onboardingRoutes'),
  currentRoute: computed.alias('_currentStep.currentRoute'),
  currentStepNumber: computed.alias('_currentStep.number'),
  currentStepState: computed.alias('_currentStep.state'),
  isEditingProfile: computed.or('stateIsSignedUp', 'stateIsSignedUpDonating'),
  isOnboarding: computed.or('isEditingProfile', 'isSelectingCategories', 'isSelectingRoles', 'isSelectingSkills'),
  isSelectingCategories: computed.equal('currentStepState', 'edited_profile'),
  isSelectingRoles: computed.equal('currentStepState', 'selected_categories'),
  isSelectingSkills: computed.equal('currentStepState', 'selected_roles'),
  nextRoute: computed.alias('_currentStep.nextRoute'),
  nextStateTransition: computed.alias('_currentStep.nextStateTransition'),
  onboardingRoutes: computed.mapBy('_steps', 'currentRoute'),
  stateIsSignedUp: computed.equal('currentStepState', 'signed_up'),
  stateIsSignedUpDonating: computed.equal('currentStepState', 'signed_up_donating'),

  progressPercentage: computed('currentStepNumber', 'totalSteps', function() {
    return (get(this, 'currentStepNumber') / get(this, 'totalSteps')) * 100;
  })
});
