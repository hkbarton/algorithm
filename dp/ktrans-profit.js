/*
Max Profit With K Transactions

You are given an array of integers representing the prices of a single stock on
various days (each index in the array represents a different day). You are also
given an integer k, which represents the number of transactions you are allowed
to make. One transaction consists of buying the stock on a given day and selling
it on another, later day. Write a function that returns the maximum profit that
you can make buying and selling the stock, given k transactions. Note that you
can only hold 1 share of the stock at a time; in other words, you cannot buy
more than 1 share of the stock on any given day, and you cannot buy a share of
the stock if you are still holding another share. Note that you also don't need
to use all k transactions that you're allowed.

Sample input: [5, 11, 3, 50, 60, 90], 2
Sample output: 93 (Buy: 5, Sell: 11; Buy: 3, Sell: 90)

video explain: https://www.algoexpert.io/questions/Max%20Profit%20With%20K%20Transactions
*/
function maxProfitWithKTransactions(prices, k) {
  // profits = [[previous transaction array], [current transaction array]]
  if (prices.length < 1) {
    return 0
  }
  let previousTransProfits = prices.map(x => 0)
  for (let i = 1; i <= k; i++) {
    const currentTransProfits = [0]
    let saleGain = previousTransProfits[0] - prices[0]
    for (let day = 1; day < prices.length; day++) {
      const profitWithoutSale = currentTransProfits[day - 1]
      let profitWithSale = prices[day]
      const previousDaySaleGain = previousTransProfits[day - 1] - prices[day - 1]
      saleGain = previousDaySaleGain > saleGain ? previousDaySaleGain : saleGain
      profitWithSale += saleGain
      currentTransProfits[day] = profitWithoutSale > profitWithSale ? profitWithoutSale : profitWithSale
    }
    previousTransProfits = currentTransProfits
  }
  return previousTransProfits[prices.length - 1]
}

console.log(maxProfitWithKTransactions([5, 11, 3, 50, 60, 90], 2))
