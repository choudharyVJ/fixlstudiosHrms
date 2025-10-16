export default function KPIcard({ title, value }) {
    return (
      <div className="bg-white rounded shadow p-6 flex flex-col items-center justify-center">
        <div className="text-gray-500 text-sm">{title}</div>
        <div className="text-3xl font-semibold text-blue-600 mt-2">{value}</div>
      </div>
    );
  }
  