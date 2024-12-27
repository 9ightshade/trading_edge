import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, Wallet, ArrowUpDown, Activity, Settings } from 'lucide-react';
import { WebSocket } from 'http';

// QuickNode config - replace with your endpoints
const QUICKNODE_WSS_ENDPOINT = 'wss://your-quicknode-endpoint';
const QUICKNODE_HTTP_ENDPOINT = 'https://your-quicknode-endpoint';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [balanceHistory, setBalanceHistory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [networkStatus, setNetworkStatus] = useState({ status: 'Active', gasPrice: '0' });

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket(QUICKNODE_WSS_ENDPOINT);

    ws.onopen = () => {
      // Subscribe to account updates
      ws.send(JSON.stringify({
        method: 'eth_subscribe',
        params: ['newHeads'],
        id: 1
      }));
    };

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      handleWebSocketMessage(data);
    };

    return () => ws.close();
  }, []);

  // Handle WebSocket messages
  const handleWebSocketMessage = async (data) => {
    if (data.method === 'eth_subscription') {
      const { result } = data.params;
      
      // Update balance
      const newBalance = await fetchBalance();
      setBalance(newBalance);
      
      // Update balance history
      setBalanceHistory(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        balance: newBalance
      }].slice(-24)); // Keep last 24 hours
      
      // Check for large transactions
      if (result.transactions?.length > 0) {
        const largeTx = result.transactions.find(tx => 
          parseFloat(tx.value) > 1 // 1 ETH threshold
        );
        
        if (largeTx) {
          createAlert(`Large transaction detected: ${largeTx.value} ETH`);
        }
      }
      
      // Update network status
      const gasPrice = await fetchGasPrice();
      setNetworkStatus({
        status: 'Active',
        gasPrice
      });
    }
  };

  // Fetch balance using QuickNode HTTP endpoint
  const fetchBalance = async () => {
    const response = await fetch(QUICKNODE_HTTP_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'eth_getBalance',
        params: ['YOUR_WALLET_ADDRESS', 'latest'],
        id: 1,
        jsonrpc: '2.0'
      })
    });
    
    const data = await response.json();
    return parseFloat(data.result) / 1e18; // Convert Wei to ETH
  };

  // Fetch current gas price
  const fetchGasPrice = async () => {
    const response = await fetch(QUICKNODE_HTTP_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: 'eth_gasPrice',
        params: [],
        id: 1,
        jsonrpc: '2.0'
      })
    });
    
    const data = await response.json();
    return (parseInt(data.result, 16) / 1e9).toFixed(0); // Convert to Gwei
  };

  // Create new alert
  const createAlert = (message) => {
    setAlerts(prev => [{
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev]);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Alerts Section */}
      <div className="space-y-2">
        {alerts.slice(0, 3).map(alert => (
          <Alert key={alert.id} variant="default">
            <AlertDescription>
              {alert.message} - {alert.timestamp}
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance.toFixed(4)} ETH</div>
            <p className="text-sm text-gray-600">
              {((balanceHistory[balanceHistory.length - 1]?.balance || 0) - 
                (balanceHistory[0]?.balance || 0)).toFixed(4)} ETH (24h)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Status</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStatus.status}</div>
            <p className="text-sm text-gray-600">{networkStatus.gasPrice} Gwei</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Settings</CardTitle>
            <Settings className="h-4 w-4 text-gray-600 cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">Alert Threshold: 1 ETH</div>
            <div className="text-sm text-gray-600">Update Interval: Real-time</div>
          </CardContent>
        </Card>
      </div>

      {/* Balance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Balance History (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map(tx => (
              <div 
                key={tx.hash}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`
                    p-2 rounded-full
                    ${tx.type === 'in' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                  `}>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">{tx.hash.slice(0, 10)}...</div>
                    <div className="text-sm text-gray-600">
                      {new Date(tx.timestamp * 1000).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{tx.value} ETH</div>
                  <div className="text-sm text-green-600">
                    {tx.confirmations} confirmations
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;