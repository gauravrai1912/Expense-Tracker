import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import axios from 'axios';
import Cookies from 'js-cookie';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import '../styles/Dashboard.css';
import Navbar from '../components/Navbar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, 
  PointElement, 
  LineElement, 
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,     
  BarElement,
  ArcElement, 
  PointElement, 
  LineElement, 
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchDashboardData = async (month) => {
      try {
        const monthString = month.toISOString().slice(0, 7); 
        console.log(monthString);
        console.log(token);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard?month=${monthString}`, {
          headers: {
            Authorization: token,
          },
        });

        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData(selectedMonth);
  }, [selectedMonth, token]);

  if (loading) return <div className="loading">Loading...</div>;

  const budgetVsSpendingData = data.budgetVsSpending; 
  const labels = budgetVsSpendingData.map(item => item.categoryName);
  const spent = budgetVsSpendingData.map(item => item.spent);

  const pieChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Spending by Category',
        data: spent,
        backgroundColor: [
          '#003f5c',
          '#ffa600',
          '#2f4b7c',
          '#665191',
          '#d45087',
          '#f95d6a',
          '#ff7c43'
        ],
      },
    ],
  };

  const lineChartData = {
    labels: data.spendingTrends.map(trend => trend.month),
    datasets: [
      {
        label: 'Monthly Spending',
        data: data.spendingTrends.map(trend => trend.total_spent),
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
      },
    ],
  };

  return (
    <div className='app-container'>
      <Navbar />
       <div className="dashboard-container">
      <h2>Dashboard Overview</h2>

      <div className="total-expenses">
        <h3>Total Expenses:</h3>
        <p>${data.totalExpenses.toFixed(2)}</p>
      </div>

      <div className="month-selector">
        <DatePicker
          selected={selectedMonth}
          onChange={(date) => setSelectedMonth(date)}
          dateFormat="yyyy-MM"
          showMonthYearPicker
          showFullMonthYearPicker
          placeholderText="Select Month"
        />
      </div>

      <div className="charts-container">
        <h4>Budget vs Actual Spending by Category</h4>
        <div className="chart-row">
          {budgetVsSpendingData.map((item, index) => (
            <div className="chart" key={index}>
              <h5>{item.categoryName}</h5>
              <Bar 
                data={{
                  labels: ['Budget', 'Spent'],
                  datasets: [
                    {
                      label: 'Budget',
                      backgroundColor: '#2f4b7c',
                      data: [item.budget],
                    },
                    {
                      label: 'Spent',
                      backgroundColor: '#de425b',
                      data: [item.spent],
                    },
                  ],
                }} 
                options={{ 
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                    x: {
                      display: false
                    }
                  },
                }} 
              />
            </div>
          ))}
        </div>
        <div className="pie-chart">
          <h4>Spending by Category</h4>
          <div className="chart-row">
            <div className="chart pie-chart">
              <Pie data={pieChartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>

        <div className="line-chart">
          <h4>Spending Trends Over Time</h4>
          <div className="chart-row">
            <div className="chart line-chart">
              <Line data={lineChartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default Dashboard;
