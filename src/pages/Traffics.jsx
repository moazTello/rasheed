import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Chart } from 'chart.js/auto';
import useStore from '../zustand/useStore';

const Traffics = () => {
  const { getTrafics, trafics } = useStore();

  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [availableYears, setAvailableYears] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [traficYearData, setTraficYearData] = useState([]);
  const [traficMonthData, setTraficMonthData] = useState([]);

  // Arabic Month Mapping
  const arabicMonths = {
    '01': 'يناير',
    '02': 'فبراير',
    '03': 'مارس',
    '04': 'أبريل',
    '05': 'مايو',
    '06': 'يونيو',
    '07': 'يوليو',
    '08': 'أغسطس',
    '09': 'سبتمبر',
    10: 'أكتوبر',
    11: 'نوفمبر',
    12: 'ديسمبر',
  };

  useEffect(() => {
    getTrafics();
  }, [getTrafics]);

  useEffect(() => {
    if (!trafics || trafics.length === 0) return;

    const years = trafics.map((item) => `20${item.year}`);
    setAvailableYears(years);
    setSelectedYear(years[0]);

    if (trafics[0]?.months) {
      const months = trafics[0].months.map((month) => ({
        value: month.month,
        label: arabicMonths[month.month.toString().padStart(2, '0')] || month.month,
      }));
      setAvailableMonths(months);
      setSelectedMonth(months[0]?.value);
    }
    // eslint-disable-next-line
  }, [trafics]);

  useEffect(() => {
    if (!selectedYear || !trafics) return;

    const yearData = trafics.find((item) => `20${item.year}` === selectedYear);
    if (yearData) {
      const monthsData = yearData.months;
      setTraficYearData({
        labels: monthsData.map((month) => arabicMonths[month.month.toString().padStart(2, '0')] || month.month),
        unique: monthsData.map((month) => month.firstTime),
        total: monthsData.map((month) => month.allTime),
      });

      const selectedMonthData = monthsData.find((month) => month.month === selectedMonth);
      if (selectedMonthData) {
        setTraficMonthData({
          labels: selectedMonthData.days.map((day) => day.day),
          unique: selectedMonthData.days.map((day) => day.firstTime),
          total: selectedMonthData.days.map((day) => day.allTime),
        });
      }
    }
    // eslint-disable-next-line
  }, [selectedYear, selectedMonth, trafics]);

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);

  const chartRefs = useRef([]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
          ticks: {
            color: '#9ca3af',
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: '#fff',
          },
        },
      },
    }),
    [],
  );

  const chartData = useMemo(
    () => [
      {
        title: 'الزيارات الشهرية على التطبيق',
        subtitle: `الزيارات للسنة ${selectedYear}`,
        labels: traficYearData.labels,
        datasets: [
          {
            label: 'المستخدمين الجدد',
            data: traficYearData.unique,
            borderColor: '#532DF8',
            backgroundColor: 'rgba(172, 187, 120, 0.2)',
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: 'الزيارات',
            data: traficYearData.total,
            borderColor: '#EBBF36',
            backgroundColor: 'rgba(172, 187, 180, 0.2)',
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      {
        title: 'الزيارات اليومية على التطبيق',
        subtitle: `الزيارات للشهر ${availableMonths.find((m) => m.value === selectedMonth)?.label || ''}`,
        labels: traficMonthData.labels,
        datasets: [
          {
            label: 'المستخدمين الجدد',
            data: traficMonthData.unique,
            borderColor: '#532DF8',
            backgroundColor: 'rgba(172, 187, 120, 0.2)',
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: 'الزيارات',
            data: traficMonthData.total,
            borderColor: '#EBBF36',
            backgroundColor: 'rgba(172, 187, 180, 0.2)',
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
    ],
    [traficYearData, traficMonthData, selectedYear, selectedMonth, availableMonths],
  );

  useEffect(() => {
    const charts = chartRefs.current.map((ref, index) => {
      if (ref) {
        const ctx = ref.getContext('2d');
        return new Chart(ctx, {
          type: 'line',
          data: chartData[index],
          options: chartOptions,
        });
      }
      return null;
    });

    return () => {
      charts.forEach((chart) => chart && chart.destroy());
    };
  }, [chartData, chartOptions]);

  return (
    <div className="w-full h-fit py-8 md:py-32">
      <div className="flex justify-center items-center gap-4 mb-4">
        <select value={selectedYear} onChange={handleYearChange} className="p-2 rounded-md">
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select value={selectedMonth} onChange={handleMonthChange} className="p-2 rounded-md">
          {availableMonths.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex flex-col justify-center items-center p-4">
        {chartData.map((item, index) => (
          <div key={index} className="bg-stone-900 bg-opacity-70 rounded-2xl p-5 md:p-7 m-2 md:w-[100%]">
            <div className="mb-5 p-5">
              <div className="flex flex-col items-end">
                <h2 className="text-lg w-full text-right font-bold text-white mb-1">{item.title}</h2>
                <p className="text-gray-400">{item.subtitle}</p>
              </div>
            </div>
            <div className="w-full min-h-[300px] h-[300px]">
              <canvas ref={(el) => (chartRefs.current[index] = el)}></canvas>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Traffics;
