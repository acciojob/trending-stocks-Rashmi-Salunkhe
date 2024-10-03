async function trendingStocks(n) {
    // If n is 0, we return an empty array as there's no data to fetch.
    if (n === 0) {
        return [];
    }

    // Fetch the stock symbols (name and symbol) from the symbols API.
    const symbolsResponse = await fetch('https://api.frontendexpert.io/api/fe/stock-symbols');
    const symbolsData = await symbolsResponse.json();
    
    // Slice the symbols array to get only the top n stocks.
    const topSymbols = symbolsData.slice(0, n);

    // Extract the list of symbols to use in the other two API calls.
    const symbols = topSymbols.map(stock => stock.symbol);

    // Fetch the stock prices and market caps in parallel.
    const pricesPromise = fetch(`https://api.frontendexpert.io/api/fe/stock-prices?symbols=${JSON.stringify(symbols)}`);
    const marketCapsPromise = fetch('https://api.frontendexpert.io/api/fe/stock-market-caps');

    // Wait for both fetch requests to complete.
    const [pricesResponse, marketCapsResponse] = await Promise.all([pricesPromise, marketCapsPromise]);

    // Parse the responses as JSON.
    const pricesData = await pricesResponse.json();
    const marketCapsData = await marketCapsResponse.json();

    // Create a map for easy lookup of market-cap and prices by symbol.
    const marketCapsMap = new Map();
    marketCapsData.forEach(stock => marketCapsMap.set(stock.symbol, stock['market-cap']));

    const pricesMap = new Map();
    pricesData.forEach(stock => pricesMap.set(stock.symbol, {
        price: stock.price,
        '52-week-high': stock['52-week-high'],
        '52-week-low': stock['52-week-low']
    }));

    // Merge the data from symbols, prices, and market caps.
    const result = topSymbols.map(stock => ({
        name: stock.name,
        symbol: stock.symbol,
        price: pricesMap.get(stock.symbol)?.price || null,
        '52-week-high': pricesMap.get(stock.symbol)?.['52-week-high'] || null,
        '52-week-low': pricesMap.get(stock.symbol)?.['52-week-low'] || null,
        'market-cap': marketCapsMap.get(stock.symbol) || null
    }));

    return result;
}

module.exports = trendingStocks;
