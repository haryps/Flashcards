export const ApiBaseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    ? 'https://localhost:44393'
    : 'https://greflashcardsapi.azurewebsites.net';

export const SpaBaseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    ? 'https://localhost:44337'
    : 'https://greflashcards.azurewebsites.net';

export const IdentityBaseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    ? 'https://localhost:44350'
    : 'https://greflashcardsidentity.azurewebsites.net';
