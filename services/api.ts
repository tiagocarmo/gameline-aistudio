// External API interaction with RAWG.io
export interface ApiGameResult {
  id: number;
  name: string;
  background_image: string;
  genres: { name: string }[];
  platforms: { platform: { name: string, slug: string } }[];
}

export const searchGames = async (query: string, apiKey?: string): Promise<ApiGameResult[]> => {
  if (!query) return [];

  // 1. Real API Call (if Key is present)
  if (apiKey && apiKey.trim()) {
    const trimmedKey = apiKey.trim();
    const response = await fetch(`https://api.rawg.io/api/games?key=${trimmedKey}&search=${encodeURIComponent(query)}&page_size=6`);

    if (!response.ok) {
      // Throw error to be handled by the UI (display error message)
      throw new Error(`RAWG API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Map RAWG response to our interface
    if (data.results) {
      return data.results.map((item: any) => ({
        id: item.id,
        name: item.name,
        background_image: item.background_image,
        genres: item.genres || [],
        platforms: item.platforms || []
      }));
    }
    return [];
  }

  // 2. Mock Data Fallback (ONLY if NO API Key is provided)
  // This simulates a "Demo Mode" for users without a key.
  await new Promise(resolve => setTimeout(resolve, 600));

  const mockDb: ApiGameResult[] = [];

  // Simple local filter to simulate API search
  const results = mockDb.filter(g => g.name.toLowerCase().includes(query.toLowerCase()));

  // Generic fallback if mock yields nothing
  if (results.length === 0 && query.length > 2) {
    return [];
  }

  return results;
};
