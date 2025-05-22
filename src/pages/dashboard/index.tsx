import "react-datepicker/dist/react-datepicker.css";
import { Header, LayoutContent } from "../main-layout";
import { Card } from "../../components/ui/card";
import {
  FiMail,
  FiUpload,
  FiMessageSquare,
  FiShoppingCart,
} from "react-icons/fi";
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
  end: number;
  duration?: number;
  prefix?: string;
}

// CountUp component for animating numbers
const CountUp = ({ end, duration = 2000, prefix = "" }: CountUpProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const startValue = 0;
    const finalValue = end;
    
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
  }, [end, duration]);
  
  return (
    <span>{prefix}{count}</span>
  );
};

const DashboardHome = () => {
  // Income data for the bar chart
  const incomeCategories = [
    { name: "Marketing", percentage: 70, color: "rgb(59, 130, 246)" },
    { name: "Advertisement", percentage: 80, color: "rgb(59, 130, 246)" },
    { name: "Consulting", percentage: 40, color: "rgb(59, 130, 246)" },
    { name: "Development", percentage: 60, color: "rgb(59, 130, 246)" },
  ];

  // Contact data for the table
  const contactData = [
    {
      firstName: "Emelia",
      lastName: "Gislason",
      city: "Lake Zelda",
      street: "Kulas Shoals",
    },
    {
      firstName: "Cloyd",
      lastName: "Armstrong",
      city: "East Pierce",
      street: "Lyla Heights",
    },
    {
      firstName: "Rahul",
      lastName: "Funk",
      city: "Sibylside",
      street: "Jolie Shoals",
    },
    {
      firstName: "Hilbert",
      lastName: "Langosh",
      city: "Anaisshire",
      street: "Sim Station",
    },
    {
      firstName: "Cloyd",
      lastName: "Wilderman",
      city: "North Brad",
      street: "Ruecker Turnpike",
    },
  ];

  // Stats for the info cards
  const statsCards = [
    {
      title: "Unread Email",
      count: 210,
      icon: <FiMail className="text-white text-2xl" />,
      color: "bg-purple-500",
    },
    {
      title: "Image Upload",
      count: 210,
      icon: <FiUpload className="text-white text-2xl" />,
      color: "bg-blue-500",
    },
    {
      title: "Total Message",
      count: 210,
      icon: <FiMessageSquare className="text-white text-2xl" />,
      color: "bg-green-500",
    },
    {
      title: "Orders Post",
      count: 210,
      icon: <FiShoppingCart className="text-white text-2xl" />,
      color: "bg-rose-500",
    },
  ];

  // Income values
  const incomeValue = 15000;

  // Search input state
  const [searchValue, setSearchValue] = useState("");

  // Chart options for horizontal bar charts
  const barChartOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { 
        display: false,
        max: 100,
        min: 0
      },
      y: { 
        display: false 
      }
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
        zIndex: 9999,
        caretSize: 6,
        callbacks: {
          title: function() {
            return '';
          },
          label: function(context: any) {
            return `${context.raw}%`;
          }
        }
      }
    },
    elements: {
      bar: {
        borderWidth: 0,
        borderRadius: 4
      }
    }
  };

  // Render horizontal bar chart
  const renderProgressBar = (category: any) => {
    const data = {
      labels: [category.name],
      datasets: [
        {
          data: [category.percentage],
          backgroundColor: category.color,
          barThickness: 10,
          borderRadius: 4,
          zIndex: 9999
        }
      ]
    };

    return <Bar data={data} options={barChartOptions} height={20} />;
  };

  return (
    <div className="w-full">
      <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      <LayoutContent>
        {/* Income Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Left Panel - Income Chart */}
          <div className="lg:col-span-1">
            <Card className="h-full p-5">
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Income"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>

              <div className="space-y-6">
                {incomeCategories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        <CountUp end={category.percentage} duration={1500} />%
                      </span>
                    </div>
                    <div className="w-full h-7">
                      {renderProgressBar(category)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod tempor
                </p>
              </div>
            </Card>
          </div>

          {/* Right Panel - Contacts Table */}
          <div className="lg:col-span-2">
            <Card className="h-full p-5">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                        First Name
                      </th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                        Last Name
                      </th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                        City
                      </th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                        Street
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactData.map((contact, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-pink-50 hover:text-pink-500 border-b border-gray-100`}
                      >
                        <td
                          className={`py-3 px-4`}
                        >
                          {contact.firstName}
                        </td>
                        <td className="py-3 px-4">{contact.lastName}</td>
                        <td className="py-3 px-4">{contact.city}</td>
                        <td className="py-3 px-4">{contact.street}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsCards.map((card, index) => (
            <Card key={index} className="p-0 overflow-hidden">
              <div className="flex">
                <div
                  className={`${card.color} p-4 flex items-center justify-center w-16`}
                >
                  {card.icon}
                </div>
                <div className="p-4 flex flex-col justify-center flex-grow">
                  <div className="text-2xl font-bold">
                    <CountUp end={card.count} duration={1800} />
                  </div>
                  <div className="text-sm text-gray-500">{card.title}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Income Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((_, index) => (
            <Card key={index} className="p-5">
              <h3 className="text-gray-500 font-medium mb-3">INCOME</h3>
              <p className="text-3xl font-bold text-rose-500">
                $<CountUp end={incomeValue} duration={2000} />
              </p>
            </Card>
          ))}
        </div>
      </LayoutContent>
    </div>
  );
};

export default DashboardHome;
