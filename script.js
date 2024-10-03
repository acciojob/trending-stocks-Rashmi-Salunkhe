async function trendingStocks(n) {
    if (n === 0) return [];

    // Fetch the stock symbols (name and symbol) from the symbols API.
    try {
        const symbolsResponse = await fetch('https://api.frontendexpert.io/api/fe/stock-symbols');
        if (!symbolsResponse.ok) {
            console.error(`Error fetching symbols: ${symbolsResponse.status}`);
        }
        const symbolsData = await symbolsResponse.json();

        // Continue with fetching prices and market caps
        const topSymbols = symbolsData.slice(0, n);
        const symbols = topSymbols.map(stock => stock.symbol);

        // Fetch prices and market caps in parallel
        const pricesPromise = fetch(`https://api.frontendexpert.io/api/fe/stock-prices?symbols=${JSON.stringify(symbols)}`);
        const marketCapsPromise = fetch('https://api.frontendexpert.io/api/fe/stock-market-caps');

        const [pricesResponse, marketCapsResponse] = await Promise.all([pricesPromise, marketCapsPromise]);

        // Check for errors in the responses
        if (!pricesResponse.ok) {
            console.error(`Error fetching prices: ${pricesResponse.status}`);
        }
        if (!marketCapsResponse.ok) {
            console.error(`Error fetching market caps: ${marketCapsResponse.status}`);
        }

        const pricesData = await pricesResponse.json();
        const marketCapsData = await marketCapsResponse.json();

        const marketCapsMap = new Map();
        marketCapsData.forEach(stock => marketCapsMap.set(stock.symbol, stock['market-cap']));

        const pricesMap = new Map();
        pricesData.forEach(stock => pricesMap.set(stock.symbol, {
            price: stock.price,
            '52-week-high': stock['52-week-high'],
            '52-week-low': stock['52-week-low']
        }));

        const result = topSymbols.map(stock => ({
            name: stock.name,
            symbol: stock.symbol,
            price: pricesMap.get(stock.symbol)?.price || null,
            '52-week-high': pricesMap.get(stock.symbol)?.['52-week-high'] || null,
            '52-week-low': pricesMap.get(stock.symbol)?.['52-week-low'] || null,
            'market-cap': marketCapsMap.get(stock.symbol) || null
        }));

        return result;
    } catch (error) {
        console.error("Fetch failed:", error);
    }
}
