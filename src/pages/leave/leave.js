import { useState, useMemo, useEffect, useContext } from "react";
import LeaveContext from "../../context/LeaveContext";
import LeaveSummary from "../../components/leave/LeaveSummary";
import LeaveTable from "../../components/leave/LeaveTable";

export default function LeaveManagement() {
  const { leaveRequests } = useContext(LeaveContext);
  console.log("leaveRequests",leaveRequests);
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const filteredLeaves = useMemo(() => {
    return leaveRequests.filter((lr) => {
      const typeMatch = filterType === "All" || lr.leaveType === filterType;
      const statusMatch = filterStatus === "All" || lr.status === filterStatus;
      return typeMatch && statusMatch;
    });
  }, [leaveRequests, filterType, filterStatus]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, filterStatus, leaveRequests]);

  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);

  const paginatedLeaves = filteredLeaves.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <LeaveSummary leaveRequests={filteredLeaves} />
      <LeaveTable
        leaveRequests={paginatedLeaves}
        filterType={filterType}
        setFilterType={setFilterType}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        currentPage={currentPage}
        goToPage={goToPage}
        totalPages={totalPages}
      />
    </div>
  );
}
