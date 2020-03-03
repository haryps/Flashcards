export const ApiBaseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    ? 'https://localhost:44393'
    : 'https://greflashcardsapi.azurewebsites.net';
