import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface TopProductsResponse {
  top_by_quantity: Array<{
    product_id: string;
    name: string;
    quantity: number;
  }>;
  top_by_revenue: Array<{
    product_id: string;
    name: string;
    revenue: number;
  }>;
}

export interface SalesLocationResponse {
  by_country: Array<{
    country: string;
    revenue: number;
    order_count: number;
  }>;
  by_province: Array<{
    country: string;
    province: string;
    revenue: number;
    order_count: number;
  }>;
}

export interface OrderTrendsResponse {
  trends: OrderTrend[];
}

export interface OrderTrend {
  date: string;
  revenue: number;
  order_count: number;
  revenue_change: number;
}

export const salesApi = {
  getTopProducts: async (year: string = 'all') => {
    const response = await api.get<TopProductsResponse>('/top-products', {
      params: { year },
    });
    return response.data;
  },

  getSalesByLocation: async (year: string = 'all', country: string = 'all') => {
    const response = await api.get<SalesLocationResponse>('/sales-by-location', {
      params: { year, country },
    });
    return response.data;
  },

  getOrderTrends: async (year: string = 'all') => {
    const response = await api.get<OrderTrendsResponse>('/order-trends', {
      params: { year },
    });
    const { trends } = response.data;
    return trends;
  },
}; 