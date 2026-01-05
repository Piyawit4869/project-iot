export function bahtText(num: number): string {
  if (isNaN(num)) return "";

  const txtNumArr = [
    "ศูนย์",
    "หนึ่ง",
    "สอง",
    "สาม",
    "สี่",
    "ห้า",
    "หก",
    "เจ็ด",
    "แปด",
    "เก้า",
  ];
  const txtDigitArr = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];

  const [integerPart, decimalPart] = num.toFixed(2).split(".").map(String);

  let bahtText = "";
  let len = integerPart.length;

  for (let i = 0; i < len; i++) {
    const n = parseInt(integerPart.charAt(i));
    if (n !== 0) {
      if (i === len - 1 && n === 1 && len > 1) {
        bahtText += "เอ็ด";
      } else if (i === len - 2 && n === 2) {
        bahtText += "ยี่";
      } else if (i === len - 2 && n === 1) {
        bahtText += "";
      } else {
        bahtText += txtNumArr[n];
      }
      bahtText += txtDigitArr[len - i - 1];
    }
  }

  bahtText += "บาท";

  if (decimalPart === "00") {
    bahtText += "ถ้วน";
  } else {
    const satang1 = parseInt(decimalPart.charAt(0));
    const satang2 = parseInt(decimalPart.charAt(1));

    if (satang1 !== 0) {
      if (satang1 === 2) bahtText += "ยี่";
      else if (satang1 !== 1) bahtText += txtNumArr[satang1];
      bahtText += "สิบ";
    }

    if (satang2 !== 0) {
      if (satang2 === 1) bahtText += "เอ็ด";
      else bahtText += txtNumArr[satang2];
    }

    bahtText += "สตางค์";
  }

  return bahtText;
}
