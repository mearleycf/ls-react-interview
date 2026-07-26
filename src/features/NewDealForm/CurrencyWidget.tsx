import React from "react";
import { NumericFormat } from "react-number-format";
import { WidgetProps } from "@rjsf/utils";
import TextField from "@material-ui/core/TextField";

export const CurrencyWidget = (props: WidgetProps) => {
  const { id, value, label, onChange, required, disabled, readonly } = props;

  return (
    <NumericFormat
      id={id}
      value={value}
      label={label}
      customInput={TextField}
      fullWidth
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
