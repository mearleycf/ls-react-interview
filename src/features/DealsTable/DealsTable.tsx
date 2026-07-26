import React from "react";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDeals } from "./fetch";
import DealsTableRow from "./DealsTableRow/DealsTableRow";
import "./DealsTable.scss";
import SortIcon from "../../assets/SortIcon";

type SortableField = "institution" | "dealType" | "dealSize" | "isPublished";
type SortState = { key: SortableField; direction: "asc" | "desc" } | null;
type SortIndicator = {
  ariaSort: "ascending" | "descending" | "none";
  iconDirection: "up" | "down" | undefined;
};

const DealsTable = () => {
  const {
    data: deals = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["deals"],
    queryFn: getDeals,
  });

  const [sortState, setSortState] = useState<SortState>(null);
  const handleSort = (field: SortableField) => () => {
    setSortState((prev) => {
      if (!prev || prev.key !== field) return { key: field, direction: "asc" };
      return {
        key: field,
        direction: prev.direction === "asc" ? "desc" : "asc",
      };
    });
  };

  const sortedDeals = useMemo(() => {
    if (!sortState) return deals;
    const { key, direction } = sortState;

    return [...deals].sort((a, b) => {
      const comparison =
        key === "dealSize"
          ? Number(a.dealSize) - Number(b.dealSize)
          : key === "isPublished"
            ? Number(a.isPublished) - Number(b.isPublished)
            : a[key].localeCompare(b[key]);

      return direction === "asc" ? comparison : -comparison;
    });
  }, [deals, sortState]);

  if (isLoading) {
    return (
      <div className="tile">
        <h2 className="tile--header">Deal Portfolio</h2>
        <p>Loading deals...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="tile">
        <h2 className="tile--header">Deal Portfolio</h2>
        <p>Failed to load deals: {(error as Error).message}</p>
      </div>
    );
  }

  const getSortIndicator = (field: SortableField): SortIndicator => {
    if (sortState?.key !== field) {
      return { ariaSort: "none", iconDirection: undefined };
    }
    return {
      ariaSort: sortState.direction === "asc" ? "ascending" : "descending",
      iconDirection: sortState.direction === "asc" ? "up" : "down",
    };
  };

  const institutionSort = getSortIndicator("institution");
  const dealTypeSort = getSortIndicator("dealType");
  const dealSizeSort = getSortIndicator("dealSize");
  const isPublishedSort = getSortIndicator("isPublished");

  const dealsTableRows = sortedDeals.map((deal) => (
    <DealsTableRow key={deal.id} deal={deal} />
  ));

  return (
    <div className="tile">
      <h2 className="tile--header">Deal Portfolio</h2>
      <table className="DealsTable">
        <thead>
          <tr>
            <th
              className="DealsTable--headerCell"
              aria-sort={institutionSort.ariaSort}
            >
              <div className="flex-row">
                Institution
                <button onClick={handleSort("institution")}>
                  <SortIcon direction={institutionSort.iconDirection} />
                </button>
              </div>
            </th>
            <th
              className="DealsTable--headerCell"
              aria-sort={dealTypeSort.ariaSort}
            >
              <div className="flex-row">
                Deal Type
                <button onClick={handleSort("dealType")}>
                  <SortIcon direction={dealTypeSort.iconDirection} />
                </button>
              </div>
            </th>
            <th
              className="DealsTable--headerCell"
              aria-sort={dealSizeSort.ariaSort}
            >
              <div className="flex-row">
                Deal Size
                <button onClick={handleSort("dealSize")}>
                  <SortIcon direction={dealSizeSort.iconDirection} />
                </button>
              </div>
            </th>
            <th
              className="DealsTable--headerCell"
              aria-sort={isPublishedSort.ariaSort}
            >
              <div className="flex-row">
                Is Published?
                <button onClick={handleSort("isPublished")}>
                  <SortIcon direction={isPublishedSort.iconDirection} />
                </button>
              </div>
            </th>
            <th className="DealsTable--headerCell">Actions</th>
          </tr>
        </thead>
        <tbody>{dealsTableRows}</tbody>
      </table>
    </div>
  );
};

export default DealsTable;
