import "react-datepicker/dist/react-datepicker.css";
import { Header, LayoutContent } from "../main-layout";
import { Card } from "../../components/ui/card";
import {
  FaYoutube,
  FaGoogle,
  FaTiktok,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Bar, Line, Bubble } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
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
  const finalValue = typeof end === 'string' ? 
    parseInt(end.replace(/[^\d.-]/g, '')) : 
    end;
  
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

interface AdPerformanceYoutube {
  platform: string;
  icon: React.ReactNode;
  clicks: number[];
  active: boolean[];
  images: string[];
}

interface AdPerformanceFacebook {
  platform: string;
  icon: React.ReactNode;
  clicks: number;
  impressions: string;
  adSpend: string;
  image: string;
}

type AdPerformanceData = [AdPerformanceFacebook, AdPerformanceYoutube];

const AdSpendDashboard = () => {
  // Ad spend data by channel
  const adSpendData = [
    {
      channel: "Youtube",
      icon: <FaYoutube className="text-red-600 mr-2" />,
      spend: "$8,324,327",
    },
    {
      channel: "Google",
      icon: <FaGoogle className="text-blue-500 mr-2" />,
      spend: "$5,157,252",
    },
    {
      channel: "Tiktok",
      icon: <FaTiktok className="text-black mr-2" />,
      spend: "$4,024,000",
    },
    {
      channel: "Facebook",
      icon: <FaFacebook className="text-blue-600 mr-2" />,
      spend: "$3,084,501",
    },
    {
      channel: "Instagram",
      icon: <FaInstagram className="text-pink-500 mr-2" />,
      spend: "$1,000,000",
    },
  ];

  // Performance metrics
  const performanceMetrics = [
    {
      label: "Ad Spend",
      value: "220M",
      change: "+3.6%",
      changeType: "positive",
      color: "text-blue-600",
    },
    {
      label: "Revenue",
      value: "230M",
      change: "+117.4%",
      changeType: "positive",
      color: "text-blue-600",
    },
    {
      label: "ROAS",
      value: "102.71%",
      change: "+109.8%",
      changeType: "positive",
      color: "text-blue-600",
    },
  ];

  // Engagement metrics
  const engagementMetrics = [
    {
      label: "Impressions",
      value: "+10%",
      subtext: "110 vs. 100",
      changeType: "positive",
      color: "text-blue-600",
      chartData: [20, 25, 18, 30, 22, 28, 35, 25]
    },
    {
      label: "CTR",
      value: "+10%",
      subtext: "0.55% vs. 0.51%",
      changeType: "positive",
      color: "text-blue-600",
      chartData: [15, 20, 25, 18, 22, 28, 20, 25]
    },
    {
      label: "CPC",
      value: "-10%",
      subtext: "$0.50 vs. $0.55",
      changeType: "negative",
      color: "text-orange-500",
      chartData: [30, 25, 22, 18, 25, 20, 15, 20]
    },
    {
      label: "CPA",
      value: "-10%",
      subtext: "$0.50 vs. $0.55",
      changeType: "negative",
      color: "text-orange-500",
      chartData: [25, 30, 28, 22, 18, 25, 30, 28]
    },
  ];

  // Youtube Ad spend data for the chart
  const youtubeAdSpendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Youtube',
        data: [300, 400, 150, 250, 350, 400],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Previous period',
        data: [250, 300, 120, 200, 300, 350],
        backgroundColor: 'rgba(209, 213, 219, 0.8)',
      }
    ]
  };

  // Bubble chart data
  const bubbleChartData = {
    datasets: [
      {
        label: 'Facebook',
        data: [{ x: 300, y: 250, r: 30 }],
        backgroundColor: 'rgba(59, 89, 152, 0.7)',
      },
      {
        label: 'LinkedIn',
        data: [{ x: 200, y: 200, r: 20 }],
        backgroundColor: 'rgba(0, 119, 181, 0.7)',
      },
      {
        label: 'Google',
        data: [{ x: 100, y: 150, r: 15 }],
        backgroundColor: 'rgba(52, 168, 83, 0.7)',
      }
    ]
  };

  // Line chart data
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Facebook',
        data: [100, 150, 300, 350, 300, 250],
        borderColor: 'rgba(59, 89, 152, 1)',
        backgroundColor: 'rgba(59, 89, 152, 0.1)',
        tension: 0.4,
      },
      {
        label: 'LinkedIn',
        data: [50, 100, 150, 200, 180, 150],
        borderColor: 'rgba(0, 119, 181, 1)',
        backgroundColor: 'rgba(0, 119, 181, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Google',
        data: [200, 180, 150, 120, 180, 200],
        borderColor: 'rgba(52, 168, 83, 1)',
        backgroundColor: 'rgba(52, 168, 83, 0.1)',
        tension: 0.4,
      }
    ]
  };

  // Ad performance data
  const adPerformanceData: AdPerformanceData = [
    {
      platform: "Facebook",
      icon: <FaFacebook className="text-blue-600 text-2xl" />,
      clicks: 799,
      impressions: "13,193",
      adSpend: "$266,484.53",
      image:
        "https://placehold.co/150x80/4267B2/FFFFFF?text=Facebook+Ad",
    },
    {
      platform: "Youtube Ads",
      icon: <FaYoutube className="text-red-600 text-2xl" />,
      clicks: [260899, 125891, 8000],
      active: [true, true, false],
      images: [
        "https://placehold.co/150x80/FF0000/FFFFFF?text=Youtube+Ad+1",
        "https://placehold.co/150x80/FF0000/FFFFFF?text=Youtube+Ad+2",
        "https://placehold.co/150x80/FF0000/FFFFFF?text=Youtube+Ad+3",
      ],
    },
  ];

  // Extract the Youtube data to ensure type safety
  const youtubeData = adPerformanceData[1];

  // Format currency
  const formatCurrency = (value: number): string => {
    return '$' + value.toLocaleString();
  };

  // Chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          padding: 15
        }
      },
      tooltip: {
        displayColors: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
        padding: 8
      }
    }
  };

  const bubbleChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        displayColors: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
        padding: 8
      }
    }
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        displayColors: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
        padding: 8
      }
    }
  };

  const miniLineChartOptions = {
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
      point: {
        radius: 0
      },
      line: {
        tension: 0.4
      }
    }
  };

  // Function to render mini line chart for engagement metrics
  const renderMiniLineChart = (data: number[], color: string) => {
    const chartData = {
      labels: Array.from({ length: data.length }, (_, i) => i.toString()),
      datasets: [
        {
          data: data,
          borderColor: color,
          backgroundColor: 'transparent',
          borderWidth: 2,
          fill: false
        }
      ]
    };

    return <Line data={chartData} options={miniLineChartOptions} height={40} />;
  };

  return (
    <div className="w-full">
      <Header
        title="Ad Spend Dashboard"
        subtitle="Monitor your advertising performance across channels"
      />
      <LayoutContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Ad Spend by Channel */}
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-gray-700 font-medium">
                Ad spend by channel
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                      Channel
                    </th>
                    <th className="py-2 px-4 text-right text-sm font-medium text-gray-500">
                      Ad Spend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {adSpendData.map((item, index) => (
                    <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 hover:text-blue-500">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {item.icon}
                          {item.channel}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <CountUp 
                          end={item.spend} 
                          duration={1800 + (index * 200)} 
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-500 text-white">
                    <td className="py-3 px-4 font-medium">Total</td>
                    <td className="py-3 px-4 text-right font-medium">
                      <CountUp 
                        end="$21,590,080" 
                        duration={2500} 
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Youtube Ad spend chart */}
            <div className="mt-6">
              <h3 className="text-gray-700 font-medium mb-4">Youtube Ad spend</h3>
              <div className="h-64">
                <Bar data={youtubeAdSpendData} options={barChartOptions} />
              </div>
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="text-sm text-gray-500 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-2xl font-bold mb-1 text-blue-600">
                    <CountUp 
                      end={metric.value} 
                      duration={2000} 
                    />
                  </div>
                  <div
                    className={`text-xs ${
                      metric.changeType === "positive"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {metric.change}{" "}
                    {metric.changeType === "positive" ? "↑" : "↓"}
                  </div>
                </div>
              ))}
            </div>

            {/* Engagement Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {engagementMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="border rounded-md p-4 flex items-center"
                >
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">
                      {metric.label}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-semibold ${metric.color}`}>
                        {metric.value}{" "}
                        {metric.changeType === "positive" ? "↑" : "↓"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {metric.subtext}
                      </span>
                    </div>
                  </div>
                  <div className="w-24 h-12 relative">
                    {/* Line chart visualization */}
                    {renderMiniLineChart(
                      metric.chartData, 
                      metric.changeType === 'positive' ? '#4299e1' : '#ed8936'
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Ad Performance Charts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <span className="mr-2">Ad Spend grouped by Channel</span>
                </h4>
                <div className="h-48">
                  <Bubble data={bubbleChartData} options={bubbleChartOptions} />
                </div>
              </div>
              <div className="border rounded-md p-4">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <span className="mr-2">Ad Spend grouped by Channel</span>
                </h4>
                <div className="h-48">
                  <Line data={lineChartData} options={lineChartOptions} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Ad Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Facebook Ad */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-md mr-3">
                {adPerformanceData[0].icon}
              </div>
              <h3 className="text-gray-700 font-medium">Facebook</h3>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <img
                  src={adPerformanceData[0].image}
                  alt="Facebook Ad"
                  className="w-full h-32 object-cover rounded-md"
                />
                <div className="mt-3">
                  <div className="bg-blue-500 text-white text-xs rounded px-2 py-1 inline-block">
                    Download Ad Guide
                  </div>
                </div>
              </div>
              <div className="w-1/2 space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Clicks</div>
                  <div className="font-medium">
                    <CountUp 
                      end={adPerformanceData[0].clicks} 
                      duration={1800} 
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Impressions</div>
                  <div className="font-medium">
                    <CountUp 
                      end={adPerformanceData[0].impressions} 
                      duration={1800} 
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Ad Spend</div>
                  <div className="font-medium">
                    <CountUp 
                      end={adPerformanceData[0].adSpend} 
                      duration={1800} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Youtube Ads */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-md mr-3">
                  {youtubeData.icon}
                </div>
                <h3 className="text-gray-700 font-medium">Youtube Ads</h3>
              </div>
              <div className="text-sm text-gray-500">Clicks</div>
            </div>
            <div className="space-y-4">
              {youtubeData.clicks.map((clicks, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-1/3">
                    <img
                      src={youtubeData.images[index]}
                      alt={`Youtube Ad ${index + 1}`}
                      className="w-full h-16 object-cover rounded-md"
                    />
                  </div>
                  <div className="w-1/3 text-right font-medium">
                    <CountUp 
                      end={clicks} 
                      duration={1800 + (index * 200)} 
                    />
                  </div>
                  <div className="w-1/3">
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={youtubeData.active[index]}
                        readOnly
                      />
                      <div
                        className={`block w-12 h-6 rounded-full ${
                          youtubeData.active[index]
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <div
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          youtubeData.active[index]
                            ? "transform translate-x-6"
                            : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </LayoutContent>
    </div>
  );
};

export default AdSpendDashboard;
