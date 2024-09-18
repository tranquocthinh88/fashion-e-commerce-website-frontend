import { PieChart } from '@mui/x-charts/PieChart';

export default function CircleChartCustom() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      sx={{width: '40%'}}
      height={200}
    />
  );
}
