import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { generateForm } from "@rjsf/material-ui";
import validator from "@rjsf/validator-ajv8";
import {
  newDealSchema,
  NewDealFormData,
  newDealUiSchema,
} from "./newDealSchema";
import { addDeal } from "../DealsTable/fetch";
import { DealType } from "../../types";
import "./NewDealForm.scss";

const Form = generateForm<NewDealFormData>();

const DealForm = () => {
  const queryClient = useQueryClient();

  // Bumping this remounts <Form>, discarding its internal state -- the
  // simplest way to reset a schema-driven form back to empty after a
  // successful create, without fighting RJSF's default uncontrolled
  // behavior for normal typing.
  const [formKey, setFormKey] = useState(0);

  const { mutate } = useMutation({
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
      setFormKey((key) => key + 1);
    },
  });

  return (
    <div className="NewDealForm tile">
      <h2 className="tile--header">Add New Deal</h2>
      <Form
        key={formKey}
        schema={newDealSchema}
        uiSchema={newDealUiSchema}
        validator={validator}
        onSubmit={({ formData }) => {
          const data = formData as NewDealFormData;
          mutate({
            ...data,
            dealSize: String(data.dealSize),
            isPublished: false,
          });
        }}
      />
    </div>
  );
};

export default DealForm;
