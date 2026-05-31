let expenseCount = 5;

function addNewExpense() {
  expenseCount++;
  const container = document.getElementById('expenseList');
  const div = document.createElement('div');
  div.style.margin = "12px 0";
  div.innerHTML = `
    <input type="text" id="expName${expenseCount}" placeholder="Expense Name" style="width:48%; margin-right:8px;">
    <input type="number" id="expAmount${expenseCount}" placeholder="Amount ($)" oninput="calculateBudget()" style="width:48%;">
  `;
  container.appendChild(div);
  calculateBudget();
}

function calculateBudget() {
  const income = parseFloat(document.getElementById('income').value) || 0;
  let totalExpenses = 0;
  const labels = [];
  const data = [];

  for (let i = 1; i <= expenseCount; i++) {
    const nameEl = document.getElementById(`expName${i}`);
    const amtEl = document.getElementById(`expAmount${i}`);
    if (nameEl && amtEl) {
      const amt = parseFloat(amtEl.value) || 0;
      if (amt > 0) {
        totalExpenses += amt;
        labels.push(nameEl.value || `Expense ${i}`);
        data.push(amt);
      }
    }
  }

  const balance = income - totalExpenses;

  document.getElementById('summaryContent').innerHTML = `
    <p><strong>Total Income:</strong> $${income.toLocaleString()}</p>
    <p><strong>Total Expenses:</strong> $${totalExpenses.toLocaleString()}</p>
    <p><strong>Remaining:</strong> <span style="color:${balance >= 0 ? 'green' : 'red'};">$${balance.toLocaleString()}</span></p>
  `;
}

window.onload = () => calculateBudget();
