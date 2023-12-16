/**
 * this component is a box of title
 * @param title
 * @returns {Title("")} Box of title
 */

import { Form } from "antd";
import React from "react";
import dayjs from "dayjs";

interface PreviewProps {
	values: any;
}

export const Preview = (props: PreviewProps) => {
	const { values } = props;

	const renderValue = (value: any) => {
		return value ? value : "-";
	};

	const [form] = Form.useForm();

	React.useEffect(() => {
		form.setFieldsValue({
			...values,
			validDate: values.validDate ? dayjs(values.validDate) : "",
		});
	}, [form, values]);

	const htmlString = values
		? `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <style>
    .header {
      display: flex;
      justify-content: space-between;
      height: 240px;
    }
      
    .headerLeft {
      width: 400px;
    }
      
    .headerRight {
      width: auto;
      text-align: right;
    }
    
    .manuScript {
      line-height: 0;
      margin: 10px;
    }
      
    .quotation {
      font-size: 32px;
      line-height: 0;
      color: #E46F1B;
    }
      
    .docNum-and-refer {
      background-color: rgba(238, 148, 55, 0.64);
      border-radius: 1rem;
      text-align: justify;
      line-height: 0.5;
      padding: 2px;
      padding-left: 30px;
      width: 300px;
      margin-top: 10px;
    }
      
    .companyName {
      font-size: 29px;
      margin: 0;
      display: inline;
      margin-right: 5px;
    }
      
    .logo {
      width: 80px;
      height: 80px;
      background-color: #E46F1B;
      margin-left: 10px;
      border-radius: 1rem;
      text-align: center;
    }
      
    .taxpayerNumber, .tell, .email, .address {
      line-height: 1.5;
      margin: 0;
    }
      
    .branchCmp {
      display: inline;
      margin-right: 10px;
    }
      
    .detailsCompany {
      margin-top: -15px;
    }
      
    .listTable, th {
      height: 50px;
      border-spacing: 0px;
    }
    
    .footer {
      display: flex;
      justify-content: space-between;
    }
    
    .note {
      width: 400px;
      line-height: 0;
    }
    
    .total {
      width: 300px;
    }
    
    .amountToPay {
      height: 50px;
      background-color: rgba(238, 148, 55, 0.64);
    }
    
    .summarize {
      border-spacing: 0px;
    }
    
    .amountSum {
      font-size: 20px;
      color: #E46F1B;
    }
    
    .Payment {
      width: 300px;
      background-color: lightgrey;
      float: right;
    }
    
    .imgBank {
      width: 100px; 
      height: 100px;
      float: left;
      padding-bottom: 10px;
    }
    
    .signature {
      display: flex;
      justify-content: space-evenly;
    }
    
    .exportingCompany, .recipient {
      text-align: center;
      width: 180px;
    }
    </style>
    <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
  </head>
  <body>
  <div class="main-page">
      <div class="sub-page">
          <div class="header">
              <div class="headerLeft">
                  <div class="logo">
                      <img src="../../assets/images/Logo-StayOrganized.png" style="width: 70px; height: 70px; margin-top: 8px;">
                  </div>
                  <p class="companyName"><b>บริษัท ยูโทเทค จำกัด</b><p class="branchCmp">(สำนักงานใหญ่)</p></p>
                  <div class="detailsCompany">
                      <p class="address">${renderValue(values.address)}</p>
                      <p class="taxpayerNumber"><b>เลขที่ผู้เสียภาษี :</b></p>
                      <p class="tell"><b>เบอร์โทรศัพท์ :</b></p>
                      <p class="email"><b>E-mail :</b></p>
                  </div>
              </div>
              <div class="headerRight">
                  <p class="manuScript">(ต้นฉบับ)</p>
                  <p class="quotation"><b>ใบเสนอราคา</b></p>
                  <div class="docNum-and-refer">
                      <p><b>เลขที่เอกสาร :</b> ${renderValue(
												values.numberDoc
											)}</p>
                      <p><b>วันที่ออก :</b> ${renderValue(values.issueDate)}</p>
                      <p><b>ใช้ได้ถึง :</b> ${renderValue(values.validDate)}</p>
                      <p><b>อ้างอิง :</b> ${renderValue(values.refer)}</p>
                  </div>
              </div>
          </div>
          <hr>
          <div class="detailIssueTo">
              <table class="issueToTable" style="width: 100%">
                  <tr style="width: 100px;">
                      <td style="line-height: 0; margin: 0;"><p class="issueTo"><b>ออกให้กับ : </b>${renderValue(
												values.cusName
											)}</p></td>
                      <td style="line-height: 0; margin: 0;"><p class="tellIssueTo"><b>เบอร์โทรศัพท์ : </b> ${renderValue(
												values.tell
											)}</p></td>
                  </tr>
                  <tr>
                      <td style="line-height: 0; margin: 0;"><p class="addressIssueTo"><b>ที่อยู่ : </b>ไม่รู้</p></td>
                      <td style="line-height: 0; margin: 0;"><p class="emailIssueTo"><b>E-mail : </b>-</p></td>
                  </tr>
                  <tr>
                      <td style="line-height: 0; margin: 0;"><p class="taxpayerNumIssueTo"><b>เลขที่เสียภาษี : </b>-</p></td>
                  </tr>
              </table>
          </div>
          <div>
              <table class="listTable" style="width: 100%">
                  <tr style="background-color: rgba(238, 148, 55, 0.64);">
                      <th style="text-align: start;">คำอธิบาย</th>
                      <th>จำนวน</th>
                      <th>ราคา/หน่วย</th>
                      <th style="text-align: end; padding-right: 10px;">รวม</th>
                  </tr>
                  <tr>
                      <td>
                          <dl>
                              <dt>1.Design Web app</dt>
                              <dd>${renderValue(values.descriptions)}</dd>
                          </dl>
                          </td>
                      <td style="text-align: center;">${renderValue(
												values.quantity
											)}</td>
                      <td style="text-align: center;">${renderValue(
												values.pricePerUnits
											)}</td>
                      <td style="text-align: center;">10,000.00</td>
                  </tr>
                  <tr>
                      <td>
                          <dl>
                              <dt>2.Development Web app</dt>
                              <dd>${renderValue(values.descriptions)}</dd>
                          </dl>
                      </td>
                      <td style="text-align: center;">${renderValue(
												values.quantity
											)}</td>
                      <td style="text-align: center;">${renderValue(
												values.pricePerUnits
											)}</td>
                      <td style="text-align: center;">10,000.00</td>
                  </tr>
              </table> 
          </div>
          <hr>
          <div class="footer">
              <div class="note"><i class='far fa-comment-dots'></i><p><b>หมายเหตุ : </b>${renderValue(
								values.noteForCus
							)}</p></div>
              <div class="total">
                  <table style="width: 100%;" class="summarize">
                      <tr>
                          <td style="text-align: start;"><b>จำนวน</b></td>
                          <td style="text-align: right">20,000.00</td>
                          <td style="text-align: right">บาท</td>
                      </tr>
                      <tr>
                          <td style="text-align: start;"><b>หัก ส่วนลด</b></td>
                          <td style="text-align: right">${renderValue(
														values.discountPerUnits
													)}</td>
                          <td style="text-align: right">บาท</td>
                      </tr>
                      <tr>
                          <td style="text-align: start;"><b>หัก ภาษี ณ ที่จ่าย</b></td>
                          <td style="text-align: right">0.00</td>
                          <td style="text-align: right">บาท</td>
                      </tr>
                      <tr>
                          <td style="text-align: start;"><b>จำนวนภาษีมูลค่าเพิ่ม</b></td>
                          <td style="text-align: right">0.00</td>
                          <td style="text-align: right">บาท</td>
                      </tr>
                      <tr class="amountToPay">
                          <td style="text-align: start;"><b>จำนวนเงินที่ต้องชำระ</b></td>
                          <td style="text-align: right"><p class="amountSum"><b>20,000.00</b></p></td>
                          <td style="text-align: right"><b>บาท</b></td>
                      </tr>
                  </table>
                  <p style="text-align: right; line-height: 0;">(สองหมื่นบาทถ้วน)</p>
                  <div class="Payment">
                      <p style="line-height: 0; padding-left: 10px; padding-top: 5px;">ช่องทางการชำระเงิน</p>
                      <img src="../../assets/images/thaiparnich.png" class="imgBank">
                      <div style="float: left;">
                          <p style="line-height: 0.5;">ธนาคารไทยพาณิชย์</p>
                          <p style="line-height: 0.5;">ออมทรัพย์ ${renderValue(
														values.bankAccount
													)}</p>
                          <p style="line-height: 0.5;">ยูโทเทค</p>
                      </div>
                  </div>
              </div>
          </div>
          <hr>
          <div class="signature">
              <div class="exportingCompany">
                  <p style="line-height: 0;">บริษัท ยูโทเทค จำกัด</p>
                  <hr style="margin-top: 80px;">
                  <p>30/07/2566</p>
              </div>
              <div class="recipient">
                  <p style="line-height: 0;">ผู้รับเอกสาร</p>
                  <hr style="margin-top: 80px;">
                  <p>30/07/2566</p>
              </div>
          </div>
      </div>
  </div>
  </body>
  </html>
    <p>
      ${renderValue(values.refer)}
    </p>
    <p>
      ${renderValue(values.numberDoc)}
    </p>
    <p>
      ${renderValue(values.cusName)}
    </p>
    <p>
      ${renderValue(values.tell)}
    </p>
    <p>
      ${renderValue(values.address)}
    </p>
    <p>
      ${renderValue(values.descriptions)}
    </p>
    <p>
      ${renderValue(values.quantity)}
    </p>
    <p>
      ${renderValue(values.bankAccount)}
    </p>
    <p>
      ${renderValue(values.pricePerUnits)}
    </p>
    <p>
      ${renderValue(values.discountPerUnits)}
    </p>
    <p>
      ${renderValue(values.noteForCus)}
    </p>
    </div>
  `
		: "";
	return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
};
