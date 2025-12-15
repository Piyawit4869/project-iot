import { zodResolver } from "@hookform/resolvers/zod";
import type { StringOrTemplateHeader } from "@tanstack/react-table";
import { useState } from "react";
import { Form, useForm, type Resolver } from "react-hook-form";
import ImageUpload from "~/components/shared/image-upload";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { TestSchema, type TestValues } from "~/schemas/on-boarding/onboard";

type QuestionType = "choice" | "input" | "select";
type AnswerMap = Record<number, number | null>;

type Question = {
  id: number;
  title: string;
  description: string;
  image: string;
  type: QuestionType;
  choices: string[];
};

const emptyQuestion = (id: number): Question => ({
  id,
  title: "",
  description: "",
  image: "",
  type: "choice",
  choices: ["ตัวเลือก 1", "ตัวเลือก 2"],
});

export const QuestionBuilder = () => {
  const [questions, setQuestions] = useState<Question[]>([emptyQuestion(1)]);
  const [answers, setAnswers] = useState<AnswerMap>({});

  const addQuestion = () => {
    setQuestions((prev) => [...prev, emptyQuestion(prev.length + 1)]);
  };

  const updateQuestion = (id: number, data: Partial<Question>) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...data } : q))
    );
  };

  const formTest = useForm<TestValues>({
    resolver: zodResolver(TestSchema) as Resolver<TestValues>,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      imageUrl: "",
    },
  });

  return (
    <Form {...formTest}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-gray-100">
        <div className="bg-white rounded-xl p-6 shadow space-y-6">
          <h2 className="font-semibold text-lg">คำถาม</h2>

          {questions.map((q, index) => (
            <div key={q.id} className="border rounded-lg p-4 space-y-3">
              <p className="font-medium">
                คำถามที่ {index + 1} : {q.title}
              </p>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  คำถาม
                </label>
                <input
                  placeholder="กรอกคำถาม"
                  value={q.title}
                  onChange={(e) =>
                    updateQuestion(q.id, { title: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  คำอธิบาย
                </label>
                <input
                  placeholder="กรอกคำอธิบาย"
                  value={q.description}
                  onChange={(e) =>
                    updateQuestion(q.id, { description: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  แนบรูปภาพ
                </label>

                <ImageUpload
                  value={q.image}
                  onChange={(url) => updateQuestion(q.id, { image: url })}
                  width={180}
                  height={140}
                />
              </div>

              <select
                value={q.type}
                onChange={(e) =>
                  updateQuestion(q.id, {
                    type: e.target.value as QuestionType,
                  })
                }
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="choice">Choice</option>
                <option value="input">Input</option>
                <option value="select">Select</option>
              </select>

              {(q.type === "choice" || q.type === "select") && (
                <div className="space-y-2">
                  {q.choices.map((c, i) => (
                    <input
                      key={i}
                      value={c}
                      onChange={(e) => {
                        const copy = [...q.choices];
                        copy[i] = e.target.value;
                        updateQuestion(q.id, { choices: copy });
                      }}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={addQuestion}
            className="flex bg-black text-white py-3 px-3 rounded-xl ml-auto"
          >
            + เพิ่มคำถาม
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow space-y-6">
          <h2 className="font-semibold text-lg">ตัวอย่างคำถาม</h2>

          {questions.map((q, index) => (
            <div key={q.id} className="border rounded-lg p-4 space-y-3">
              <p className="text-sm text-gray-500">คำถามที่ {index + 1}</p>

              <h3 className="font-medium">{q.title || "ยังไม่ได้กรอกคำถาม"}</h3>
              <h4 className="font-small">
                {q.description || "ยังไม่ได้กรอกคำอธิบาย"}
              </h4>

              {q.image && (
                <div className="w-full">
                  <img
                    src={q.image}
                    alt="question"
                    className="rounded-lg max-h-48 object-cover"
                  />
                </div>
              )}

              {q.type === "input" && (
                <input
                  placeholder="พิมพ์คำตอบ..."
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                />
              )}

              {q.type === "choice" && (
                <div className="space-y-2">
                  {q.choices.map((c, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === i}
                        onChange={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [q.id]: i,
                          }))
                        }
                      />
                      {c}
                    </label>
                  ))}
                </div>
              )}

              {q.type === "select" && (
                <select className="w-full border rounded-lg px-3 py-2">
                  {q.choices.map((c, i) => (
                    <option key={i}>{c}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </div>
    </Form>
  );
};
