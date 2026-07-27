import React from "react";
import { DealType } from "../../../types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import "./DealsTableRow.scss";

const currencyAmountToString = (amount: string) => {
  return `$${amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

type DealsTableRowProps = {
  deal: DealType;
  onRemove: () => void;
  onTogglePublish: () => void;
  isRemoving: boolean;
  isToggling: boolean;
};

const DealsTableRow = (props: DealsTableRowProps) => {
  const {
    deal: { institution, dealType, dealSize, isPublished },
    onRemove,
    onTogglePublish,
    isRemoving,
    isToggling,
  } = props;

  return (
    <TableRow className="DealsTableRow">
      <TableCell style={{ whiteSpace: "nowrap" }}>{institution}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{dealType}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>
        {currencyAmountToString(dealSize)}
      </TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>
        {isPublished ? "Yes" : "No"}
      </TableCell>
      <TableCell className="flex-row">
        <button
          className="button--transparent"
          onClick={onRemove}
          disabled={isRemoving}
        >
          Delete
        </button>
        <span>|</span>
        <button
          className="button--transparent"
          onClick={onTogglePublish}
          disabled={isToggling}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
      </TableCell>
    </TableRow>
  );
};

export default DealsTableRow;
