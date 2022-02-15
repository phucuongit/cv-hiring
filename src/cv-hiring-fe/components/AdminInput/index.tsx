import { DatePicker, Input, InputNumber, Select } from "antd";
import { DefaultOptionType } from "antd/lib/select";
import { FieldConfig, FormikProps, useField } from "formik";
import moment from "moment";
import React from "react";
import style from "./style.module.scss";

type Props =
  | SelectProps
  | InputProps
  | TextAreaProps
  | DatepickerProps
  | NumberProps;

type SelectProps = {
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
  mode: "select";
  options: DefaultOptionType[];
};
type InputProps = {
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
  mode: "input";
};
type NumberProps = {
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
  mode: "number";
};
type TextAreaProps = {
  mode: "textarea";
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
};

type DatepickerProps = {
  mode: "datepicker";
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
};
function AdminInput(props: Props) {
  // @ts-ignore
  const [field, meta, helpers] = useField(props);
  const handleChangeSelect = (value: string) => {
    helpers.setValue(value);
  };
  function onChange(_: any, dateString: any) {
    helpers.setValue(dateString);
  }
  function onChangeInput(value: number) {
    helpers.setValue(value);
  }
  return (
    <div className={style.formControl}>
      <div className={style.label}>
        {props.Icon}
        <h6 className="">{props.label}</h6>
      </div>
      <div>
        {props.mode === "input" && (
          <Input
            size="large"
            bordered={false}
            className={style.inputControl}
            {...field}
            {...props}
          />
        )}
        {props.mode === "number" && (
          <InputNumber
            min={1}
            defaultValue={1}
            size="large"
            bordered={false}
            className={style.inputControl}
            {...field}
            {...props}
            onChange={onChangeInput}
          />
        )}
        {props.mode === "select" && (
          // @ts-ignore
          <Select
            {...field}
            {...props}
            bordered={false}
            options={props.options}
            onChange={handleChangeSelect}
            className={style.inputControl}
          />
        )}
        {props.mode === "textarea" && (
          <Input.TextArea
            size="large"
            {...field}
            {...props}
            showCount
            maxLength={100}
            className={style.inputControl}
          />
        )}

        {props.mode === "datepicker" && (
          <DatePicker
            size="large"
            name={field.name}
            defaultValue={
              field.value ? moment(field.value) : moment().add("day", 1)
            }
            placeholder={props.placeholder}
            className={style.inputControl}
            onChange={onChange}
            disabledDate={(current) => {
              let customDate = moment().add(1, "day").format("YYYY-MM-DD");
              return current && current < moment(customDate, "YYYY-MM-DD");
            }}
          />
        )}
        {meta.touched && meta.error ? (
          <div className={style.error}>{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
}

export default AdminInput;
