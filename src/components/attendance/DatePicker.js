export default function DatePicker({ selectedDate, setSelectedDate }) {
    return (
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        max={new Date().toISOString().substring(0, 10)}
      />
    );
  }
  