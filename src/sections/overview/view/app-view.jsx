import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ProcessCard from '../ProcessCard';
import PieChartComponent from '../PieChartComponent';
import LineChartComponent from '../LineChartComponent';
import img1 from "../../../../public/assets/images/process/analysing_8649259.png";
import img2 from "../../../../public/assets/images/process/iteration_16090683.png";
import img3 from "../../../../public/assets/images/process/project-plan_8980777.png";
import img4 from "../../../../public/assets/images/process/work-process_3281345.png";

const generateRandomData = (name) => ({
  name,
  pid: Math.floor(Math.random() * 10000),
  cpu: `${Math.floor(Math.random() * 100)}%`,
  memory: `${Math.floor(Math.random() * 1000)}MB`
});

const generateChartData = (labelCount) => {
  const labels = [];
  const series = [
    { name: 'CPU Usage', data: [] },
    { name: 'Memory Usage', data: [] },
    { name: 'Disk Usage', data: [] },
    { name: 'Network Activity', data: [] },
    { name: 'IO Wait', data: [] },
    { name: 'Swap Usage', data: [] },
  ];

  for (let i = 0; i < labelCount; i += 1) {
    labels.push(`Day ${i + 1}`);
    series.forEach(serie => {
      serie.data.push(Math.floor(Math.random() * 100));
    });
  }

  return { labels, series };
};

const generatePieChartData = () => {
  const values = [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ];
  const total = values.reduce((acc, value) => acc + value, 0);
  const percentages = values.map(value => Math.round((value / total) * 100));

  return [
    { label: 'Blocked by Firewall', value: percentages[0] },
    { label: 'Blocked by Antivirus', value: percentages[1] },
    { label: 'Blocked by Policy', value: percentages[2] },
    { label: 'Others', value: percentages[3] },
  ];
};

const AppView = () => {
  const [pro1, setPro1] = useState(generateRandomData('Process 1'));
  const [pro2, setPro2] = useState(generateRandomData('Process 2'));
  const [pro3, setPro3] = useState(generateRandomData('Process 3'));
  const [pro4, setPro4] = useState(generateRandomData('Process 4'));
  const [chartData, setChartData] = useState(generateChartData(10)); // Initial data with 10 labels
  const [pieChartData, setPieChartData] = useState(generatePieChartData());

  useEffect(() => {
    const interval = setInterval(() => {
      setPro1(generateRandomData('Process 1'));
      setPro2(generateRandomData('Process 2'));
      setPro3(generateRandomData('Process 3'));
      setPro4(generateRandomData('Process 4'));
      setChartData(generateChartData(10)); // Update chart data every 5 seconds
      setPieChartData(generatePieChartData()); // Update pie chart data every 5 seconds
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
      Analytical Dashboard, For System Monitoring 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <ProcessCard
            title={pro1?.name}
            total={pro1?.cpu}
            memory={pro1?.memory}
            proId={pro1?.pid}
            color="success"
            icon={<img alt="icon" src={img1} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <ProcessCard
            title={pro2?.name}
            total={pro2?.cpu}
            memory={pro2?.memory}
            proId={pro2?.pid}
            color="info"
            icon={<img alt="icon" src={img2}  />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <ProcessCard
            title={pro3?.name}
            total={pro3?.cpu}
            memory={pro3?.memory}
            proId={pro3?.pid}
            color="warning"
            icon={<img alt="icon" src={img3}  />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <ProcessCard
            title={pro4?.name}
            total={pro4?.cpu}
            memory={pro4?.memory}
            proId={pro4?.pid}
            color="error"
            icon={<img alt="icon" src={img4} />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <LineChartComponent
            title="System Health Monitoring"
            subheader="(+43%) than last year"
            chart={chartData}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <PieChartComponent
            title="BlockingPieChart"
            chart={{ series: pieChartData }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AppView;
