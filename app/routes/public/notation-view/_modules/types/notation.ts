export interface Notation {
  id: number;
  name: string;
  unitPrice: number;
  type: "receipt" | "quotation";
  date: string;
  docNo: string;
  code: string;
  status?: "Signed" | "Unsigned";
}
