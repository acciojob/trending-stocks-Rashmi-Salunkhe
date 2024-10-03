# Trending Stocks

### Write an asynchronous trendingStocks function that takes in a required integern and returns data about the top n US- based stocks by market cap.
Specifically, the function should return an array containing [n objects, and each object should have 6 own properties: "name", "symbol", "price", "market-cap", "52-week-high", and "52-week-low". These objects should contain the data of the top n US- based stocks by market-cap.

- You have been provided 3 different APIs (a symbols API, a prices API, and a market-cap API), each of which returns different stock-related data:

```
https://api.frontendexpert.io/api/fe/stock-symbols
```

- The symbols API returns a JSON-formatted array of objects, each representing one of the 500 top US-based stocks by market- cap. Each object has 2 keys: "name", and "symbol". These symbols are the same symbols used in the prices and market-cap APIs. For example, the return value of this API might look like this:

```
[
{
"symbol": "GOOG",
"name": "Alphabet Inc Class C"
},
...
]
```

```
https://api.frontendexpert.io/api/fe/stock-prices
```

- The prices API takes one query parameter called symbols. This value should be a JSON stringified array of requested stock symbols. For example: a request to this API would look like this:

```
https://api.frontendexpert.io/api/fe/stock-prices?symbols=["GOOG"]
```

- The prices API returns a JSON formatted array of objects, each representing one of the requested stocks from the query parameter. Each object has 4 keys: "52-week-high", "52-week-low", "price", and "symbol". These are the same keys required for the objects in the return array, excluding the name and market-cap. For example, the return value of this API might look like this:

```
[
{
"symbol": "GOOG".
"price": 1001.52,
"52-week-low": 1186.89,
"52-week-high": 803.1903
},
]

```

```
https://api.frontendexpert.io/api/fe/stock-market-caps
```

- The market-caps API returns a JSON formatted array of objects, each representing one of the 500 top US-based stocks by market-cap. Each object has 2 keys: "market-cap", and "symbol". These symbols are the same symbols as used in the symbols and prices APIs. For example, the return value of this API might look like this:
```
[
{
"symbol": "GOOG",
"market-cap": 728535558140
},
...
]
```

- Your code should minimize daisy-chained fetch requests as much as possible (i.e. if two requests don't depend on each other's responses, they should not wait for each other). The parameter n will always be positive and less than or equal to 500.

Sample Usage
```
await trendingStocks(0); // returns []
await trendingStocks(2); // returns [
{
"52-week-high": 131.12,
"52-week-low": 180.1,
"market-cap": 809508034020,
"name": "Apple Inc.",
"price": 155.15,
"symbol": "AAPL",
},
{ "name": "Alphabet Inc Class A",
"52-week-high": 824.3,
"52-week-low": 1198,
"market-cap": 733823966137,
"price": 1007.71,
"symbol": "GOOGL",
},
]
```
