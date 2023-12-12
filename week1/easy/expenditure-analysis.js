/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {

  let expenseInfo = {};
  let categoryWiseExpenses = [];
  let category;
  let expense;
  
  for(let i=0; i < transactions.length; i++) {
    
    category = transactions[i].category;
    expense = transactions[i].price;

    if(categoryWiseExpenses.length === 0) {

        categoryWiseExpenses.push({"category": category, "totalSpent": expense})

    } else {

        expenseInfo = categoryWiseExpenses.find(c=> c.category===category);
        if(expenseInfo) {

          expenseInfo.totalSpent += expense;    

      } else {

          categoryWiseExpenses.push({"category": category, "totalSpent": expense})
          
      }
    }
  }

  return categoryWiseExpenses;
}

module.exports = calculateTotalSpentByCategory;
