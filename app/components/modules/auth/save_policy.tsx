import SectionWithImage from "~/components/modules/auth/SectionWithImage";
import LogoImage from "/assets/images/rome.png";
import PolicyImage1 from "/assets/images/pana.png";
import PolicyImage2 from "/assets/images/Illustration.png";
import PolicyImage3 from "/assets/images/Art.png";
import PolicyImage4 from "/assets/images/rafiki.png";


export default function LoginForm() {
  return (
      <div className="flex-col items-center ">
        <header className="w-full bg-white shadow-sm border-b border-gray-200">
          <div className="mx-auto flex items-center justify-between px-6">
            <div className="flex items-center space-x-2">
            <img
            src={LogoImage}
            alt="logo"
            width={60}
            height={60}
            className="w-full h-[60px] object-contain"
          />            
          </div>

            <div className="flex space-x-2">
              <button className="rounded-md border border-gray-300 bg-gray-200 text-black-700 font-medium px-3 py-1.5 hover:bg-gray-700 transition">
                นโยบายเว็บไซต์
              </button>
              <button className="rounded-md bg-black text-white font-medium px-3 py-1.5 hover:bg-gray-800 transition hover:bg-gray-900 hover:shadow-md hover:scale-105">
                นโยบายการรักษาความมั่นคงปลอดภัย
              </button>
            </div> 
          </div>
        </header>
        <div className="rounded-md mt-8 px-20 ">
          <h1 className="text-6xl font-bold text-center text-gray-900">
            นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์ (security policy)
          </h1>
          <div>
            <SectionWithImage
            title="1. วัตถุประสงค์"
            content={`นโยบายนี้จัดทำขึ้นเพื่อกำหนดแนวทางและมาตรการในการรักษาความมั่นคงปลอดภัยของเว็บไซต์และระบบสารสนเทศของหน่วยงาน เพื่อให้การให้บริการข้อมูลแก่ประชาชนเป็นไปอย่างมั่นคง ปลอดภัย และเชื่อถือได้ รวมถึงป้องกันไม่ให้เกิดการเข้าถึง การทำลาย หรือการใช้ข้อมูลโดยมิชอบด้วยกฎหมาย
            \nทั้งนี้ เพื่อให้เป็นไปตามแนวทางของหน่วยงานภาครัฐ และสอดคล้องกับหลักเกณฑ์ด้านความมั่นคงปลอดภัยไซเบอร์ของประเทศไทย`}
            image={PolicyImage1}
            position="right"  
            />

            <SectionWithImage
            title="2. มาตรการด้านความมั่นคงปลอดภัย"
            content={`หน่วยงานได้ดำเนินมาตรการด้านเทคนิคและการบริหารจัดการเพื่อคุ้มครองเว็บไซต์และข้อมูล โดยครอบคลุมในประเด็นหลัก ดังนี้
            2.1 การรักษาความลับ (Confidentiality): จำกัดสิทธิ์การเข้าถึงข้อมูลเฉพาะผู้ที่ได้รับอนุญาต ป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต และเข้ารหัสข้อมูลสำคัญในการส่งผ่านทางอินเทอร์เน็ต
            2.2 ความถูกต้องครบถ้วน (Integrity): ใช้มาตรการตรวจสอบและป้องกันไม่ให้มีการแก้ไข เปลี่ยนแปลง หรือลบข้อมูลโดยไม่ได้รับอนุญาต พร้อมทั้งบันทึกประวัติการเปลี่ยนแปลงระบบ (Log Management)
            2.3 ความพร้อมใช้งาน (Availability): มีระบบสำรองข้อมูล (Backup) และแผนฟื้นฟูระบบ (Disaster Recovery Plan) เพื่อให้เว็บไซต์สามารถให้บริการได้อย่างต่อเนื่องแม้ในกรณีเกิดเหตุขัดข้อง
            2.4 การป้องกันการโจมตี (Cyber Defense): ใช้ Firewall, ระบบตรวจจับการบุกรุก (IDS/IPS), การตรวจสอบมัลแวร์ และการอัปเดตซอฟต์แวร์อย่างสม่ำเสมอ
            2.5 การเชื่อมต่อปลอดภัย: ใช้โปรโตคอลการเชื่อมต่อแบบเข้ารหัส (HTTPS/SSL Certificate) เพื่อป้องกันการดักจับข้อมูลของผู้ใช้`}
            className="mt-16"
            />

            <SectionWithImage
            title="3. การจัดการเหตุการณ์ด้านความมั่นคงปลอดภัย (Incident Response)"
            content={`ในกรณีที่เกิดเหตุการณ์ด้านความมั่นคงปลอดภัย หน่วยงานมีขั้นตอนการดำเนินการดังนี้ \n
            • ตรวจสอบและยืนยันเหตุการณ์ที่เกิดขึ้น เช่น การโจมตี DDoS การเจาะระบบ หรือข้อมูลรั่วไหล
            • แจ้งเตือนเจ้าหน้าที่ผู้รับผิดชอบและหน่วยงานที่เกี่ยวข้องทันที
            • ดำเนินการกักกัน (Containment) และแก้ไขปัญหาเพื่อหยุดยั้งความเสียหาย
            • บันทึกเหตุการณ์ วิเคราะห์สาเหตุ และวางแผนป้องกันไม่ให้เกิดขึ้นซ้ำ
            • รายงานต่อหน่วยงานภาครัฐที่เกี่ยวข้อง เช่น ไทยเซิร์ต (ThaiCERT) ตามระเบียบข้อบังคับ\n
            หน่วยงานให้ความสำคัญกับการจัดทำรายงานหลังเกิดเหตุ (Post-Incident Report) เพื่อทบทวนและปรับปรุงกระบวนการรักษาความปลอดภัยอย่างต่อเนื่อง`}
            image={PolicyImage2}
            position="left"  
            />

            <SectionWithImage
            title="4. การบริหารจัดการสิทธิ์และบัญชีผู้ใช้งาน"
            content={`เพื่อป้องกันความเสี่ยงจากการเข้าถึงระบบโดยไม่ได้รับอนุญาต หน่วยงานมีนโยบายควบคุมการเข้าถึงระบบสารสนเทศ ดังนี้\n
            • กำหนดชื่อผู้ใช้ (Username) และรหัสผ่าน (Password) ที่มีความซับซ้อนและปลอดภัย
            • จำกัดสิทธิ์การใช้งานตามหน้าที่และความจำเป็น (Principle of Least Privilege)
            • ตรวจสอบและปรับปรุงบัญชีผู้ใช้งานเป็นประจำ
            • ยกเลิกบัญชีผู้ใช้งานทันทีเมื่อพ้นสภาพการเป็นเจ้าหน้าที่ หรือไม่มีเหตุผลในการเข้าถึงระบบ`}
            image={PolicyImage3}
            position="right"  
            />

            <SectionWithImage
            title="5. การอบรมและสร้างจิตสำนึกด้านความปลอดภัยไซเบอร์"
            content={`หน่วยงานจัดอบรมและให้ความรู้แก่เจ้าหน้าที่และผู้ดูแลระบบอย่างต่อเนื่อง เพื่อสร้างความตระหนักถึงภัยคุกคามทางไซเบอร์ การใช้งานระบบอย่างปลอดภัย และแนวทางในการรับมือเหตุการณ์ด้านความมั่นคงปลอดภัย\n
            รวมถึงมีการเผยแพร่คู่มือ แนวทางปฏิบัติ (Guideline) และสื่อประชาสัมพันธ์เกี่ยวกับความปลอดภัยข้อมูลแก่เจ้าหน้าที่และบุคลากรในหน่วยงานอย่างต่อเนื่อง`}
            />

            <SectionWithImage
            title="6. การตรวจสอบและประเมินความปลอดภัย"
            content={`หน่วยงานดำเนินการตรวจสอบและประเมินความปลอดภัยของเว็บไซต์และระบบสารสนเทศเป็นประจำอย่างน้อยปีละ 1 ครั้ง เพื่อค้นหาช่องโหว่และความเสี่ยง รวมถึงทดสอบระบบด้วยวิธีการจำลองการโจมตี (Penetration Test) โดยผู้เชี่ยวชาญภายนอกหากจำเป็น`}
            image={PolicyImage4}
            position="left"  
            />            
            <SectionWithImage
            title="7. การปรับปรุงและทบทวนนโยบาย"
            content={`หน่วยงานจะทบทวนและปรับปรุงนโยบายนี้อย่างน้อยปีละ 1 ครั้ง หรือเมื่อมีการเปลี่ยนแปลงเทคโนโลยี มาตรฐานด้านความมั่นคงปลอดภัย หรือกฎหมายที่เกี่ยวข้อง เพื่อให้สอดคล้องกับสถานการณ์ภัยคุกคามไซเบอร์ที่เปลี่ยนแปลงอย่างต่อเนื่อง`
            }
            position="right"
            
            />
            
          </div>
          <div className="text-center pt-10">
            <button className="rounded-md bg-black text-white font-medium px-4 py-2 hover:bg-gray-800 transition">
              กลับไปหน้าเว็บไซต์
            </button>
            <p className="text-gray-500 text-sm mt-4">
              ปรับปรุงล่าสุด: 14 พฤศจิกายน 2568
            </p>
          </div>
        </div>
          
        
      </div>
  );
}
