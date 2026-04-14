/**
 * API Configuration Utility
 * Handles switching between local proxy (/api) and direct production URL.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getApiUrl = (endpoint) => {
    if (!endpoint) return '';

    // If it's already an absolute URL, return it as is
    if (endpoint.startsWith('http')) return endpoint;

    // If endpoint starts with /, remove it to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

    // If we have an absolute API URL, use it
    if (API_BASE_URL) {
        // If the endpoint starts with 'api/', the backend might expect it without the prefix
        if (cleanEndpoint.startsWith('api/')) {
            return `${API_BASE_URL}/${cleanEndpoint.replace('api/', '')}`;
        }
        return `${API_BASE_URL}/${cleanEndpoint}`;
    }

    // Default: use relative path
    return `/${cleanEndpoint}`;
};

export default getApiUrl;
