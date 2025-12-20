"use client";

import { TabControl } from "~/components/shared/tab-control";
import {
  Save,
  MessageCirclePlus,
  Heading,
  SquarePlay,
  BotMessageSquare,
  MessageCircleQuestionMark,
} from "lucide-react";
import { usePaginate } from "~/api/client/user";
import { useOnboardColumns } from "../components/Management/columns";
import GlobalButton from "~/components/shared/global-button";
import {
  ContentSchema,
  type ContentValues,
} from "~/schemas/on-boarding/onboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { useState, type JSX } from "react";
import { Content } from "../components/Management/content";
import { Exam } from "../components/Management/exam";
import { Video } from "../components/Management/video";
import { Topic } from "../components/Management/topic";

export default function OnBoardingManagementSingle() {
  const [topics, setTopics] = useState<number[]>([]);
  const [contents, setContents] = useState<number[]>([]);
  const [exams, setExams] = useState<number[]>([]);
  const [videos, setVideos] = useState<number[]>([]);

  const handleAddTopic = () => setTopics((prev) => [...prev, Date.now()]);
  const handleAddContent = () => setContents((prev) => [...prev, Date.now()]);
  const handleAddExam = () => setExams((prev) => [...prev, Date.now()]);
  const handleAddVideo = () => setVideos((prev) => [...prev, Date.now()]);

  const handleDeleteTopic = (id: number) =>
    setTopics((prev) => prev.filter((c) => c !== id));

  const handleDeleteContent = (id: number) =>
    setContents((prev) => prev.filter((c) => c !== id));

  const handleDeleteExam = (id: number) =>
    setExams((prev) => prev.filter((e) => e !== id));

  const handleDeleteVideo = (id: number) =>
    setVideos((prev) => prev.filter((e) => e !== id));

  const paginate = usePaginate;
  const columns = useOnboardColumns();

  const formContent = useForm<ContentValues>({
    resolver: zodResolver(ContentSchema) as Resolver<ContentValues>,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      department: "",
      thumbnailUrl: "",
    },
  });

  return (
    <div className="flex flex-col space-y-3 p-8">
      <TabControl
        title="สร้างเนื้อหา"
        backpath="/on-boarding/management/create"
        buttons={[
          <GlobalButton
            label={
              <>
                <Save /> บันทึก
              </>
            }
            type="submit"
            // loading={isCreating}
            // form="orders"
          />,
        ]}
      />
      <Topic />
      <div className="flex flex-col space-y-4">
        {topics.map((id) => (
          <Topic key={id} onDelete={() => handleDeleteTopic(id)} />
        ))}

        {contents.map((id) => (
          <Content key={id} onDelete={() => handleDeleteContent(id)} />
        ))}

        {exams.map((id) => (
          <Exam key={id} onDelete={() => handleDeleteExam(id)} />
        ))}

        {videos.map((id) => (
          <Video key={id} onDelete={() => handleDeleteVideo(id)} />
        ))}
      </div>

      <div className="inline-flex items-center gap-3 w-fit px-2 py-1.5 border-2 border-dashed border-gray-400 rounded-lg">
        <Heading className="w-5 h-5 cursor-pointer" onClick={handleAddTopic} />

        <MessageCirclePlus
          className="w-5 h-5 cursor-pointer"
          onClick={handleAddContent}
        />

        <MessageCircleQuestionMark
          className="w-5 h-5 cursor-pointer"
          onClick={handleAddExam}
        />

        <SquarePlay
          className="w-5 h-5 cursor-pointer"
          onClick={handleAddVideo}
        />

        <BotMessageSquare className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
}
