const CRYPTO_PAIRS = [
  'BTC/USDT', 'ETH/USDT', 'NOT/USDT', 'NEIRO/USDT', 'APE/USDT',
  'TURBO/USDT', 'ATM/USDT', 'DOT/USDT', 'SYS/USDT', '1MBABYDOGE/USDT',
  'GALA/USDT', 'SOL/USDT', 'TRX/USDT', 'BAL/USDT', 'ALPACA/USDT',
  'ALPHA/USDT', 'WLD/USDT', 'BNT/USDT', 'ZK/USDT', 'DEXE/USDT',
  'HMSTR/USDT', 'DOGE/USDT', 'DOGS/USDT', 'SUI/USDT', 'ATOM/USDT',
  'AVA/USDT', 'AXS/USDT', 'AVAX/USDT', 'BAKE/USDT', 'HOT/USDT',
  'KAVA/USDT', 'MASK/USDT', 'SHIB/USDT', 'STORJ/USDT', 'SUSHI/USDT',
  'UNI/USDT', 'XRP/USDT', 'BNB/USDT', 'PEOPLE/USDT', 'ASTR/USDT',
  'APT/USDT', 'PEPE/USDT', 'AST/USDT', 'ARK/USDT', 'MEME/USDT'
];

let selectedPair = 'BTC/USDT';
let updateInterval;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const pairsList = document.getElementById('pairsList');
const signalCard = document.getElementById('signalCard');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const signalContent = document.getElementById('signalContent');
const currentYear = document.getElementById('currentYear');

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Initialize pairs list
function initializePairsList(pairs = CRYPTO_PAIRS) {
  pairsList.innerHTML = pairs
    .map(pair => `
      <button 
        class="pair-button ${pair === selectedPair ? 'selected' : ''}" 
        data-pair="${pair}"
      >
        ${pair}
      </button>
    `)
    .join('');
}

// Fetch crypto data from Binance
async function fetchCryptoData(pair) {
  const cleanSymbol = pair.replace('/', '').replace('1M', '1m');
  const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${cleanSymbol}`);
  
  if (!response.ok) {
    throw new Error('فشل في جلب البيانات');
  }
  
  const data = await response.json();
  return parseFloat(data.price);
}

// Generate trading signals
function generateSignals(price) {
  return {
    targets: [
      { price: price * 1.01, type: 'هدف 1' },
      { price: price * 1.015, type: 'هدف 2' },
      { price: price * 1.02, type: 'هدف 3' }
    ],
    stopLoss: price * 0.985
  };
}

// Update signal card
function updateSignalCard(pair, price) {
  const { targets, stopLoss } = generateSignals(price);
  
  signalContent.innerHTML = `
    <div class="price-header">
      <h2 class="pair-name">${pair}</h2>
      <span class="current-price">$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</span>
    </div>

    <div class="signal-indicator">
      <span>إشارة التداول:</span>
      <span style="color: var(--color-primary)">شراء ↗</span>
    </div>

    ${targets.map(target => `
      <div class="target-item">
        <span>${target.type}</span>
        <span style="color: var(--color-primary)">$${target.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</span>
      </div>
    `).join('')}

    <div class="stop-loss">
      <span>وقف الخسارة</span>
      <span>$${stopLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</span>
    </div>
  `;
}

// Update data
async function updateData() {
  try {
    loadingIndicator.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    signalContent.classList.add('hidden');

    const price = await fetchCryptoData(selectedPair);
    updateSignalCard(selectedPair, price);

    loadingIndicator.classList.add('hidden');
    errorMessage.classList.add('hidden');
    signalContent.classList.remove('hidden');
  } catch (error) {
    loadingIndicator.classList.add('hidden');
    signalContent.classList.add('hidden');
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = error.message;
  }
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredPairs = CRYPTO_PAIRS.filter(pair => 
    pair.toLowerCase().includes(searchTerm)
  );
  initializePairsList(filteredPairs);
});

pairsList.addEventListener('click', (e) => {
  const button = e.target.closest('.pair-button');
  if (!button) return;

  selectedPair = button.dataset.pair;
  document.querySelectorAll('.pair-button').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.pair === selectedPair);
  });
  
  updateData();
});

// Initialize
initializePairsList();
updateData();

// Set up auto-update interval
updateInterval = setInterval(updateData, 10000); // Update every 10 seconds