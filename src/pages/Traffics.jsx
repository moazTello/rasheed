import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
// import ReferralTracking from "../components/Fields/StatisticsCircle";

const Traffics = () => {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const ctx2 = chartRef2.current.getContext("2d");
    const ctx3 = chartRef3.current.getContext("2d");
    const ctx4 = chartRef4.current.getContext("2d");
    const lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["حزيران", "أيار", "نيسان", "آذار", "شباط", "كانون الثاني"],
        datasets: [
          {
            label: "2024",
            data: [600, 250, 300, 150, 200, 100],
            borderColor: "#532DF8",
            backgroundColor: "rgba(172, 187, 120, 0.2)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: "2023",
            data: [500, 35, 75, 170, 25, 50],
            borderColor: "#EBBF36",
            backgroundColor: "rgba(172, 187, 180, 0.2)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        labelShow:false,
        responsive: true,
        maintainAspectRatio: false,
        grid: {
          strokeDashArray: 5,
          borderColor: "#56577A"
        },
        scales: {
          // x: {
          //   grid: {
          //     color: "rgba(255, 255, 255, 0.1)",
          //   },
          //   ticks: {
          //     color: "#9ca3af",
          //   },
          // },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#9ca3af",
            },
          },
        },
        plugins: {
          // yaxis: {
          //   show: false,
          //   labels: {
          //     style: {
          //       colors: "#c8cfca",
          //       fontSize: "12px",
          //     },
          //   },
          // },
          legend: {
            labels: {
              color: "#fff",
            },
          },
        },
      },
    });

    const lineChart2 = new Chart(ctx2, {
      type: "line",
      data: {
        labels: ["24","23","22","21","20","19","18","17","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"],
        datasets: [
          {
            label: "2024",
            data: [600, 250, 300, 150, 200, 100,600, 250, 300, 150, 200, 100,600, 250, 300, 150, 200, 100,600, 250, 300, 150, 200, 100],
            borderColor: "#532DF8",
            backgroundColor: "rgba(172, 187, 120, 0.2)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        labelShow:false,
        responsive: true,
        maintainAspectRatio: false,
        grid: {
          strokeDashArray: 5,
          borderColor: "#56577A"
        },
        scales: {
          // x: {
          //   grid: {
          //     color: "rgba(255, 255, 255, 0.1)",
          //   },
          //   ticks: {
          //     color: "#9ca3af",
          //   },
          // },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#9ca3af",
            },
          },
        },
        plugins: {
          // yaxis: {
          //   show: false,
          //   labels: {
          //     style: {
          //       colors: "#c8cfca",
          //       fontSize: "12px",
          //     },
          //   },
          // },
          legend: {
            labels: {
              color: "#fff",
            },
          },
        },
      },
    });

    const lineChart3 = new Chart(ctx3, {
      type: "line",
      data: {
        labels: ["حزيران", "أيار", "نيسان", "آذار", "شباط", "كانون الثاني"],
        datasets: [
          {
            label: "2024",
            data: [600, 250, 300, 150, 200, 100],
            borderColor: "#532DF8",
            backgroundColor: "rgba(172, 187, 120, 0.2)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: "2023",
            data: [500, 35, 75, 170, 25, 50],
            borderColor: "#EBBF36",
            backgroundColor: "rgba(172, 187, 180, 0.2)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        labelShow:false,
        responsive: true,
        maintainAspectRatio: false,
        grid: {
          strokeDashArray: 5,
          borderColor: "#56577A"
        },
        scales: {
          // x: {
          //   grid: {
          //     color: "rgba(255, 255, 255, 0.1)",
          //   },
          //   ticks: {
          //     color: "#9ca3af",
          //   },
          // },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#9ca3af",
            },
          },
        },
        plugins: {
          // yaxis: {
          //   show: false,
          //   labels: {
          //     style: {
          //       colors: "#c8cfca",
          //       fontSize: "12px",
          //     },
          //   },
          // },
          legend: {
            labels: {
              color: "#fff",
            },
          },
        },
      },
    });

    const lineChart4 = new Chart(ctx4, {
      type: "line",
      data: {
        labels: ["24","23","22","21","20","19","18","17","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"],
        datasets: [
          {
            label: "2024",
            data: [600, 250, 300, 150, 200, 100,600, 250, 300, 150, 200, 100,600, 250, 300, 150, 200, 100,600, 250, 300, 150, 200, 100],
            borderColor: "#532DF8",
            backgroundColor: "rgba(172, 187, 120, 0.2)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        labelShow:false,
        responsive: true,
        maintainAspectRatio: false,
        grid: {
          strokeDashArray: 5,
          borderColor: "#56577A"
        },
        scales: {
          // x: {
          //   grid: {
          //     color: "rgba(255, 255, 255, 0.1)",
          //   },
          //   ticks: {
          //     color: "#9ca3af",
          //   },
          // },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#9ca3af",
            },
          },
        },
        plugins: {
          // yaxis: {
          //   show: false,
          //   labels: {
          //     style: {
          //       colors: "#c8cfca",
          //       fontSize: "12px",
          //     },
          //   },
          // },
          legend: {
            labels: {
              color: "#fff",
            },
          },
        },
      },
    });

    return () => {
      lineChart.destroy();
      lineChart2.destroy();
      lineChart3.destroy();
      lineChart4.destroy();
    };
  }, []);

  return (
    <div className="w-full h-fit py-8 md:py-32">
      <div className="w-full flex flex-col md:flex-row justify-center items-center p-4">
        <div className="bg-stone-900 bg-opacity-70 rounded-2xl p-5 md:p-7 m-2 md:w-[50%]">
          <div className="mb-5 p-5">
            <div className="flex flex-col items-end">
              <h2 className="text-lg w-full text-right font-bold text-white mb-1">
                الحركة على التطبيق
              </h2>
              <p className="text-gray-400">في
               2024
                {/* <span className="text-primary font-bold"> (+5%) أكثر </span> */}
              </p>
            </div>
          </div>
          <div className="w-full min-h-[300px] h-[300px]">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
       
        <div className="bg-stone-900 bg-opacity-70 rounded-2xl p-5 md:p-7 m-2 md:w-[50%]">
          <div className="mb-5 p-5">
            <div className="flex flex-col items-end">
              <h2 className="text-lg w-full text-right font-bold text-white mb-1">
            ضيف امكانية اختيار السنة و الشهر     الحركة على التطبيق
              </h2>
              <p className="text-gray-400">في
               الشهر 5
                {/* <span className="text-primary font-bold"> (+5%) أكثر </span> */}
              </p>
            </div>
          </div>
          <div className="w-full min-h-[300px] h-[300px]">
            <canvas ref={chartRef2}></canvas>
          </div>
        </div>
        {/* <div className="px-5 mt-5">
      <ReferralTracking/>
      <ReferralTracking/>
        </div>
        <div className="px-5 mt-5">
      <ReferralTracking/>
      <ReferralTracking/>
        </div> */}
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center p-4">
        <div className="bg-stone-900 bg-opacity-70 rounded-2xl p-5 md:p-7 m-2 md:w-[50%]">
          <div className="mb-5 p-5">
            <div className="flex flex-col items-end">
              <h2 className="text-lg w-full text-right font-bold text-white mb-1">
                المستخدمين الجدد
              </h2>
              <p className="text-gray-400">في
               2024
                {/* <span className="text-primary font-bold"> (+5%) أكثر </span> */}
              </p>
            </div>
          </div>
          <div className="w-full min-h-[300px] h-[300px]">
            <canvas ref={chartRef3}></canvas>
          </div>
        </div>
       
        <div className="bg-stone-900 bg-opacity-70 rounded-2xl p-5 md:p-7 m-2 md:w-[50%]">
          <div className="mb-5 p-5">
            <div className="flex flex-col items-end">
              <h2 className="text-lg w-full text-right font-bold text-white mb-1">
              المستخدمين الجدد
              </h2>
              <p className="text-gray-400">في
               الشهر 5
                {/* <span className="text-primary font-bold"> (+5%) أكثر </span> */}
              </p>
            </div>
          </div>
          <div className="w-full min-h-[300px] h-[300px]">
            <canvas ref={chartRef4}></canvas>
          </div>
        </div>
        {/* <div className="px-5 mt-5">
      <ReferralTracking/>
      <ReferralTracking/>
        </div>
        <div className="px-5 mt-5">
      <ReferralTracking/>
      <ReferralTracking/>
        </div> */}
      </div>
    </div>
  );
};

export default Traffics;
