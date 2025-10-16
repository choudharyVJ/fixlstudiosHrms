import React from "react";

const mockLeaveBalance = {
  "vijay choudhary": 12,
  "Tanvi shukla": 5,
  "gopal sharma": 9,
  "sunil choudhary": 4,
  "deepak singh": 7,
  "urvi meena": 9,
  "yukta mishra": 8,
};

export default function LeaveBalance({ employee }) {
  const balance = mockLeaveBalance[employee] ?? 0;
  return (
    <span className="text-sm text-gray-600">{balance} days left</span>
  );
}
