import { useState, useContext, useMemo } from "react";
import PayrollContext from "../../context/PayrollContext";
import PayrollFilter from "../../components/payroll/PayrollFilter";
import PayrollSummary from "../../components/payroll/PayrollSummary";
import PayrollTable from "../../components/payroll/PayrollTable";
import ExportPayrollCSV from "../../components/payroll/ExportPayrollCSV";

function PayrollInner() {
  const { payroll, dispatch } = useContext(PayrollContext);

  const months = [...new Set(payroll.map((rec) => rec.month))];
  const departments = ["All", ...new Set(payroll.map((rec) => rec.department))];

  const [filter, setFilter] = useState({
    month: months[months.length - 1] || "",
    department: "All",
  });

  const records = useMemo(() => {
    return payroll.filter(
      (rec) =>
        (filter.month ? rec.month === filter.month : true) &&
        (filter.department === "All" ? true : rec.department === filter.department)
    );
  }, [payroll, filter]);

  const handleProcess = (id) => {
    dispatch({ type: "MARK_PROCESSED", payload: id });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Payroll Management</h1>
      <PayrollFilter
        months={months}
        departments={departments}
        filter={filter}
        setFilter={setFilter}
      />
      <ExportPayrollCSV records={records} filter={filter} />
      <PayrollSummary records={records} />
      <PayrollTable records={records} onProcess={handleProcess} />
    </div>
  );
}

export default function Payroll() {
  return (
      <PayrollInner />
  );
}
