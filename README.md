# Trading Edge (Te)

A real-time token price alert application built with React and QuickNode infrastructure. Monitor wallet balances, transactions, and receive alerts for significant activities across blockchain networks.

## Features

- Real-time wallet balance tracking
- Live transaction monitoring
- Performance visualization with interactive charts
- Automated alerts for large transactions
- Responsive design for all devices

## Tech Stack

- React
- QuickNode Streams for real-time blockchain data
- QuickNode Functions for serverless operations
- Recharts for data visualization
- Tailwind CSS for styling

## Prerequisites

- Node.js >= 16
- QuickNode API key
- Supported wallet (Phantom, MetaMask, etc.)

## Installation

```bash
# Clone the repository
git clone https://github.com/9ightshade/trading_edge.git

# Install dependencies
cd trading_edge
pnpm install

# Set up environment variables
cp .env.example .env
# Add your QuickNode API key to .env
```

## QuickNode Integration

### Setting up Streams

1. Create a QuickNode Stream:
```javascript
const stream = new QuickNodeStream({
  endpoint: process.env.QUICKNODE_STREAM_URL,
  config: {
    filters: [...],
    blockchain: "solana"
  }
});
```

2. Subscribe to events:
```javascript
stream.subscribe((event) => {
  // Handle incoming blockchain events
});
```

### Implementing Functions

1. Deploy a QuickNode Function:
```javascript
export async function handleTransaction(event) {
  // Process transaction data
  // Generate alerts if needed
  return {
    processed: true,
    alert: event.amount > threshold
  };
}
```

## Development

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Project Structure

```
src/
├── components/
│   ├── DeFiMonitor.tsx
│   ├── TransactionList.tsx
│   └── PerformanceChart.tsx
├── hooks/
│   └── useQuickNode.ts
├── utils/
│   └── quicknode.ts
└── App.tsx
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License

## Support

For issues and feature requests, please open a GitHub issue.