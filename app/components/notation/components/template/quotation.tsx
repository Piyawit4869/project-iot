import "./quotation.css";

type QuotationMockProps = {
  data: any;
  product: any[];
  makeImage?: any;
  approvedImage?: any;
};

export function QuotationMock({
  data,
  product,
  makeImage,
  approvedImage,
}: QuotationMockProps) {
  const resultTotal = product.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="quotation-container">
      <h1 className="quotation-title">ใบเสนอราคา</h1>

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
          {product.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>
                <strong>{item.name}</strong>
                <br />
                {item.detail}
              </td>
              <td>{item.quantity}</td>
              <td>{item.salePrice}</td>
              <td>{item.quantity * item.salePrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
