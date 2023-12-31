import type {
  BpValueText,
  IBpValues,
  BpValueDropdown,
  IBpValueObject,
} from "bp-api";

export interface IOrderValues extends IBpValues {
  2: BpValueDropdown;
  3: BpValueText;
}

type CatalogAndRecord = Pick<IBpValueObject, "catalogId" | "recordId">;

export interface IStoreValues extends IBpValues {
  3: [CatalogAndRecord];
  4: BpValueText;
}

export interface ITestValue {
  value: string;
}
