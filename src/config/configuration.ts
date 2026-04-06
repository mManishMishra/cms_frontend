export default () => ({
    smsProvider: {
        apiKey: process.env.MSG91_API_KEY, // Update ENV variable name
        templateId: process.env.MSG91_TEMPLATE_ID, // Store template ID in .env
    },
});
