'use client';
import { Box } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importa o plugin para os rótulos de dados

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels); // Registra o plugin

interface PieChartProps {
  labels: string[];
  dataValues: number[];
  colors?: string[];
  title?: string;
}

export default function PieChart({
  labels,
  dataValues,
  colors,
  title,
}: PieChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: "Solicitações",
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
      datalabels: {
        display: true,
        color: 'white', 
        font: {
          weight: 'bold' as const, 
          size: 12,
        },
        formatter: (value: number, ctx: any) => {
          const total = ctx.dataset.data.reduce((acc: number, val: number) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(1); 
          return `${percentage}%`;
        },
      },
    },
  };

  return (
    <Box
      w="100%"
      maxW="280px"
      h="auto"
      p={5}
      bg={"white"}
      shadow={"md"}
      borderRadius="md"
    >
      <Pie data={data} options={options} />
    </Box>
  );
}
