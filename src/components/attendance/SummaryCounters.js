export default function SummaryCounters({ employees, attendanceForDate }) {
    const count = employees.length;
    const present = employees.filter(
      (emp) => attendanceForDate[emp.id] === "Present"
    ).length;
    const absent = employees.filter(
      (emp) => attendanceForDate[emp.id] === "Absent"
    ).length;
    const onLeave = employees.filter(
      (emp) => attendanceForDate[emp.id] === "On Leave"
    ).length;
  
    const percent = (num) => (count === 0 ? 0 : ((num / count) * 100).toFixed(0));
  
    return (
      <div className="flex gap-6 mb-4">
        <div className="bg-white p-4 rounded shadow text-center flex-1">
          <div className="font-semibold">Present</div>
          <div className="text-2xl text-green-600">{present}</div>
          <div className="text-sm text-gray-500">{percent(present)}%</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center flex-1">
          <div className="font-semibold">Absent</div>
          <div className="text-2xl text-red-600">{absent}</div>
          <div className="text-sm text-gray-500">{percent(absent)}%</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center flex-1">
          <div className="font-semibold">On Leave</div>
          <div className="text-2xl text-yellow-600">{onLeave}</div>
          <div className="text-sm text-gray-500">{percent(onLeave)}%</div>
        </div>
      </div>
    );
  }
  