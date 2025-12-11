import { GlobalImage } from "~/components/shared/global-image";
import "./quotation.css";

export function QuotationMock({
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
      <h1 className="quotation-title">ใบเสนอราคา</h1>

      {/* Top Information */}
      <div className="top-info">
        <div className="top-info-left">
          <strong>บจก. คอท้า อินดัสตรี (ประเทศไทย)</strong>
          <br />
          44/46-47 หมู่ที่ 11 ซอยพหลโยธิน 8 ถนนพหลโยธิน แขวงอนุสาวรีย์ เขตบางเขน
          <br />
          กรุงเทพมหานคร 10150
          <br />
          เลขประจำตัวผู้เสียภาษี 0105554068208
          <br />
          โทร. 02 049 6565
          <br />
          อีเมล: info@corte-idea.com
        </div>

        <div className="top-info-right">
          เลขที่: {data.docNo}
          <br />
          วันที่: {data.startDate}
          <br />
          ผู้ขาย: {data.saler}
          <br />
          ประเภทเอกสาร: {data.notationType}
          <br />
          ลูกค้า: {data.customer?.companyName}
          <br />
          เบอร์ติดต่อ: {data.customer?.phone}
          <br />
          อีเมล: {data.customer?.email}
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
            <th>ราคารวม</th>
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

      {/* Summary */}
      <div className="summary">
        <div className="summary-row">
          <span>ราคารวมสินค้า</span>
          <span>{data.Price} บาท</span>
        </div>
        <div className="summary-row">
          <span>ส่วนลด</span>
          <span>{data.discount || 0} บาท</span>
        </div>
        <div className="summary-row">
          <span>ภาษีมูลค่าเพิ่ม</span>
          <span>{data.vat} บาท</span>
        </div>

        <div className="summary-row total">
          <span>ยอดรวมทั้งหมด</span>
          <span>{data.finalPrice} บาท</span>
        </div>
      </div>

      {/* Customer Block */}
      <div className="customer-block">
        <strong>ข้อมูลลูกค้า</strong>
        <br />
        {data.customer?.companyName}
        <br />
        {data.customer?.address}
        <br />
        เลขประจำตัวผู้เสียภาษี: {data.customer?.taxID}
        <br />
        ผู้ติดต่อ: {data.customer?.contactName}
        <br />
        เบอร์โทร: {data.customer?.phone}
      </div>

      {/* Footer signatures */}
      <div className="footer-sign">
        <div className="footer-sign-inner">
          <div className="signature-block">
            ในนามผู้จัดทำ
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
            ในนามผู้อนุมัติ
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

      <div className="page-number">หน้าที่ 1/3</div>
    </div>
  );
}
