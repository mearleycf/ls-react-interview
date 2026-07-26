import React from "react";
import { NumericFormat } from "react-number-format";
import { WidgetProps } from "@rjsf/utils";

export const CurrencyWidget = (props: WidgetProps) => {
  const { id, value, onChange, required, disabled, readonly } = props;

  return (
    <NumericFormat
      id={id}
      value={value}
      thousandSeparator=","
      prefix="$"
      decimalScale={0}
      allowNegative={false}
      required={required}
      disabled={disabled || readonly}
      onValueChange={({ floatValue }) => onChange(floatValue)}
    />
  );
};
