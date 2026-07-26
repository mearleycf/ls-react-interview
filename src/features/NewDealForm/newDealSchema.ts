import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { CurrencyWidget } from "./CurrencyWidget";

export type NewDealFormData = {
  institution: string;
  dealType: "Consumer Auto" | "Real Estate" | "Commercial" | "Home Equity";
  dealSize: number;
};

/**
 * Add in validation using RJSF; this makes the fields required, but additionally requires,
 * in the case of Institution, at least 1 character; Deal Size is required and the value
 * must be greater than $0.
 *
 * Deal Type's `default` is set explicitly below -- it turns out @rjsf/material-ui's Select
 * widget only *visually* shows the first enum option as selected, without actually writing
 * it into formData. Without an explicit default, the field looks pre-filled but is actually
 * empty, so required validation silently blocks every submit. An explicit default keeps
 * what's displayed and what's actually stored in sync.
 */
export const newDealSchema: RJSFSchema = {
  type: "object",
  required: ["institution", "dealType", "dealSize"],
  properties: {
    institution: { type: "string", title: "Institution", minLength: 1 },
    dealType: {
      type: "string",
      title: "Deal Type",
      enum: ["Consumer Auto", "Real Estate", "Commercial", "Home Equity"],
      default: "Consumer Auto",
    },
    dealSize: { type: "number", title: "Deal Size", exclusiveMinimum: 0 },
  },
};

/**
 * The UiSchema allows for some additional formatting; nothing fancy here; the
 * main thing to point out is the deal size, where we have created a custom widget
 * that formats/masks the deal size field as a currency field with commas and
 * a dollar sign but still enforces number entry only, and still only passes and
 * stores numbers as data.
 */
export const newDealUiSchema: UiSchema = {
  institution: { "ui:placeholder": "LS Credit Union" },
  dealType: { "ui:placeholder": "Consumer Auto" },
  dealSize: { "ui:widget": CurrencyWidget },
  "ui:submitButtonOptions": {
    props: { className: "NewDealForm--submitButton" },
  },
};
