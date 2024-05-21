// import { PieChart } from 'react-minimal-pie-chart';
// import { BarChart } from "@mui/icons-material";
 
import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart, LinearScale } from "chart.js";
import { BarElement } from "chart.js";

import { useState } from "react";


Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);

export default function HistogramChartSuperAdmin () {
    const [active, setActive]= useState("dashboard");

    const data = [
        { data: [35, 44, 24, 34], color: 'red' }, // Individual bar color
        { data: [51, 6, 49, 30], color: 'blue' },
      ];

    return (
        <div className="flex flex-col mt-2 mb-16 w-full border rounded-lg shadow-md shadow-gray-500 px-8 py-2  hover:scale-105 duration-300 hover:border-2 hover:border-yellow-500">
            <h1 className="text-header py-6">
                Salmonella Cleaned
            </h1>

            <div className="flex h-full justify-center items-center my-4">

                <Bar 
                    data={{
                        labels: ["August", "September", "October", "December"],

                        datasets: [
                            {
                                // Label for bars
                                label: "total count/value",
                                // Data or value of your each variable
                                data: [1552, 1319, 613, 1400],
                                // Color of each bar
                                backgroundColor: 
                                    ["aqua", "green", "red", "#E38627"],
                                // Border color of each bar
                                borderColor: ["aqua", "green", "red", "yellow"],
                                borderWidth: 0.5,
                            },
                        ],
                    }}

                    // className="sm:scale-100 sm:mx-0 scale-110"
                />
                

{/* 
                <Bar
                    data={{
                        // Name of the variables on x-axies for each bar
                        labels: ["1st bar", "2nd bar", "3rd bar", "4th bar"],
                        datasets: [
                            {
                                // Label for bars
                                label: "total count/value",
                                // Data or value of your each variable
                                data: [1552, 1319, 613, 1400],
                                // Color of each bar
                                backgroundColor: 
                                    ["aqua", "green", "red", "yellow"],
                                // Border color of each bar
                                borderColor: ["aqua", "green", "red", "yellow"],
                                borderWidth: 0.5,
                            },
                        ],
                    }}
                    // Height of graph
                    height={400}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                  // The y-axis value will start from zero
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                        legend: {
                            labels: {
                                fontSize: 15,
                            },
                        },
                    }}
                /> */}
                
                {/* <BarChart
                    xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                    series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                    width={500}
                    height={300}
                /> */}
            </div>
        </div>
    )
}
