"use client"

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
    ArcElement,
    BarElement
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
    ArcElement,
    BarElement
)

import {Bar} from "react-chartjs-2"

import { FC } from 'react';


interface BarChartProps {}

const BarChart: FC<BarChartProps> = () => {
    const data = {
        labels: [
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
        ],
        datasets: [
            {
                label: "data",
                borderRadius: 30,
                data: [0.3],
                backgroundColor: "rgb(250, 8, 8)",
                barThickness: 10,
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                // position: "top",
                // align: "start",
                // labels: {
                //     boxWidth: 7,
                //     usePointStyle: true,
                //     pointStyle: "circle",
                // },
                title: {
                    text: "Revenue Generated",
                    display: true,
                    color: "#000",
                    font: {
                        size: 18
                    },
                },
            },
        },
        scales: {
            xAxis: {
                display: false,
            },
            yAxis: {
                max: 1,
            },
        },
        elements: {
            bar: {
                // barPercentage: 0.3,
                // categoryPercentage: 1,
            },
        },
        maintainAspectRatio: false,
    }
    return (
        <div className="w-[60%] h-full shadow-md">
            <Bar data={data} options={options}/>
        </div>
    );
};

export default BarChart;