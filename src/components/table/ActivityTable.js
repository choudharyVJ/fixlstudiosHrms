export default function ActivityTable({ activities }) {
    return (
      <table className="w-full text-left text-sm">
        <tbody>
          {activities.map(({ type, detail, time }, idx) => (
            <tr key={idx} className="border-b border-gray-200 last:border-b-0">
              <td className="py-3">{type}</td>
              <td className="py-3">{detail}</td>
              <td className="py-3 text-gray-500 text-right">{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  