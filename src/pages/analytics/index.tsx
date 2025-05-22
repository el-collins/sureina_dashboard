import "react-datepicker/dist/react-datepicker.css";
import { Header, LayoutContent } from "../main-layout";
import { Card } from "../../components/ui/card";
import { FiChevronDown } from "react-icons/fi";
import { FaGoogle, FaTwitter } from "react-icons/fa";
import { SiYandexcloud, SiDuckduckgo } from "react-icons/si";
import { BsBing } from "react-icons/bs";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the props interface for CountUp component
interface CountUpProps {
  end: number | string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatter?: (value: number) => string;
}

// CountUp component for animating numbers
const CountUp = ({ end, duration = 2000, prefix = "", suffix = "", formatter }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const finalValue = typeof end === 'string' ? parseInt(end.replace(/\D/g, '')) : end;
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const startValue = 0;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (finalValue - startValue) + startValue);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    
    animationFrame = requestAnimationFrame(step);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [finalValue, duration]);
  
  const formattedCount = formatter ? formatter(count) : count.toLocaleString();
  
  return (
    <span>{prefix}{formattedCount}{suffix}</span>
  );
};

const AnalyticsPage = () => {
  // Analytics data
  const analyticsData = {
    uniqueUsers: {
      count: "5 329",
      change: "-10%",
      chartData: [30, 40, 35, 25, 40, 35, 30, 25, 35, 40, 45, 35, 30, 25, 35, 40, 30, 25, 35, 45, 40, 30, 35, 45, 40, 30, 25, 35, 40, 45]
    },
    pageViews: {
      count: "10 083",
      change: "-11%",
      chartData: [35, 40, 45, 40, 35, 30, 35, 40, 30, 25, 35, 30, 25, 30, 35, 40, 35, 30, 25, 35, 40, 45, 40, 35, 30, 45, 50, 40, 35, 45]
    },
    pages: [
      { path: "/how-to-measure-performance-in-laravel-ap...", users: 677 },
      { path: "/how-to-use-data-transfer-objects-and-actio...", users: 585 },
      { path: "/", users: 520 },
      { path: "/devops-with-laravel-dockerizing-a-laravel-a...", users: 459 },
      { path: "/build-your-own-laravel-query-builders", users: 401 }
    ],
    sources: [
      { name: "google.com", users: "3 147", icon: <FaGoogle className="text-red-500" /> },
      { name: "t.co", users: "483", icon: <FaTwitter className="text-blue-400" /> },
      { name: "yandex.ru", users: "72", icon: <SiYandexcloud className="text-red-500" /> },
      { name: "bing.com", users: "55", icon: <BsBing className="text-blue-500" /> },
      { name: "duckduckgo.com", users: "43", icon: <SiDuckduckgo className="text-orange-500" /> }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false }
    },
    plugins: {
      legend: { display: false },
      tooltip: { 
        enabled: true,
        displayColors: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
        padding: 8,
        caretSize: 6,
        callbacks: {
          title: function() {
            return '';
          },
          label: function(context: any) {
            return `Value: ${context.raw}`;
          }
        }
      }
    },
    elements: {
      bar: {
        borderWidth: 0,
        borderRadius: 2
      }
    }
  };

  // Function to render chart using Chart.js
  const renderBarChart = (data: number[], color: string = "#fbbf24") => {
    const chartData = {
      labels: data.map((_, i) => i.toString()),
      datasets: [
        {
          data: data,
          backgroundColor: color,
          borderWidth: 0,
          borderRadius: 2,
          barThickness: 8,
          maxBarThickness: 8
        }
      ]
      
    };

    return <Bar data={chartData} options={chartOptions} height={80} />;
  };

  // Format number with spaces (e.g., 5 329)
  const formatNumberWithSpaces = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="w-full">
      <Header
        title="Analytics"
        subtitle="martinjoo.dev"
      >
        <button className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-md shadow-sm">
          Last 30 days <FiChevronDown />
        </button>
      </Header>
      <LayoutContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Unique Users Card */}
          <Card className="p-6">
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <h3 className="text-gray-700 font-medium">Unique Users</h3>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-bold">
                  <CountUp 
                    end={analyticsData.uniqueUsers.count} 
                    duration={1800} 
                    formatter={formatNumberWithSpaces} 
                  />
                </span>
                <span className="text-red-500 text-sm">{analyticsData.uniqueUsers.change}</span>
              </div>
              <div className="mt-auto h-20">
                {renderBarChart(analyticsData.uniqueUsers.chartData)}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>06.</span>
                <span>09.</span>
                <span>12.</span>
                <span>15.</span>
                <span>18.</span>
                <span>21.</span>
                <span>24.</span>
                <span>27.</span>
                <span>01.</span>
                <span>04.</span>
              </div>
            </div>
          </Card>

          {/* Page Views Card */}
          <Card className="p-6">
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <h3 className="text-gray-700 font-medium">Page Views</h3>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-bold">
                  <CountUp 
                    end={analyticsData.pageViews.count} 
                    duration={1800} 
                    formatter={formatNumberWithSpaces} 
                  />
                </span>
                <span className="text-red-500 text-sm">{analyticsData.pageViews.change}</span>
              </div>
              <div className="mt-auto h-20">
                {renderBarChart(analyticsData.pageViews.chartData)}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>06.</span>
                <span>09.</span>
                <span>12.</span>
                <span>15.</span>
                <span>18.</span>
                <span>21.</span>
                <span>24.</span>
                <span>27.</span>
                <span>01.</span>
                <span>04.</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pages Table */}
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-gray-700 font-medium">Pages</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-xs uppercase text-gray-500 text-left py-2 font-medium">Page</th>
                  <th className="text-xs uppercase text-gray-500 text-right py-2 font-medium">Users</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.pages.map((page, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="py-3 text-sm">
                      <div className="bg-amber-50 px-2 py-1 rounded">
                        {page.path}
                      </div>
                    </td>
                    <td className="py-3 text-right text-sm text-gray-700">
                      <CountUp end={page.users} duration={1500} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-center">
              <button className="text-gray-500 text-sm">Show more</button>
            </div>
          </Card>

          {/* Sources Table */}
          <Card className="p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-gray-700 font-medium">Sources</h3>
              <span className="text-xs text-gray-500">Referrer</span>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-xs uppercase text-gray-500 text-left py-2 font-medium">Page</th>
                  <th className="text-xs uppercase text-gray-500 text-right py-2 font-medium">Users</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.sources.map((source, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="py-3 text-sm">
                      <div className="flex items-center gap-2">
                        {source.icon}
                        {source.name}
                      </div>
                    </td>
                    <td className="py-3 text-right text-sm text-gray-700">
                      <CountUp 
                        end={source.users} 
                        duration={1500} 
                        formatter={formatNumberWithSpaces} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-center">
              <button className="text-gray-500 text-sm">Show more</button>
            </div>
          </Card>
        </div>
      </LayoutContent>
    </div>
  );
};

export default AnalyticsPage;
