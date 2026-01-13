
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
  
    const mockDb: ApiGameResult[] = [
      {
        id: 1,
        name: "God of War Ragnarök",
        background_image: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
        genres: [{ name: "Action" }, { name: "Adventure" }],
        platforms: [{ platform: { name: "PlayStation 5", slug: "playstation5" } }, { platform: { name: "PlayStation 4", slug: "playstation4" } }]
      },
      {
        id: 2,
        name: "Hades II",
        background_image: "https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg",
        genres: [{ name: "Roguelike" }, { name: "Action" }],
        platforms: [{ platform: { name: "PC", slug: "pc" } }]
      },
      {
        id: 3,
        name: "Super Mario Wonder",
        background_image: "https://media.rawg.io/media/games/e74/e74458058b35e01c1ae3feeb70a3b725.jpg",
        genres: [{ name: "Platformer" }],
        platforms: [{ platform: { name: "Nintendo Switch", slug: "nintendo-switch" } }]
      },
      {
        id: 4,
        name: "Final Fantasy VII Rebirth",
        background_image: "https://media.rawg.io/media/games/e1f/e1ffbea1e1d5f0d3dc9e255fa783fb43.jpg",
        genres: [{ name: "RPG" }],
        platforms: [{ platform: { name: "PlayStation 5", slug: "playstation5" } }]
      }
    ];
  
    // Simple local filter to simulate API search
    const results = mockDb.filter(g => g.name.toLowerCase().includes(query.toLowerCase()));
    
    // Generic fallback if mock yields nothing
    if (results.length === 0 && query.length > 2) {
        return [{
            id: 999,
            name: query,
            background_image: "https://picsum.photos/400/600",
            genres: [{ name: "Custom" }],
            platforms: []
        }];
    }
  
    return results;
  };
