import { GlobalImage } from "~/components/shared/global-image";
import LogoUtotechImage from "/assets/images/logo.webp";
import "./document.css";
import { CircleDollarSign, MessageCircleMore } from "lucide-react";
import { bahtText } from "~/utils/bathtext";

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
    <div className="document-container font-body">
      {/* Header */}
      <div className="document-header">
        <img
          src={LogoUtotechImage}
          alt="logo"
          width={100}
          height={100}
          className="object-cover"
        />

        <div className="document-title-wrapper">
          <span className="document-subtitle font-head">(ต้นฉบับ)</span>
          <span className="document-title font-head">ใบเสนอราคา</span>
        </div>
      </div>

      {/* Top Information */}
      <div className="top-info">
        <div className="top-info-left">
          <strong className="font-head">บริษัท ยูโทเทค จำกัด </strong>
          (สำนักงานใหญ่)
          <br />
          161/308 ซอยจรัญสนิทวงศ์ 27 แยก 16
          <br />
          แขวงบางขุนศรี เขตบางกอกน้อย
          <br />
          กรุงเทพฯ 10700
          <br />
          <span className="font-head">เลขที่ผู้เสียภาษี:</span> 0105565119323
          <br />
          <span className="font-head">เบอร์โทรศัพท์:</span> 080-423-7373
          <br />
          <span className="font-head">อีเมล:</span> kiattiphoom@utotech.org
        </div>

        <div className="top-info-right box">
          <span className="font-head">เลขที่เอกสาร:</span> {data.docNo}
          <br />
          <span className="font-head">วันที่ออก:</span> {data.startDate}
          <br />
          <span className="font-head">วันที่ชำระ:</span> {data.expireDate}
          <br />
          <span className="font-head">อ้างอิง:</span> {data.docNo}
        </div>
      </div>

      <div className="header-sign">
        <div className="top-info">
          <div className="top-info-left">
            <span className="font-head">รหัสลูกค้า:</span> {data.customer?.id}
            <br />
            <span className="font-head">ออกให้กับ:</span>{" "}
            {data.customer?.businessName}
            <br />
            <span className="font-head">เลขที่ผู้เสียภาษี:</span>{" "}
            {data.customer?.taxID}
            <br />
            <span className="font-head">ที่อยู่:</span> {data.customer?.address}
          </div>

          <div className="top-info-right">
            <span className="font-head">ผู้ประสานงาน:</span>{" "}
            {data.customer?.customer}
            <br />
            <span className="font-head">เบอร์โทรติดต่อ:</span>{" "}
            {data.customer?.phone}
            <br />
            <span className="font-head">อีเมล:</span> {data.customer?.email}
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="q-table font-head">
        <thead>
          <tr>
            <th>รายละเอียด</th>
            <th>จำนวน</th>
            <th>ราคา/หน่วย</th>
            <th>รวม</th>
          </tr>
        </thead>

        <tbody>
          {product?.map((item: any, idx: number) => (
            <tr key={idx}>
              {/* <td>{idx + 1}</td> */}
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
      <div className="footer-sign"></div>
      <div className="sum-info">
        <div className="sum-info-left">
          <div className="note">
            <MessageCircleMore size={20} color="#1c918b" strokeWidth={2} />
            <span className="font-head">หมายเหตุ :</span>
            <br />
            {data.note}
          </div>
        </div>

        <div className="sum-info-right">
          {/* Summary */}
          <div className="summary">
            <div className="summary-row">
              <span className="font-head">จำนวนเงินรวม</span>
              <span className="font-second">{data.Price || 0} บาท</span>
            </div>
            <div className="summary-row">
              <span className="font-head">จำนวนภาษีมูลค่าเพิ่ม (VAT 7%)</span>
              <span className="font-second">{data.vat || 0} บาท</span>
            </div>
            <div className="summary-row">
              <span className="font-head">รวมราคาทั้งสิ้น (รวม VAT)</span>
              <span className="font-second">
                {data.Price + data.vat || 0} บาท
              </span>
            </div>
            <div className="summary-row">
              <span className="font-head">หักภาษี ณ ที่จ่าย (WHT 3%)</span>
              <span className="font-second">{data.wht || 0} บาท</span>
            </div>
            <div className="summary-row total">
              <span className="font-head">จำนวนเงินที่ต้องชำระ</span>
              <span className="font-head">
                <span className="totalnum">{data.finalPrice || 0}</span> บาท
              </span>
            </div>
            <div className="summary-row">
              <span></span>
              <span>({bahtText(data.finalPrice || 0)})</span>
            </div>
            <div className="summary-row">
              <div className="payment-title">
                <CircleDollarSign size={20} color="#1c918b" strokeWidth={2} />
                <span className="font-head">ช่องทางการชำระเงิน</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer signatures */}
      <div className="footer-sign">
        <div className="footer-sign-inner">
          <div className="signature-block font-head">
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

          <div className="signature-block right font-head">
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

          <div className="signature-block right font-head">
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
