/**
 * Returns an object or null based on given address string.
 * */
export default async function geocode(address: string) {
    const baseUrl = 'https://nominatim.openstreetmap.org/search';
    try {
        const response = await fetch(`${baseUrl}?q=${address}&format=json&limit=1`);
        const result = await response.json();
        if (result?.length > 0) {
            return {lat: parseFloat(result[0].lat), lon: parseFloat(result[0].lon)};
        }
    } catch (e) {
        console.error(e);
    }

    return null;
};
