import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function ModuleControlButtons() {
  return (
    <div className="float-end d-flex align-items-center">
      <span className="me-3 border border-dark rounded-pill px-3 py-1 text-dark bg-transparent">
        40% of Total
      </span>
      <BsPlus className="fs-4 me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
