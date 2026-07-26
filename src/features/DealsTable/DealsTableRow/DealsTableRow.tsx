import React from "react";
import { DealType } from "../../../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { removeDeal, updateDeal } from "../fetch";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import "./DealsTableRow.scss";

const currencyAmountToString = (amount: string) => {
  return `$${amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

type DealsTableRowProps = {
  deal: DealType;
};

const DealsTableRow = (props: DealsTableRowProps) => {
  const {
    deal: { id, institution, dealType, dealSize, isPublished },
  } = props;

  const queryClient = useQueryClient();

  const { mutate: remove, isPending: isRemoving } = useMutation({
    mutationFn: () => removeDeal(id!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deals"] }),
  });

  const { mutate: togglePublish, isPending: isToggling } = useMutation({
    mutationFn: () => updateDeal(id!, { isPublished: !isPublished }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deals"] }),
  });

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
          onClick={() => remove()}
          disabled={isRemoving}
        >
          Delete
        </button>
        <span>|</span>
        <button
          className="button--transparent"
          onClick={() => togglePublish()}
          disabled={isToggling}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
      </TableCell>
    </TableRow>
  );
};

export default DealsTableRow;
