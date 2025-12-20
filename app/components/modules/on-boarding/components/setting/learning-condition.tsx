import { useState } from "react";

export const LearningCondition = () => {
  const [days, setDays] = useState<number>(7);
  const [expireAction, setExpireAction] = useState<"force" | "normal">("force");
  const [passType, setPassType] = useState<"auto" | "score" | "admin">("auto");
  const [score, setScore] = useState<number>(70);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">เวลาเรียน</h2>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-gray-700">ต้องเรียนให้จบภายใน</span>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-20 rounded-md border px-3 py-1 text-center focus:outline-none focus:ring-2 focus:ring-black"
          />
          <span className="text-gray-700">วัน</span>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              name="expire"
              checked={expireAction === "force"}
              onChange={() => setExpireAction("force")}
              className="accent-black"
            />
            บังคับเข้าหน้า Onboarding ก่อนใช้งานระบบ
          </label>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              name="expire"
              checked={expireAction === "normal"}
              onChange={() => setExpireAction("normal")}
              className="accent-black"
            />
            เข้า Onboarding ตามปกติ
          </label>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          เลือกวิธีผ่าน
        </h2>

        <div className="space-y-4">
          <label className="flex items-start gap-2 text-gray-700">
            <input
              type="radio"
              name="pass"
              checked={passType === "auto"}
              onChange={() => setPassType("auto")}
              className="accent-black mt-1"
            />
            <div>
              <div>ระบบคิดคะแนนอัตโนมัติ</div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                คะแนนมากกว่า
                <input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-20 rounded-md border px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-black"
                />
                = ผ่าน
              </div>
            </div>
          </label>

          <hr />

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              name="pass"
              checked={passType === "score"}
              onChange={() => setPassType("score")}
              className="accent-black"
            />
            ผ่านเมื่อ ≥ 70/100
          </label>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              name="pass"
              checked={passType === "admin"}
              onChange={() => setPassType("admin")}
              className="accent-black"
            />
            แอดมินเป็นคนอนุมัติเอง
          </label>
        </div>
      </div>
    </div>
  );
};
