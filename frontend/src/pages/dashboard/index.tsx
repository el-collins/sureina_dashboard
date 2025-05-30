import "react-datepicker/dist/react-datepicker.css";
import { Card } from "../../components/ui/card";
import { FiDownload } from "react-icons/fi";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { useApi } from '../../hooks/useApi';
import { OrderTrend, salesApi } from '../../services/api';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  
  // Fetch data from APIs
  const { data: topProducts, isLoading: isLoadingTopProducts } = useApi(
    () => salesApi.getTopProducts(selectedYear),
    { dependencies: [selectedYear] }
  );

  const { data: salesLocation, isLoading: isLoadingSalesLocation } = useApi(
    () => salesApi.getSalesByLocation(selectedYear, selectedCountry),
    { dependencies: [selectedYear, selectedCountry] }
  );

  const { data: orderTrends, isLoading: isLoadingOrderTrends } = useApi(
    () => salesApi.getOrderTrends(selectedYear),
    { dependencies: [selectedYear] }
  );

  // Export functions
  const exportToCSV = (data: any[], filename: string) => {
    // Implementation of CSV export
    console.log('Exporting', filename, data);
  };

  // Loading state
  if (isLoadingTopProducts || isLoadingSalesLocation || isLoadingOrderTrends) {
    // add a loading state with a spinner
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Ensure data is in the correct format
  const orderTrendsData = orderTrends || [];
  const topProductsData = topProducts || { top_by_quantity: [], top_by_revenue: [] };
  const salesLocationData = salesLocation || { by_country: [], by_province: [] };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  // Get unique countries and sort them
  const availableCountries = salesLocationData.by_country
    .map(loc => loc.country)
    .filter((country): country is string => Boolean(country))
    .sort();

  return (
    <div className="min-h-screen bg-white">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-black mb-8">Sureina Shopify Analytics Dashboard</h1>
        
        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">Year:</label>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Years</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">Country:</label>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="px-4 py-2 border rounded-lg"
              disabled={isLoadingSalesLocation}
            >
              <option value="all">All Countries</option>
              {availableCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Top Products Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Top Products</h2>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">By Quantity</h3>
              <Bar
                data={{
                  labels: topProductsData.top_by_quantity.map(p => p.name),
                  datasets: [{
                    data: topProductsData.top_by_quantity.map(p => p.quantity),
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                  }]
                }}
                options={{
                  indexAxis: 'y',
                  plugins: { legend: { display: false } }
                }}
              />
              <button
                onClick={() => exportToCSV(topProductsData.top_by_quantity, 'quantity.csv')}
                className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <FiDownload /> Export Quantity CSV
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">By Revenue</h3>
              <Bar
                data={{
                  labels: topProductsData.top_by_revenue.map(p => p.name),
                  datasets: [{
                    data: topProductsData.top_by_revenue.map(p => p.revenue),
                    backgroundColor: 'rgba(34, 197, 94, 0.8)',
                  }]
                }}
                options={{
                  indexAxis: 'y',
                  plugins: { legend: { display: false } }
                }}
              />
              <button
                onClick={() => exportToCSV(topProductsData.top_by_revenue, 'revenue.csv')}
                className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <FiDownload /> Export Revenue CSV
              </button>
            </div>
          </Card>

          {/* Sales by Location */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Sales by Location</h2>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">By Country</h3>
              <div className="h-[300px]">
                <Pie
                  data={{
                    labels: salesLocationData.by_country.map(loc => loc.country),
                    datasets: [{
                      data: salesLocationData.by_country.map(loc => loc.revenue),
                      backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                      ],
                    }]
                  }}
                />
              </div>
              <button
                onClick={() => exportToCSV(salesLocationData.by_country, 'countries.csv')}
                className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <FiDownload /> Export Country CSV
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Top Cities</h3>
              <Bar
                data={{
                  labels: salesLocationData.by_province.map(loc => loc.province),
                  datasets: [{
                    data: salesLocationData.by_province.map(loc => loc.revenue),
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                  }]
                }}
              />
              <button
                onClick={() => exportToCSV(salesLocationData.by_province, 'cities.csv')}
                className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <FiDownload /> Export Cities CSV
              </button>
            </div>
          </Card>
        </div>

        {/* Order Trends */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Order Trends Over Time</h2>
          </div>
          <Line
            data={{
              labels: orderTrendsData.map((trend: OrderTrend) => trend.date),
              datasets: [
                {
                  label: 'Revenue ($)',
                  data: orderTrendsData.map((trend: OrderTrend) => trend.revenue),
                  borderColor: 'rgb(59, 130, 246)',
                  yAxisID: 'y',
                },
                {
                  label: 'Order Count',
                  data: orderTrendsData.map((trend: OrderTrend) => trend.order_count),
                  borderColor: 'rgb(34, 197, 94)',
                  yAxisID: 'y1',
                }
              ]
            }}
            options={{
              scales: {
                y: {
                  type: 'linear',
                  position: 'left',
                },
                y1: {
                  type: 'linear',
                  position: 'right',
                  grid: { drawOnChartArea: false },
                }
              }
            }}
          />
          <button
            onClick={() => exportToCSV(orderTrendsData, 'trends.csv')}
            className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <FiDownload /> Export Trends CSV
          </button>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;

