export default function PayrollSummary({ records }) {
    const totalCost = records.reduce((sum, rec) => sum + rec.basic + rec.allowances - rec.deductions, 0);
    return (
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="font-semibold text-lg">Total Payroll Cost:</div>
        <div className="text-3xl text-blue-600 font-bold">₹{totalCost.toLocaleString()}</div>
      </div>
    );
  }
  