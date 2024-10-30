async function trendingStocks(n) {
    try {
      // Fetch symbols data
      const symbolsResponse = await fetch('https://api.frontendexpert.io/api/fe/stock-symbols');
      const symbolsData = await symbolsResponse.json();
      
      // Get symbols for top n stocks by market-cap
      const topSymbols = symbolsData.slice(0, n).map(obj => obj.symbol);
      
      // Fetch prices and market-cap data for top symbols
      const [pricesResponse, marketCapResponse] = await Promise.all([
        fetch(`https://api.frontendexpert.io/api/fe/stock-prices?symbols=${JSON.stringify(topSymbols)}`),
        fetch('https://api.frontendexpert.io/api/fe/stock-market-caps')
      ]);
      
      const [pricesData, marketCapData] = await Promise.all([
        pricesResponse.json(),
        marketCapResponse.json()
      ]);
      
      // Combine data for top stocks
      const topStocksData = [];
      for (const symbol of topSymbols) {
        const priceObj = pricesData.find(obj => obj.symbol === symbol);
        const marketCapObj = marketCapData.find(obj => obj.symbol === symbol);
        const topStockObj = {
          symbol,
          name: symbolsData.find(obj => obj.symbol === symbol).name,
          price: priceObj.price,
          "52-week-high": priceObj["52-week-high"],
          "52-week-low": priceObj["52-week-low"],
          "market-cap": marketCapObj["market-cap"]
        };
        topStocksData.push(topStockObj);
      }
      return topStocksData;
    } catch (error) {
      console.error(error);
    }
  }
module.exports=trendingStocks;  
