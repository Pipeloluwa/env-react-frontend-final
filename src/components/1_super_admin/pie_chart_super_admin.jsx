// import { PieChart } from 'react-minimal-pie-chart';
import { Pie } from "react-chartjs-2";
import { CategoryScale, Chart, LinearScale } from "chart.js";
import { BarElement, ArcElement } from "chart.js";

import { useState } from "react";



Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement, ArcElement);


export default function PieChartSuperAdmin () {
    const [active, setActive]= useState("dashboard");

    return (
        <div className="flex flex-col mt-2 mb-16 w-full border rounded-lg shadow-md shadow-gray-500 px-8 py-2  hover:scale-105 duration-300 hover:border-2 hover:border-yellow-500">
            <h1 className="text-header py-6">
                Locations
            </h1>

            <div className="flex justify-center items-center my-4">
                {/* <PieChart 
                    data={[
                        {title: 'USA', value: 650, color: "#E38627"},
                        {title: 'UK', value: 1600, color: "#9C27B0"},
                        {title: 'CAD', value: 650, color: "#1A237E"},
                        {title: 'NGA', value: 650, color: "#388E3C"},
                        {title: 'USA', value: 650, color: "#FFD600"},
                        {title: 'RUSSIA', value: 650, color: "#D81B60"}
                    ]}

                    className="md:w-[200px] sm:w-[200px] w-[150px] mx-auto"
                /> */}

                <Pie 
                    data={{
                        labels: ["USA", "UK", "CAD", "NGA", "USA", "RUS"],

                        datasets: [
                            {
                                // Label for bars
                                label: "total count/value",
                                // Data or value of your each variable
                                data: [1552, 1319, 613, 1400, 650, 650],
                                // Color of each bar
                                backgroundColor: 
                                       ["cyan", "#FFD600", "#388E3C", "#1A237E", "#9C27B0", "#E38627"],
                                    // ["aqua", "green", "red", "#E38627", "9C27B0"],
                                // Border color of each bar
                                borderColor: ["white", "white", "white", "white", "white", "white"],
                                borderWidth: 1.0,
                            },
                        ],
                    }}


                    className="sm:w-[90px] sm:scale-100 scale-[80%] h-[30px] mx-auto"
                />


                <div className="flex flex-col ">
                    <div className="flex items-center">
                        <li className="text-2xl text-[#E38627]" />
                        <h1 className="text-[12px] font-medium -ml-4">USA</h1>
                    </div>

                    <div className="flex items-center">
                        <li className="text-2xl text-[#9C27B0]" />
                        <h1 className="text-[12px] font-medium -ml-4">UK</h1>
                    </div>
                    
                    <div className="flex items-center">
                        <li className="text-2xl text-[#1A237E]" />
                        <h1 className="text-[12px] font-medium -ml-4">CAD</h1>
                    </div>

                    <div className="flex items-center">
                        <li className="text-2xl text-[#388E3C]" />
                        <h1 className="text-[12px] font-medium -ml-4">NGA</h1>
                    </div>

                    <div className="flex items-center">
                        <li className="text-2xl text-[#FFD600]" />
                        <h1 className="text-[12px] font-medium -ml-4">USA</h1>
                    </div>

                    <div className="flex items-center">
                        <li className="text-2xl text-[#D81B60]" />
                        <h1 className="text-[12px] font-medium -ml-4">RUS</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
