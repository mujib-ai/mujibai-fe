export const AUTH_CONSTANTS = {
  LOGIN_FORM: {
    EMAIL_PLACEHOLDER: 'Enter your email',
    PASSWORD_PLACEHOLDER: 'Enter your password',
    REMEMBER_ME_LABEL: 'Remember me',
    FORGOT_PASSWORD_LABEL: 'Forgot password?',
    LOGIN_BUTTON: 'Sign In',
    NO_ACCOUNT_LABEL: "Don't have an account?",
    SIGN_UP_LINK: 'Sign up',
  },

  REGISTRATION_FORM: {
    FIRST_NAME_PLACEHOLDER: 'First name',
    LAST_NAME_PLACEHOLDER: 'Last name',
    EMAIL_PLACEHOLDER: 'Email address',
    PASSWORD_PLACEHOLDER: 'Create password',
    CONFIRM_PASSWORD_PLACEHOLDER: 'Confirm password',
    REGISTER_BUTTON: 'Create Account',
    HAVE_ACCOUNT_LABEL: 'Already have an account?',
    SIGN_IN_LINK: 'Sign in',
  },

  VALIDATION: {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
    PASSWORDS_NOT_MATCH: 'Passwords do not match',
    FIRST_NAME_REQUIRED: 'First name is required',
    LAST_NAME_REQUIRED: 'Last name is required',
  },

  API: {
    LOGIN_ENDPOINT: '/auth/login',
    REGISTER_ENDPOINT: '/auth/register',
    LOGOUT_ENDPOINT: '/auth/logout',
    CHECK_AUTH_ENDPOINT: '/tenants/me',
    FORGOT_PASSWORD_ENDPOINT: '/auth/forgot-password',
    RESET_PASSWORD_ENDPOINT: '/auth/reset-password',
  },
} as const;
