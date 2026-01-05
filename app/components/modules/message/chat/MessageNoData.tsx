import { MessagesSquare } from "lucide-react";
import FeatureCard from "~/components/shared/feature-card";

export const MessageNoData = () => {
  return (
    <div className="flex flex-col h-[200px] w-full justify-center items-center gap-12">
      <h2 className="text-center text-2xl">
        ยินดีต้อนรับสู่แชท Feature ที่ผนวกร่วมกับ Rome AI
      </h2>
      <div className="w-[300px]">
        <FeatureCard
          icon={<MessagesSquare className="w-8 h-8 text-blue-500" />}
          title="แชท sale AI & Support"
          description="ช่องทางแชทระหว่างฝ่ายขายและลูกค้า พร้อมผนวก AI ช่วยตอบคำถามและสนับสนุนการสนทนาอย่างรวดเร็วและแม่นยำ"
        />
      </div>
    </div>
  );
};
