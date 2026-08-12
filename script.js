// Dashboard: recent transactions (static preview list)
const RECENT_TRANSACTIONS = [
  { icon: '☕', iconBg: '#F3E8D9', name: 'Starbucks', category: 'Food & Drink', date: 'Aug 8', amountDisplay: '-$6.40', amountClass: 'negative' },
  { icon: '🎬', iconBg: '#F3E1E1', name: 'Netflix', category: 'Subscription', date: 'Aug 7', amountDisplay: '-$15.99', amountClass: 'negative' },
  { icon: '💼', iconBg: '#E9F9EF', name: 'Salary', category: 'Income', date: 'Aug 5', amountDisplay: '+$4,200.00', amountClass: 'positive' },
  { icon: '🚗', iconBg: '#E1EAF7', name: 'Uber', category: 'Transport', date: 'Aug 4', amountDisplay: '-$18.20', amountClass: 'negative' },
  { icon: '🛒', iconBg: '#EAF3E4', name: 'Grocery Store', category: 'Groceries', date: 'Aug 3', amountDisplay: '-$84.53', amountClass: 'negative' }
];

// Dashboard: income vs expenses chart data
const CHART_DATA = {
  months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  income: [6200, 7100, 6800, 7600, 8300, 8940],
  expenses: [4100, 4600, 5000, 4700, 5100, 5318]
};

// Transactions page: full transaction history
const ALL_TRANSACTIONS = [
  { icon: '☕', iconBg: '#F3E8D9', name: 'Starbucks', category: 'Food & Drink', date: 'Aug 8, 2026', method: 'Debit Card', amount: -6.40, status: 'Completed' },
  { icon: '🎬', iconBg: '#F3E1E1', name: 'Netflix', category: 'Subscription', date: 'Aug 7, 2026', method: 'Credit Card', amount: -15.99, status: 'Completed' },
  { icon: '💼', iconBg: '#E9F9EF', name: 'Salary', category: 'Income', date: 'Aug 5, 2026', method: 'Bank Transfer', amount: 4200.00, status: 'Completed' },
  { icon: '🚗', iconBg: '#E1EAF7', name: 'Uber', category: 'Transport', date: 'Aug 4, 2026', method: 'Debit Card', amount: -18.20, status: 'Completed' },
  { icon: '🛒', iconBg: '#EAF3E4', name: 'Grocery Store', category: 'Groceries', date: 'Aug 3, 2026', method: 'Credit Card', amount: -84.53, status: 'Completed' },
  { icon: '💡', iconBg: '#FDF3D9', name: 'Electric Company', category: 'Utilities', date: 'Aug 2, 2026', method: 'Bank Transfer', amount: -112.30, status: 'Pending' },
  { icon: '🏠', iconBg: '#E1EAF7', name: 'Rent Payment', category: 'Housing', date: 'Aug 1, 2026', method: 'Bank Transfer', amount: -1800.00, status: 'Completed' },
  { icon: '🎧', iconBg: '#F3E1E1', name: 'Spotify', category: 'Subscription', date: 'Jul 30, 2026', method: 'Credit Card', amount: -10.99, status: 'Completed' },
  { icon: '💻', iconBg: '#E9F9EF', name: 'Freelance Project', category: 'Income', date: 'Jul 28, 2026', method: 'Bank Transfer', amount: 950.00, status: 'Completed' },
  { icon: '🍔', iconBg: '#F3E8D9', name: 'Chipotle', category: 'Food & Drink', date: 'Jul 27, 2026', method: 'Debit Card', amount: -13.75, status: 'Completed' },
  { icon: '⛽', iconBg: '#E1EAF7', name: 'Shell Gas Station', category: 'Transport', date: 'Jul 25, 2026', method: 'Debit Card', amount: -46.10, status: 'Completed' },
  { icon: '🏋️', iconBg: '#FDF3D9', name: 'Gym Membership', category: 'Health', date: 'Jul 24, 2026', method: 'Credit Card', amount: -39.99, status: 'Failed' },
  { icon: '📱', iconBg: '#E1EAF7', name: 'Verizon', category: 'Utilities', date: 'Jul 22, 2026', method: 'Bank Transfer', amount: -85.00, status: 'Completed' },
  { icon: '🎁', iconBg: '#F3E1E1', name: 'Amazon', category: 'Shopping', date: 'Jul 20, 2026', method: 'Credit Card', amount: -62.48, status: 'Completed' },
  { icon: '💰', iconBg: '#E9F9EF', name: 'Dividend Payout', category: 'Income', date: 'Jul 18, 2026', method: 'Bank Transfer', amount: 310.20, status: 'Completed' }
];

const TRANSACTIONS_PAGE_SIZE = 8;
const TRANSACTIONS_REFERENCE_DATE = new Date('2026-08-09');

function drawIncomeExpenseChart(container, data) {
  if (!container) return;
  container.innerHTML = '';

  const w = container.clientWidth || 600;
  const h = 260;
  const pad = { top: 10, right: 10, bottom: 26, left: 46 };

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

  const { months, income, expenses } = data;
  const maxVal = Math.max(...income, ...expenses) * 1.15;
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const x = i => pad.left + (i / (months.length - 1)) * innerW;
  const y = v => pad.top + innerH - (v / maxVal) * innerH;

  for (let g = 0; g <= 3; g++) {
    const gy = pad.top + (innerH / 3) * g;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', pad.left);
    line.setAttribute('x2', w - pad.right);
    line.setAttribute('y1', gy);
    line.setAttribute('y2', gy);
    line.setAttribute('stroke', '#F0F0F3');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);
  }

  const makePath = (vals, color) => {
    const d = vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '2.5');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);

    vals.forEach((v, i) => {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', x(i));
      c.setAttribute('cy', y(v));
      c.setAttribute('r', '3.5');
      c.setAttribute('fill', '#fff');
      c.setAttribute('stroke', color);
      c.setAttribute('stroke-width', '2.2');
      svg.appendChild(c);
    });
  };

  makePath(expenses, '#F59E0B');
  makePath(income, '#4F46E5');

  const labelFontSize = w < 340 ? 9 : 11.5;
  months.forEach((m, i) => {
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', x(i));
    t.setAttribute('y', h - 6);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('font-size', String(labelFontSize));
    t.setAttribute('fill', '#8A8A96');
    t.setAttribute('font-family', 'Manrope, sans-serif');
    t.setAttribute('font-weight', '600');
    t.textContent = m;
    svg.appendChild(t);
  });

  container.appendChild(svg);
}

function renderRecentTransactions() {
  const list = document.getElementById('recentTransactions');
  if (!list) return;

  list.innerHTML = RECENT_TRANSACTIONS.map(tx => `
    <li class="tx-row">
      <span class="tx-icon" style="background:${tx.iconBg}">${tx.icon}</span>
      <div class="tx-info">
        <div class="tx-name">${tx.name}</div>
        <div class="tx-category">${tx.category}</div>
      </div>
      <div class="tx-date">${tx.date}</div>
      <div class="tx-amount ${tx.amountClass}">${tx.amountDisplay}</div>
    </li>
  `).join('');
}

function initMobileNav() {
  const toggle = document.getElementById('menuToggle');
  const drawer = document.getElementById('sidebarNav');
  const overlay = document.getElementById('sidebarOverlay');
  if (!toggle || !drawer || !overlay) return;

  const isOpen = () => drawer.classList.contains('open');

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  toggle.addEventListener('click', () => {
    isOpen() ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);

  drawer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen()) closeDrawer();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860 && isOpen()) closeDrawer();
  });
}

function initDashboard() {
  const chartEl = document.getElementById('incomeExpenseChart');
  if (!chartEl) return;

  const redraw = () => drawIncomeExpenseChart(chartEl, CHART_DATA);
  redraw();
  window.addEventListener('resize', redraw);

  renderRecentTransactions();
}

function initTransactionsPage() {
  const tbody = document.getElementById('transactionsTableBody');
  if (!tbody) return;

  const searchInput = document.getElementById('searchInput');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const categorySelect = document.getElementById('categoryFilter');
  const dateSelect = document.getElementById('dateFilter');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const loadMoreWrap = document.getElementById('loadMoreWrap');
  const emptyState = document.getElementById('emptyState');

  const state = { search: '', filter: 'all', category: 'All', date: 'all', visibleCount: TRANSACTIONS_PAGE_SIZE };

  const statusClass = status => {
    if (status === 'Completed') return 'status-completed';
    if (status === 'Pending') return 'status-pending';
    return 'status-failed';
  };

  const formatAmount = amount => (amount >= 0 ? '+$' : '-$') + Math.abs(amount).toFixed(2);

  function getFiltered() {
    const query = state.search.trim().toLowerCase();
    return ALL_TRANSACTIONS.filter(tx => {
      if (query && !tx.name.toLowerCase().includes(query) && !tx.category.toLowerCase().includes(query)) return false;
      if (state.filter === 'income' && tx.amount < 0) return false;
      if (state.filter === 'expense' && tx.amount >= 0) return false;
      if (state.category !== 'All' && tx.category !== state.category) return false;
      if (state.date !== 'all') {
        const days = parseInt(state.date, 10);
        const diffDays = (TRANSACTIONS_REFERENCE_DATE - new Date(tx.date)) / (1000 * 60 * 60 * 24);
        if (diffDays > days) return false;
      }
      return true;
    });
  }

  function render() {
    const filtered = getFiltered();
    const rows = filtered.slice(0, state.visibleCount);

    tbody.innerHTML = rows.map(tx => `
      <tr>
        <td class="col-tx">
          <div class="cell-tx">
            <span class="cell-tx-icon" style="background:${tx.iconBg}">${tx.icon}</span>
            <span class="cell-tx-name">${tx.name}</span>
          </div>
        </td>
        <td class="col-category">${tx.category}</td>
        <td class="col-date cell-date">${tx.date}</td>
        <td class="col-method">${tx.method}</td>
        <td class="col-amount cell-amount ${tx.amount >= 0 ? 'positive' : 'negative'}">${formatAmount(tx.amount)}</td>
        <td class="col-status"><span class="status-badge ${statusClass(tx.status)}">${tx.status}</span></td>
      </tr>
    `).join('');

    emptyState.hidden = filtered.length !== 0;
    loadMoreWrap.hidden = state.visibleCount >= filtered.length;

    const hasActiveFilters = !!state.search || state.filter !== 'all' || state.category !== 'All' || state.date !== 'all';
    clearFiltersBtn.hidden = !hasActiveFilters;

    tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === state.filter));
  }

  searchInput.addEventListener('input', e => {
    state.search = e.target.value;
    state.visibleCount = TRANSACTIONS_PAGE_SIZE;
    render();
  });

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      state.filter = btn.dataset.filter;
      state.visibleCount = TRANSACTIONS_PAGE_SIZE;
      render();
    });
  });

  categorySelect.addEventListener('change', e => {
    state.category = e.target.value;
    state.visibleCount = TRANSACTIONS_PAGE_SIZE;
    render();
  });

  dateSelect.addEventListener('change', e => {
    state.date = e.target.value;
    state.visibleCount = TRANSACTIONS_PAGE_SIZE;
    render();
  });

  clearFiltersBtn.addEventListener('click', () => {
    state.search = '';
    state.filter = 'all';
    state.category = 'All';
    state.date = 'all';
    state.visibleCount = TRANSACTIONS_PAGE_SIZE;
    searchInput.value = '';
    categorySelect.value = 'All';
    dateSelect.value = 'all';
    render();
  });

  loadMoreBtn.addEventListener('click', () => {
    state.visibleCount += TRANSACTIONS_PAGE_SIZE;
    render();
  });

  render();
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initDashboard();
  initTransactionsPage();
});
