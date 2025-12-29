import { GlobalImage } from "~/components/shared/global-image";
import LogoUtotechImage from "/assets/images/logo.webp";
import "./receipt.css";

function bahtText(num: number): string {
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

export function ReceiptMock({
  data,
  product,
  makeImage,
  approvedImage,
}: {
  data: any;
  product: any;
  makeImage?: any;
  approvedImage?: any;
}) {
  const resultTotal = product?.reduce(
    (sum: any, p: any) => sum + p.quantity,
    0
  );

  return (
    <div className="quotation-container">
      {/* Header */}
      <div className="quotation-header">
        <img
          src={LogoUtotechImage}
          alt="logo"
          width={100}
          height={100}
          className="object-cover"
        />

        <div className="quotation-title-wrapper">
          <span className="quotation-subtitle">(ต้นฉบับ)</span>
          <h1 className="quotation-title">ใบเสร็จรับเงิน</h1>
        </div>
      </div>

      {/* Top Information */}
      <div className="top-info">
        <div className="top-info-left">
          <strong>บริษัท ยูโทเทค จำกัด (สำนักงานใหญ่)</strong>
          <br />
          161/308 ซอยจรัญสนิทวงศ์ 27 แยก 16 แขวงบางขุนศรี เขตบางกอกน้อย กรุงเทพฯ
          10700
          <br />
          เลขประจำตัวผู้เสียภาษี 0105565119323
          <br />
          โทร. 080-423-7373
          <br />
          อีเมล: kiattiphoom@utotech.org
        </div>

        <div className="top-info-right">
          เลขที่เอกสาร: {data.docNo}
          <br />
          วันที่ออก: {data.startDate}
          <br />
          ใช้ได้ถึง: {data.expireDate}
          <br />
          อ้างอิง: {data.docNo}
        </div>
      </div>

      <div className="header-sign">
        <div className="top-info">
          <div className="top-info-left">
            ออกให้กับ: {data.customer?.companyName}
            <br />
            เลขที่ผู้เสียภาษี: {data.customer?.taxID}
            <br />
            ที่อยู่: {data.customer?.address}
          </div>

          <div className="top-info-right">
            ผู้ประสานงาน: {data.customer?.customer}
            <br />
            เบอร์โทรติดต่อ: {data.customer?.phone}
            <br />
            อีเมล: {data.customer?.email}
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="q-table">
        <thead>
          <tr>
            <th>#</th>
            <th>รายละเอียด</th>
            <th>จำนวน</th>
            <th>ราคา/หน่วย</th>
            <th>รวม</th>
          </tr>
        </thead>

        <tbody>
          {product?.map((item: any, idx: number) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>
                <strong>{item.name}</strong>
                <br />
                {item.detail}
              </td>
              <td>{item.quantity}</td>
              <td>{item.salePrice}</td>
              <td>{resultTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="sum-info">
        <div className="sum-info-left">
          <div className="payment-title">
            <span>การชำระเงิน</span>
          </div>
          <div className="peyment-row">
            <span>ช่องทาง</span>
            <span>เงินโอน / เงินสด</span>
          </div>
          <div className="peyment-row">
            <span>ธนาคาร</span>
            <span>ไทยพาณิชย์</span>
          </div>
          <div className="peyment-row">
            <span>วันที่ชำระ</span>
            <span>17/07/2568</span>
          </div>
        </div>

        <div className="sum-info-right">
          {/* Summary */}
          <div className="summary">
            <div className="summary-row total">
              <span>จำนวนเงินที่ต้องชำระ</span>
              <span>{data.finalPrice || 0} บาท</span>
            </div>
            <div className="summary-row">
              <span></span>
              <span>({bahtText(data.finalPrice || 0)})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer signatures */}
      <div className="footer-sign">
        <div className="footer-sign-inner">
          <div className="signature-block">
            ตราประทับ
            <br />
            <br />
            {makeImage ? (
              <img src={makeImage} className="signature-image" />
            ) : (
              <div className="signature-image"></div>
            )}
            <span className="mt-4">{data.makeByName}</span>
            <br />
            <span>{data.makeByPosition}</span>
          </div>

          <div className="signature-block right">
            บริษัท ยูโทเทค จำกัด
            <br />
            <br />
            {approvedImage ? (
              <img src={approvedImage} className="signature-image" />
            ) : (
              <div className="signature-image"></div>
            )}
            <span className="mt-4">{data.approvedByName}</span>
            <br />
            <span>{data.approvedByPosition}</span>
          </div>

          <div className="signature-block right">
            ผู้รับเอกสาร
            <br />
            <br />
            {approvedImage ? (
              <img src={approvedImage} className="signature-image" />
            ) : (
              <div className="signature-image"></div>
            )}
            <span className="mt-4">{data.approvedByName}</span>
            <br />
            <span>{data.approvedByPosition}</span>
          </div>
        </div>
      </div>

      <div className="page-number">หน้าที่ 1/1</div>
    </div>
  );
}
