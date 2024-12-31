
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [transactions, setTransactions] = useState([]); // State to store transactions
    const [month, setMonth] = useState('March');          // State to store selected month
    const [search, setSearch] = useState('');             // State for search input

    // Function to fetch transactions from the backend
    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/transactions', {
                params: { search, page: 1, per_page: 10 },
            });
            setTransactions(response.data); // Update the state with fetched data
        } catch (err) {
            console.error('Error fetching transactions:', err);
        }
    };

    // Fetch transactions whenever search input changes
    useEffect(() => {
        fetchTransactions();
    }, [search]);

    return (
        <div>
            <h1>Transactions</h1>
            <label>Select Month:</label>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                {['January', 'February', 'March', 'April'].map((m) => (
                    <option key={m} value={m}>{m}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t, index) => (
                        <tr key={index}>
                            <td>{t.title}</td>
                            <td>{t.description}</td>
                            <td>{t.price}</td>
                            <td>{t.sold ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
