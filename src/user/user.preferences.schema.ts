export const createUserPreferencesSchema = {
    body: {
      type: 'object',
      required: ['allowSmsNotifications', 'allowEmailNotifications', 'marketingOptIn', 'createdBy'],
      properties: {
        allowSmsNotifications: { type: 'boolean'},
        allowEmailNotifications: { type: 'boolean'},
        marketingOptIn: { type: 'boolean'},
        createdBy: { type: 'number'},
      },
      errorMessage: {
        required: {
         allowSmsNotifications: 'AllowSmsNotifications is required',
         allowEmailNotifications: 'AllowEmailNotifications is required',
         marketingOptIn: 'MarketingOptIn is required',
         createdBy: 'createdBy is required',
        },
      },
    },
    params: {
      type: 'object',
      required: ['userId'],
      properties: {
        userId: { type: 'string', minLength: 1  },
      },
      errorMessage: {
        required: {
          teamId: 'userId is required in the URL',
        },
      },
    },
  };
