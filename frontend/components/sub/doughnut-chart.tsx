import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
} from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
)

import {Line, Bar, Scatter, Bubble, Doughnut} from "react-chartjs-2"

import { FC } from 'react';

interface SmallDoughnutChartProps {}
interface BarChartProps {}

const SmallDoughnutChart: FC<SmallDoughnutChartProps> = () => {
    const data = {
        backgroundColor: [
            "rgb(250, 8, 8)",
            "rgb(21, 14, 66)",
        ],
        // labels: ["1", "2"],
        datasets: [
            {
                label: "dataset",
                data: [20, 150],
                backgroundColor: [
                    "rgb(250, 8, 8)",
                    "rgb(21, 14, 66)",
                ],
                hoverOffset: 4
            }
        ]
    }

    const options = {
        elements: {
            arc: {
                weight: 0.2,
                borderWidth: 0.7,
            },
        },
        cutout: 5,
        responsive: true,
        maintainAspectRatio: true,
    }
    return (
        <Doughnut className="w-[20px] h-[20px]" data={data} options={options} />
    );
};

export default SmallDoughnutChart;