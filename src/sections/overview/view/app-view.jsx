
import React, {useState, useEffect} from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';


const generateRandomData = (name) => ({
  name,
  pid: Math.floor(Math.random() * 10000),
  cpu: `${Math.floor(Math.random() * 100)}%`,
  memory: `${Math.floor(Math.random() * 1000)}MB`
});

const  AppView=()=> {
  const [pro1, setPro1] = useState(generateRandomData('Process 1'));
  const [pro2, setPro2] = useState(generateRandomData('Process 2'));
  const [pro3, setPro3] = useState(generateRandomData('Process 3'));
  const [pro4, setPro4] = useState(generateRandomData('Process 4'));

  useEffect(() => {
    const interval = setInterval(() => {
      setPro1(generateRandomData('Process 1'));
      setPro2(generateRandomData('Process 2'));
      setPro3(generateRandomData('Process 3'));
      setPro4(generateRandomData('Process 4'));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={pro1?.name}
            total={pro1?.cpu}
            memory={pro1?.memory}
            proId={pro1?.pid}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={pro2?.name}
            total={pro2?.cpu}
            memory={pro2?.memory}
            proId={pro2?.pid}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
          title={pro3?.name}
            total={pro3?.cpu}
            memory={pro3?.memory}
            proId={pro3?.pid}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
           title={pro4?.name}
            total={pro4?.cpu}
            memory={pro4?.memory}
            proId={pro4?.pid}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="System Health Monitoring"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
      {
        name: 'CPU Usage',
        type: 'line',
        fill: 'solid',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        name: 'Memory Usage',
        type: 'line',
        fill: 'solid',
        data: [28, 48, 40, 19, 86, 27, 90],
      },
      {
        name: 'Disk Usage',
        type: 'line',
        fill: 'solid',
        data: [45, 39, 60, 71, 66, 75, 50],
      },
      {
        name: 'Network Activity',
        type: 'line',
        fill: 'solid',
        data: [35, 49, 70, 51, 66, 35, 60],
      },
      {
        name: 'IO Wait',
        type: 'line',
        fill: 'solid',
        data: [20, 30, 45, 50, 40, 35, 60],
      },
      {
        name: 'Swap Usage',
        type: 'line',
        fill: 'solid',
        data: [10, 20, 35, 40, 30, 25, 50],
      },
      {
        name: 'Page Faults',
        type: 'line',
        fill: 'solid',
        data: [15, 25, 35, 45, 55, 65, 75],
      },
    ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="BlockingPieChart "
            chart={{
              series: [
                { label: 'Blocked by Firewall', value: 40 },
                { label: 'Blocked by Antivirus', value: 30 },
                { label: 'Blocked by Policy', value: 20 },
                { label: 'Others', value:  10},
              ],
            }}
          />
        </Grid>

      

     

       
      </Grid>
    </Container>
  );
}

export default AppView


