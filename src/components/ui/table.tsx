import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { useLocation, useNavigate } from "react-router-dom";
import "./table.css";
import { BsFillFolderFill } from "react-icons/bs";
interface TableProps {
  headers: string[];
  data: any[];
  renderCell?: (
    row: any,
    header: string
  ) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  itemsPerPage?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  loading?: boolean;
  onRowClick?: (row: any) => void;
  hidePagination?: boolean;
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  renderCell,
  className = "",
  headerClassName = "",
  rowClassName = "",
  cellClassName = "",
  itemsPerPage = 5,
  hasNextPage = false,
  hasPreviousPage = false,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  loading = false,
  onRowClick,
  hidePagination = false,
}) => {
  return (
    <div className={`relative scrollbar-hide ${className}`}>
      <div className="overflow-x-auto min-w-full sm:max-w-[41rem] md:min-w-full xl:max-w-full">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
            <table className="min-w-full">
              <thead className={`bg-white ${headerClassName}`}>
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3 whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody key={currentPage} className="bg-white">
                {loading ? (
                  // Loading skeleton rows
                  Array.from({ length: itemsPerPage }).map((_, index) => (
                    <tr
                      key={`skeleton-${index}`}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-white"
                      } ${rowClassName} border-t border-gray-200`}
                    >
                      {headers.map((_, cellIndex) => (
                        <td
                          key={`skeleton-cell-${cellIndex}`}
                          className={`px-4 sm:px-6 py-2 sm:py-3 text-sm text-gray-900 whitespace-nowrap ${cellClassName}`}
                        >
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  // Actual data rows
                  <>
                    {data.map((row, rowIndex) => (
                      <tr
                        key={JSON.stringify(row)}
                        onClick={() => {
                          onRowClick?.(row);
                        }}
                        className={`${
                          rowIndex % 2 === 0 ? "bg-white" : "bg-white"
                        } ${rowClassName} border-t border-gray-200 hover:bg-gray-50`}
                      >
                        {headers.map((header, cellIndex) => {
                          const key = header
                            .toLowerCase()
                            .replace(/\s+/g, "_")
                            .replace(".", "");
                          const actualKey =
                            header === "App. time" ? "app_time" : key;

                          return (
                            <td
                              key={cellIndex}
                              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm text-gray-900 whitespace-nowrap ${cellClassName}`}
                            >
                              {renderCell
                                ? renderCell(row, header)
                                : row[actualKey]}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    {data.length === 0 && (
                      <tr>
                        <td
                          colSpan={headers.length}
                          className="px-6 py-4 text-sm text-center text-gray-500"
                        >
                          <div className="flex flex-col items-center justify-center gap-2">
                            <BsFillFolderFill className="w-6 h-6" />
                            <p className="text-sm text-gray-500">
                              No Data Found
                            </p>
                            <p className="text-xs text-gray-500 max-w-48 text-center">
                              A table will be populated here once data is
                              available.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
            {!hidePagination && (
              <Pagination
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

export const Pagination = ({
  hasNextPage,
  hasPreviousPage,
  currentPage,
  totalItems,
  itemsPerPage,
  loading,
}: {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  currentPage: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  loading?: boolean;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const startIndex = (currentPage - 1) * (itemsPerPage ?? 5);
  const endIndex = startIndex + (itemsPerPage ?? 10);

  const handlePrevious = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", (currentPage - 1).toString());
    navigate(`?${searchParams.toString()}`);
  };

  const handleNext = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", (currentPage + 1).toString());
    navigate(`?${searchParams.toString()}`);
  };
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
      <div className="text-sm text-gray-500">
        Showing {startIndex + 1} - {endIndex} of {totalItems}
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePrevious}
          disabled={!hasPreviousPage || loading}
          className={`p-2 rounded-full ${
            !hasPreviousPage || loading
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <HiChevronLeft />
        </button>
        <button
          onClick={handleNext}
          disabled={!hasNextPage || loading}
          className={`p-2 rounded-full ${
            !hasNextPage || loading
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
};
