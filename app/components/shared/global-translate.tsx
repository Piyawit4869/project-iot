import translations from "../../../transtate/th-schemas.json";

const th = translations;

export default function translate(key: string): string {
  if (key in th) {
    return th[key as keyof typeof th];
  }
  return key;
}
