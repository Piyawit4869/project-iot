import { GlobalImage } from "~/components/shared/global-image";
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
  const resultTotal = product.reduce((sum: any, p: any) => sum + p.quantity, 0);

  return (
    <div className="px-5 text-[#333] font-sans w-full mx-auto">
      {/* Header */}
      <h1 className="text-right text-2xl font-bold text-orange-500 mb-6">
        ใบเสนอราคา
      </h1>

      {/* Top Information */}
      <div className="flex justify-between mb-6 text-sm leading-relaxed">
        <div className="w-[48%]">
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

        <div className="w-[32%] text-sm">
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
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 border">
            <th className="border p-2 w-[30px] text-left">#</th>
            <th className="border p-2 text-left">รายละเอียด</th>
            <th className="border p-2 w-[70px] text-left">จำนวน</th>
            <th className="border p-2 w-[100px] text-left">ราคา/หน่วย</th>
            <th className="border p-2 w-[120px] text-left">ราคารวม</th>
          </tr>
        </thead>

        <tbody>
          {product?.map((item: any, idx: number) => (
            <tr key={idx}>
              <td className="border p-2">{idx + 1}</td>
              <td className="border p-2 leading-relaxed">
                <strong>{item.name}</strong>
                <br />
                {item.detail}
              </td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">{item.salePrice}</td>
              <td className="border p-2">{resultTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="mt-6 ml-auto w-[300px] text-sm space-y-1">
        <div className="flex justify-between">
          <span>ราคารวมสินค้า</span>
          <span>{data.Price} บาท</span>
        </div>
        <div className="flex justify-between">
          <span>ส่วนลด</span>
          <span>{data.discount || 0} บาท</span>
        </div>
        <div className="flex justify-between">
          <span>ภาษีมูลค่าเพิ่ม</span>
          <span>{data.vat} บาท</span>
        </div>

        <div className="flex justify-between font-bold">
          <span>ยอดรวมทั้งหมด</span>
          <span>{data.finalPrice} บาท</span>
        </div>
      </div>

      {/* Customer Block */}
      <div className="mt-8 text-sm">
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
      <div className="mt-20 pt-10 border-t text-sm">
        <div className="flex justify-between mt-12">
          <div className="text-left">
            ในนามผู้จัดทำ
            <br />
            <br />
            {makeImage ? (
              <img src={makeImage} className="h-16" />
            ) : (
              <div className="h-16"></div>
            )}
            <span className="flex mt-4">{data.makeByName}</span>
            <span>{data.makeByPosition}</span>
          </div>

          <div className="text-right">
            ในนามผู้อนุมัติ
            <br />
            <br />
            {approvedImage ? (
              <img src={approvedImage} className="h-16" />
            ) : (
              <div className="h-16"></div>
            )}
            <span className="mt-4">{data.approvedByName}</span>
            <span>{data.approvedByPosition}</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-xs">หน้าที่ 1/3</div>
    </div>
  );
}
