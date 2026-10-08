
import React, { useState } from 'react'
import { Chart, registerables } from "chart.js"
import { Pie } from 'react-chartjs-2'

Chart.register(...registerables)

const InstructorChart = ({ courses }) => {

    const [currChart, setCurrChart] = useState("students")

    // function to generate random colors
    const getRandomColors = (numColors) => {
        const colors = []

        for (let i = 0; i < numColors; i++) {
            const color = `rgb(
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)},
                ${Math.floor(Math.random() * 256)}
            )`

            colors.push(color)
        }

        return colors
    }

    // chart data for students
    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),

        datasets: [
            {
                data: courses.map(
                    (course) => course.totalStudentsEnrolled
                ),
                backgroundColor: getRandomColors(courses.length),
                borderWidth: 1,
            }
        ]
    }

    // chart data for income
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),

        datasets: [
            {
                data: courses.map(
                    (course) => course.totalAmountGenerated
                ),
                backgroundColor: getRandomColors(courses.length),
                borderWidth: 1,
            }
        ]
    }

    // chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "bottom",

                labels: {
                    color: "#DBDDEA",
                    padding: 20,
                },
            },
        },
    }

    return (
        <div>

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-xl font-semibold text-richblack-5">
                    Visualise
                </p>

                {/* Buttons */}
                <div className="flex rounded-lg bg-richblack-700 p-1">

                    <button
                        onClick={() => setCurrChart("students")}
                        className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            currChart === "students"
                                ? "bg-richblack-900 text-yellow-50"
                                : "text-richblack-300 hover:text-richblack-5"
                        }`}
                    >
                        Students
                    </button>

                    <button
                        onClick={() => setCurrChart("income")}
                        className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            currChart === "income"
                                ? "bg-richblack-900 text-yellow-50"
                                : "text-richblack-300 hover:text-richblack-5"
                        }`}
                    >
                        Income
                    </button>

                </div>
            </div>

            {/* Chart */}
            <div className="h-[350px] w-full">
                <Pie
                    data={
                        currChart === "students"
                            ? chartDataForStudents
                            : chartDataForIncome
                    }
                    options={options}
                />
            </div>

        </div>
    )
}

export default InstructorChart

