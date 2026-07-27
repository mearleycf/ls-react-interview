import React from "react";
import { useState, useMemo } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getDeals, removeDeal, updateDeal } from "./fetch";
import { DealType } from "../../types";
import DealsTableRow from "./DealsTableRow/DealsTableRow";
import "./DealsTable.scss";
import SortIcon from "../../assets/SortIcon";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

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

  const queryClient = useQueryClient();

  const {
    mutate: removeMutate,
    isPending: isRemoving,
    variables: removingId,
  } = useMutation({
    mutationFn: (id: number) => removeDeal(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deals"] }),
  });

  const {
    mutate: togglePublishMutate,
    isPending: isToggling,
    variables: togglingDeal,
  } = useMutation({
    mutationFn: (deal: DealType) =>
      updateDeal(deal.id!, { isPublished: !deal.isPublished }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deals"] }),
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
    <DealsTableRow
      key={deal.id}
      deal={deal}
      onRemove={() => removeMutate(deal.id!)}
      onTogglePublish={() => togglePublishMutate(deal)}
      isRemoving={isRemoving && removingId === deal.id}
      isToggling={isToggling && togglingDeal?.id === deal.id}
    />
  ));

  return (
    <div className="tile">
      <h2 className="tile--header">Deal Portfolio</h2>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead className="DealsTable--HeaderRow">
            <TableRow>
              <TableCell
                aria-sort={institutionSort.ariaSort}
                style={{ whiteSpace: "nowrap" }}
              >
                <div className="flex-row">
                  Institution
                  <button
                    className="DealsTable--sortButton"
                    onClick={handleSort("institution")}
                  >
                    <SortIcon direction={institutionSort.iconDirection} />
                  </button>
                </div>
              </TableCell>
              <TableCell
                aria-sort={dealTypeSort.ariaSort}
                style={{ whiteSpace: "nowrap" }}
              >
                <div className="flex-row">
                  Deal Type
                  <button
                    className="DealsTable--sortButton"
                    onClick={handleSort("dealType")}
                  >
                    <SortIcon direction={dealTypeSort.iconDirection} />
                  </button>
                </div>
              </TableCell>
              <TableCell
                aria-sort={dealSizeSort.ariaSort}
                style={{ whiteSpace: "nowrap" }}
              >
                <div className="flex-row">
                  Deal Size
                  <button
                    className="DealsTable--sortButton"
                    onClick={handleSort("dealSize")}
                  >
                    <SortIcon direction={dealSizeSort.iconDirection} />
                  </button>
                </div>
              </TableCell>
              <TableCell
                aria-sort={isPublishedSort.ariaSort}
                style={{ whiteSpace: "nowrap" }}
              >
                <div className="flex-row">
                  Is Published?
                  <button
                    className="DealsTable--sortButton"
                    onClick={handleSort("isPublished")}
                  >
                    <SortIcon direction={isPublishedSort.iconDirection} />
                  </button>
                </div>
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dealsTableRows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DealsTable;
