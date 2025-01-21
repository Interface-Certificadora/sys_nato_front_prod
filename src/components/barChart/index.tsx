'use client'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importando o plugin de rótulos
import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface TagData {
  descricao: string;
  quantidade: number;
}

interface BarChartProps {
  lista_tags: TagData[];
  labelTitle: string;
  dataQuantidades: number;
}

export default function BarChart({ lista_tags, labelTitle, dataQuantidades }: BarChartProps) {


  const maiorMenor = lista_tags.sort((a, b) => b.quantidade - a.quantidade);

  // Selecionar as 5 tags com mais quantidade
  const top5Tags = maiorMenor.slice(0, 5);

  // Agrupar o restante em "Outras"
  const outrasTags = maiorMenor.slice(5);
  const totalOutros = outrasTags.reduce((acc, tag) => acc + tag.quantidade, 0);

  // Novo array de tags com a categoria "Outras"
  const finalTags = [...top5Tags, { descricao: 'Outras', quantidade: totalOutros }];

  // Definindo as cores personalizadas para as barras
  const colors = [
    'rgba(255, 99, 132, 0.2)', // Rosa claro
    'rgba(255, 159, 64, 0.2)', // Laranja claro
    'rgba(255, 205, 86, 0.2)', // Amarelo claro
    'rgba(75, 192, 192, 0.2)', // Verde claro
    'rgba(54, 162, 235, 0.2)', // Azul claro
    'rgba(153, 102, 255, 0.2)', // Roxo claro
  ];

  const data = {
    labels: finalTags.map(tag => tag.descricao), 
    datasets: [
      {
        label: 'Quantidade',
        data: finalTags.map(tag => tag.quantidade),
        backgroundColor: colors.slice(0, finalTags.length), // Atribui cores baseadas no número de tags
        borderColor: colors.slice(0, finalTags.length).map(color => color.replace('0.2', '1')), // Ajusta a borda para uma cor mais forte
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Problemas Registrados :',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const descricao = finalTags[context.dataIndex].descricao;
            const quantidade = context.raw;
            return `${descricao}: ${quantidade} registros`; 
          },
        },
      },
      datalabels: {
        color: 'black',
        font: {
          size: 12,
        },
        formatter: (value: number) => `${value}`,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Tags',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
          font: {
            size: 10, 
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Quantidade',
        },
        beginAtZero: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          font: {
            size: 10, 
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
        <Bar data={data} options={options} />
      </Box>
    </Flex>
  );
};
