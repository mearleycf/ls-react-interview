import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addDeal } from "../DealsTable/fetch";
import { DealType } from "../../types";
import "./NewDealForm.scss";

const DEFAULT_DEAL: DealType = {
  institution: "",
  dealType: "",
  dealSize: "",
  isPublished: false,
};

const DealForm = () => {
  const queryClient = useQueryClient();

  const [newDeal, setNewDeal] = useState(DEFAULT_DEAL);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (newDealInput: Omit<DealType, "id">) => {
      const deals = queryClient.getQueryData<DealType[]>(["deals"]) ?? [];
      const nextId =
        deals.length > 0
          ? Math.max(...deals.map((d) => Number(d.id) ?? 0)) + 1
          : 1;
      return addDeal({ ...newDealInput, id: nextId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      setNewDeal(DEFAULT_DEAL);
    },
  });

  const handleCreateDeal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutate({ ...newDeal });
  };

  const handleUpdateProperty =
    (property: string) => (e: React.ChangeEvent<any>) =>
      setNewDeal({ ...newDeal, [property]: e.target.value });

  return (
    <form className="NewDealForm tile" onSubmit={handleCreateDeal}>
      <h2 className="tile--header">Add New Deal</h2>
      <div className="NewDealForm--div">
        <label className="NewDealForm--label">Institution</label>
        <input
          className="NewDealForm--input"
          value={newDeal.institution}
          placeholder="LS Credit Union"
          onChange={handleUpdateProperty("institution")}
          required
        />
      </div>
      <div className="NewDealForm--div">
        <label className="NewDealForm--label">Deal Type</label>
        <input
          className="NewDealForm--input"
          value={newDeal.dealType}
          placeholder="Consumer Auto"
          onChange={handleUpdateProperty("dealType")}
          required
        />
      </div>
      <div className="NewDealForm--div">
        <label className="NewDealForm--label">Deal Size</label>
        <input
          className="NewDealForm--input"
          value={newDeal.dealSize}
          placeholder="$1,000,000"
          onChange={handleUpdateProperty("dealSize")}
          required
        />
      </div>
      <button className="NewDealForm--button" disabled={isPending}>
        {isPending ? "Creating..." : "Create Deal"}
      </button>
      {isError && <p>Failed to create deal: {(error as Error).message}</p>}
    </form>
  );
};

export default DealForm;
