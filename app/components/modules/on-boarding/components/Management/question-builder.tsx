import { zodResolver } from "@hookform/resolvers/zod";
import type { StringOrTemplateHeader } from "@tanstack/react-table";
import { enIE } from "date-fns/locale";
import { ChevronDown, CircleFadingPlus, Plus, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm, type Resolver } from "react-hook-form";
import ImageUpload from "~/components/shared/image-upload";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { ExamSchema, type ExamValues } from "~/schemas/on-boarding/onboard";

enum QuestionType {
  choice = "choice",
  input = "input",
  select = "select",
}

type AnswerMap = Record<number, number | null>;

type Question = {
  id: number;
  title: string;
  description: string;
  image: string;
  type: QuestionType;
  choices: string[];
  correctIndex: number | null;
};

const emptyQuestion = (id: number): Question => ({
  id,
  title: "",
  description: "",
  image: "",
  type: QuestionType.select,
  choices: ["ตัวเลือก 1", "ตัวเลือก 2"],
  correctIndex: null,
});

type CardFieldBlockProps = {
    title: string;
    description?: string;
    control?: ReactNode;
    children: ReactNode;
  };

export const QuestionBuilder = () => {
  const [questions, setQuestions] = useState<Question[]>([emptyQuestion(1)]);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [openQuestions, setOpenQuestions] = useState<Record<number, boolean>>(
    () =>
      questions.reduce(
        (acc, q) => {
          acc[q.id] = true;
          return acc;
        },
        {} as Record<number, boolean>
      )
  );

  const addQuestion = () => {
    setQuestions((prev) => {
      const newQuestion = emptyQuestion(prev.length + 1);
      setOpenQuestions((prevOpen) => ({
        ...prevOpen,
        [newQuestion.id]: true,
      }));
      return [...prev, newQuestion];
    });
  };

  const updateQuestion = (id: number, data: Partial<Question>) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...data } : q))
    );
  };

  const toggleQuestion = (id: number) => {
    setOpenQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onCreate = (values: ExamValues) => {
    const payload = Object.assign({}, values);
    // const contact = payload?.contacts?.[0];

    // if (
    //   contact &&
    //   !contact.name &&
    //   !contact.phone &&
    //   !contact.position &&
    //   !contact.department &&
    //   !contact.email
    // ) {
    //   payload.contacts = [];
  };

  // const values = formExam.getValues();
  const formExam = useForm<ExamValues>({
    resolver: zodResolver(ExamSchema) as Resolver<ExamValues>,
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      title: "",
      imageUrl: "",
    },
  });

  function CardFieldBlock({ title, description }: CardFieldBlockProps) {
    return (
      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold">{title}</p>
            {description ? (
              <p className="text-muted-foreground text-sm">{description}</p>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <Form {...formExam}>
      <form id="question" onSubmit={formExam.handleSubmit(onCreate)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-gray-100">
          <div className="bg-white rounded-xl p-6 shadow space-y-6">
            <h2 className="font-semibold text-lg">คำถาม</h2>

            {questions.map((q, index) => {
              const isOpen = openQuestions[q.id] ?? true;
              return (
                <div key={q.id} className="border rounded-lg p-4 space-y-3">
                  <div
                    className="inline-flex justify-between w-full cursor-pointer"
                    onClick={() => toggleQuestion(q.id)}
                  >
                    <p className="text-xl font-bold">
                      คำถามที่ {index + 1} : {q.title || "บริษัทนี้ชื่ออะไร"}
                    </p>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <p className="text-gray-400">
                    ตัวเลือก {q.choices?.length || 0} รายการ
                  </p>

                  {isOpen && (
                    <>
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          คำถาม
                        </label>
                        <input
                          placeholder="เช่น บริษัทนี้ชื่ออะไร"
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
                          placeholder="เช่น เลือก 1 คำตอบ"
                          value={q.description}
                          onChange={(e) =>
                            updateQuestion(q.id, {
                              description: e.target.value,
                            })
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
                          onChange={(url) =>
                            updateQuestion(q.id, { image: url })
                          }
                          width={180}
                          height={140}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          ประเภทคำถาม
                        </label>
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
                      </div>

                      {(q.type === QuestionType.choice ||
                        q.type === QuestionType.select) && (
                        <div className="space-y-2">
                          {q.choices.map((c, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Checkbox
                                checked={q.correctIndex === i}
                                onCheckedChange={() =>
                                  updateQuestion(q.id, { correctIndex: i })
                                }
                                className="w-4 h-4"
                              />
                              <input
                                value={c}
                                onChange={(e) => {
                                  const copy = [...q.choices];
                                  copy[i] = e.target.value;
                                  updateQuestion(q.id, { choices: copy });
                                }}
                                className="flex-1 border rounded-lg px-3 py-2"
                                placeholder={`ตัวเลือก ${i + 1}`}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = q.choices.filter(
                                    (_, index) => index !== i
                                  );
                                  updateQuestion(q.id, { choices: copy });
                                }}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() =>
                              updateQuestion(q.id, {
                                choices: [...q.choices, ""],
                              })
                            }
                            className="inline-flex hover:text-black py-2 px-2 rounded-xl"
                          >
                            <CircleFadingPlus className="w-5 h-5" />{" "}
                            &nbsp;เพิ่มตัวเลือก
                          </button>
                          <div className="flex items-center justify-between gap-4 rounded-md px-4 py-3">
                            <div className="flex items-center gap-2">
                              <FormField
                                control={formExam.control}
                                name="active"
                                render={({ field }) => (
                                  <FormItem className="flex items-center gap-2">
                                    <FormControl>
                                      <Switch
                                        // checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <Label className="font-semibold">
                                      จำเป็น
                                    </Label>
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex items-center gap-2">
                              <Label className="text-sm font-semibold">
                                คะแนน
                              </Label>
                              <Input
                                type="number"
                                min={1}
                                max={10}
                                className="w-20 text-center"
                                placeholder="1–10"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              onClick={addQuestion}
              className="flex bg-black text-white py-2 px-2 rounded-xl ml-auto"
            >
              <Plus className="w-5 h-5" /> &nbsp;เพิ่มคำถาม
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow space-y-6">
            <h2 className="font-semibold text-lg">ตัวอย่างคำถาม</h2>
            {questions.map((q, index) => (
              <div key={q.id} className="border rounded-lg p-4 space-y-3">
                <h1 className="font-bold">
                  คำถามที่ {index + 1} {q.title || "บริษัทนี้ชื่ออะไร"}
                </h1>
                <h4 className="font-small text-gray-400">
                  {q.description || "เลือก 1 คำตอบ"}
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

                {q.type === QuestionType.input && (
                  <textarea
                    placeholder={q.title}
                    className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                  />
                )}

                {q.type === QuestionType.choice && (
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
                            setAnswers((prev) => ({ ...prev, [q.id]: i }))
                          }
                          className="accent-black"
                        />
                        {c}
                      </label>
                    ))}
                  </div>
                )}

                {q.type === QuestionType.select && (
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
      </form>
    </Form>
  );
};
