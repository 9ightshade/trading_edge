import React, { useState } from 'react';
import logo from "../assets/logo.svg"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bell, Wallet, ArrowUpDown, Activity } from 'lucide-react';

const Dashboard = () => {
    // Sample data - in a real app, this would come from QuickNode
    const [balanceHistory] = useState([
        { timestamp: '00:00', balance: 2.5 },
        { timestamp: '04:00', balance: 2.8 },
        { timestamp: '08:00', balance: 2.6 },
        { timestamp: '12:00', balance: 3.2 },
        { timestamp: '16:00', balance: 3.1 },
        { timestamp: '20:00', balance: 3.4 },
    ]);

    const [recentTransactions] = useState([
        { id: 1, type: 'Receive', amount: '0.5 ETH', time: '5m ago', status: 'completed' },
        { id: 2, type: 'Send', amount: '0.2 ETH', time: '1h ago', status: 'completed' },
        { id: 3, type: 'Swap', amount: '1.0 ETH', time: '2h ago', status: 'pending' },
    ]);

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="flex gap-2 text-2xl font-bold text-green-400"><div>
                    <img src={logo} alt="trading edge logo" /></div>Trading Edge</h1>
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-green-400" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3.4 ETH</div>
                        <p className="text-sm text-gray-600">+0.3 ETH (24h)</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
                        <ArrowUpDown className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.7 ETH</div>
                        <p className="text-sm text-gray-600">12 transactions</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Network Status</CardTitle>
                        <Activity className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Active</div>
                        <p className="text-sm text-gray-600">32 Gwei</p>
                    </CardContent>
                </Card>
            </div>

            {/* Balance Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Balance History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={balanceHistory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="timestamp" />
                                <YAxis />
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
                        {recentTransactions.map(transaction => (
                            <div
                                key={transaction.id}
                                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`
                    p-2 rounded-full
                    ${transaction.type === 'Receive' ? 'bg-green-100 text-green-600' : ''}
                    ${transaction.type === 'Send' ? 'bg-red-100 text-red-600' : ''}
                    ${transaction.type === 'Swap' ? 'bg-blue-100 text-blue-600' : ''}
                  `}>
                                        <ArrowUpDown className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="font-medium">{transaction.type}</div>
                                        <div className="text-sm text-gray-600">{transaction.time}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium">{transaction.amount}</div>
                                    <div className={`text-sm ${transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                                        }`}>
                                        {transaction.status}
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