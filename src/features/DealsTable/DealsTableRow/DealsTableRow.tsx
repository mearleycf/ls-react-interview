import React from "react";
import { DealType } from "../../../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { removeDeal, updateDeal } from "../fetch";

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
    <tr className="DealsTableRow">
      <td className="DealsTableRow--cell">{institution}</td>
      <td className="DealsTableRow--cell">{dealType}</td>
      <td className="DealsTableRow--cell">
        {currencyAmountToString(dealSize)}
      </td>
      <td className="DealsTableRow--cell">{isPublished ? "Yes" : "No"}</td>
      <td className="DealsTableRow--cell flex-row">
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
      </td>
    </tr>
  );
};

export default DealsTableRow;
