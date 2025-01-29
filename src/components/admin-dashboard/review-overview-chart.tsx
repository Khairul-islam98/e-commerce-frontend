import { useGetReviewOverviewQuery } from "@/redux/features/user/useApi";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useRef } from "react";
import Loader from "../loader";

// Importing data labels plugin for better data display
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register the required Chart.js components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  ChartDataLabels
);

export const ReviewOverviewChart = () => {
  const { data, isLoading, isError } = useGetReviewOverviewQuery(undefined);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!data || !data.data || !chartRef.current) return;

    // Full list of months for the year
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Ensure every month is displayed, even if no data exists for it
    const counts = months.map((month) => data.data[month]?.count || 0);
    const avgRatings = months.map((month) => data.data[month]?.avgRating || 0);

    const chartInstance = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: months, // Full year labels
        datasets: [
          {
            label: "Review Count",
            data: counts,
            borderColor: "rgba(85, 235, 21)",
            backgroundColor: "rgba(85, 235, 21, 0.1)",
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: "rgba(85, 235, 21)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(227, 77, 66)",
            // datalabels: {
            //   display: true,
            // //   color: "rgba(227, 77, 66)",
            //   align: "top",
            //   font: { weight: "bold", size: 12 },
            //   formatter: (value) => value,
            // },
          },
          {
            label: "Average Rating",
            data: avgRatings,
            borderColor: "rgba(66, 133, 244)",
            backgroundColor: "rgba(66, 133, 244, 0.1)",
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: "rgba(66, 133, 244)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(66, 133, 244)",
            // datalabels: {
            //   display: true,
            // //   color: "rgba(66, 133, 244)",
            //   align: "bottom",
            //   font: { weight: "bold", size: 12 },
            //   formatter: (value) => value.toFixed(2),
            // },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Monthly Reviews Overview",
            font: { size: 16 },
            padding: { top: 20, bottom: 10 },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const value = tooltipItem.raw;
                return `${tooltipItem.dataset.label}: ${value}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: "Months" },
            grid: {
              color: "rgba(200, 200, 200, 0.3)",
            },
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Review Count" },
            grid: { color: "rgba(200, 200, 200, 0.3)" },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  // Loading and error states
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-lg text-red-500">
        <p className="font-semibold">
          Failed to load data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg border border-gray-200 mt-6">
      
      <div className="relative h-[400px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};
