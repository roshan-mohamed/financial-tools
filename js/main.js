let debts = [];
let currentStrategy = 'avalanche';
let payoffChartInstance = null;
let breakdownChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  updateSummary();
  const extraInput = document.getElementById('extraPayment');
  if (extraInput) extraInput.addEventListener('input', updateSummary);
});

function addDebt() {
  const name = document.getElementById('debtName').value.trim();
  const amount = parseFloat(document.getElementById('debtAmount').value);
  const rate = parseFloat(document.getElementById('debtRate').value) || 0;
  const minPay = parseFloat(document.getElementById('debtMinPay').value);
  const payDay = parseInt(document.getElementById('debtPayDay').value);

  if (!name || !amount || !minPay) {
    alert("Please fill all required fields");
    return;
  }

  debts.push({ name, amount, rate, minPay, payDay: isNaN(payDay) ? null : payDay });
  renderTable();
  updateSummary();
  updateUpcomingPayments();
  clearInputs();
}

function clearInputs() {
  document.getElementById('debtName').value = '';
  document.getElementById('debtAmount').value = '';
  document.getElementById('debtRate').value = '';
  document.getElementById('debtMinPay').value = '';
  document.getElementById('debtPayDay').value = '';
}

function renderTable() {
  const tbody = document.querySelector('#debtTable tbody');
  tbody.innerHTML = debts.map((debt, i) => `
    <tr>
      <td><strong>${debt.name}</strong></td>
      <td>$${debt.amount.toLocaleString()}</td>
      <td>${debt.rate}%</td>
      <td>$${debt.minPay}</td>
      <td>${debt.payDay ? debt.payDay + 'th' : '—'}</td>
      <td><button onclick="removeDebt(${i})" style="background:#ef4444;color:white;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;">Remove</button></td>
    </tr>
  `).join('');
}

function removeDebt(index) {
  debts.splice(index, 1);
  renderTable();
  updateSummary();
  updateUpcomingPayments();
}

function updateSummary() {
  const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0);
  const extra = parseFloat(document.getElementById('extraPayment').value) || 0;
  document.getElementById('totalDebt').textContent = '$' + totalDebt.toLocaleString();
  document.getElementById('monthlyExtra').textContent = '$' + extra.toLocaleString();
}

function updateUpcomingPayments() {
  const section = document.getElementById('upcoming-section');
  const container = document.getElementById('upcoming-payments');
  const withDates = debts.filter(d => d.payDay);
  
  if (withDates.length === 0) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';
  container.innerHTML = withDates.map(d => `<p><strong>${d.name}</strong> — Due on <strong>${d.payDay}th</strong></p>`).join('');
}

function setStrategy(strategy) {
  currentStrategy = strategy;
  alert(`Strategy switched to: ${strategy === 'avalanche' ? 'Debt Avalanche' : 'Debt Snowball'}`);
}

function calculatePayoff() {
  if (debts.length === 0) return alert("Please add at least one debt first.");
  alert("✅ Calculation feature is ready. You can further expand the calculatePayoff() function.");
}