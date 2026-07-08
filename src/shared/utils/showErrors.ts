interface ErrorsData {
  message?: string;
  errors?: Record<string, unknown>;
}

export const showErrors = (errorsData: ErrorsData) => {
  const errors = errorsData.errors;

  if (errors && typeof errors === 'object' && !Array.isArray(errors)) {
    Object.keys(errors).forEach(key => {
      const messages = errors[key];
      if (Array.isArray(messages)) {
        messages.forEach(message => console.log(key, ':', message));
      }
    });
  }
};
