"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registra os componentes do Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

interface LineChartProps {
  labelTitle: string,
  labelTitle2: string,
  labels: string[];
  dataValues: number[];
  dataQuantidades: number;
  dataMedia: string;
}

// Função para converter segundos para HH:mm:ss
function secondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
}

export default function LineChart({
  labelTitle,
  labelTitle2,
  labels,
  dataValues,
  dataQuantidades,
  dataMedia,
}: LineChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: "Média de Horas",
        data: dataValues,
        borderColor: "#00713C",
        backgroundColor: "#00713C",
        borderWidth: 2,
        fill: true,
        datalabels: {
          display: false,
        },
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
        text: "Média de Horas por Certificado",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            return `Horas: ${secondsToTime(value)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Horas",
        },
        ticks: {
          callback: function (tickValue: string | number) {
            return secondsToTime(Number(tickValue));
          },
        },
      },
    },
  };

  return (
    <Flex
      w="100%"
      maxW="950px"
      h="auto"
      gap={2}
      bg="white"
      flexDirection={"column"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-around"}
        p={5}
        bg="white"
        borderRadius="md"
        boxShadow="md"
      >
        <Flex flexDirection={"row"} gap={1}>
          <Text fontSize="xl" color={"#00713C"}>
            {labelTitle}
          </Text>
          <Text fontSize="xl" color={"#1D1D1B"}>
            {dataQuantidades}
          </Text>
        </Flex>
        <Flex flexDirection={"row"} gap={1}>
          <Text fontSize="xl" color={"#00713C"}>
            {labelTitle2}
          </Text>
          <Text fontSize="xl" color={"#1D1D1B"}>
            {dataMedia}
          </Text>
        </Flex>
      </Box>
      <Box
        w="100%"
        maxW="950px"
        h="auto"
        p={5}
        bg="white"
        borderRadius="md"
        boxShadow="md"
      >
        <Line data={data} options={options} />
      </Box>
    </Flex>
  );
}
