import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { CurrencyWidget } from "./CurrencyWidget";

export type NewDealFormData = {
  institution: string;
  dealType: "Consumer Auto" | "Real Estate" | "Commercial" | "Home Equity";
  dealSize: number;
};

export const newDealSchema: RJSFSchema = {
  type: "object",
  required: ["institution", "dealType", "dealSize"],
  properties: {
    institution: { type: "string", title: "Institution", minLength: 1 },
    dealType: {
      type: "string",
      title: "Deal Type",
      enum: ["Consumer Auto", "Real Estate", "Commercial", "Home Equity"],
    },
    dealSize: { type: "number", title: "Deal Size", exclusiveMinimum: 0 },
  },
};

export const newDealUiSchema: UiSchema = {
  institution: { "ui:placeholder": "LS Credit Union" },
  dealType: { "ui:placeholder": "Consumer Auto" },
  dealSize: { "ui:widget": CurrencyWidget },
};
