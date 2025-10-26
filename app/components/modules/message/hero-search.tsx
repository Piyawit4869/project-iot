import * as React from "react";
import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";

interface HeroSearchProps {
  onInputChange: (value: string) => void;
}

// Full-bleed hero with centered headline + pill search bar
export default function HeroSearch(props: HeroSearchProps) {
  const { onInputChange } = props;

  const [query, setQuery] = React.useState("");

  const onSend = () => {
    // TODO: wire to your search/route action

    onInputChange(query);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-full  max-w-5xl mx-auto">
        {/* Search Bar */}
        <div className="w-full max-w-3xl mt-2">
          {/* Composer Card */}
          <div className="flex flex-col rounded-[28px] border-1 border-neutral-300 ring-1 ring-white/10 overflow-hidden">
            {/* Floating send button */}

            {/* Textarea */}
            <div className="px-2 pb-8">
              {/* extra bottom padding for toolbar */}
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="พิมพ์ข้อความของคุณที่นี่..."
                className="h-[160px] resize-y bg-transparent mt-4 border-0 text-base leading-relaxed placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex self-end mr-2 mb-2">
              <Button
                type="button"
                onClick={onSend}
                className="h-8 w-8 rounded-full bg-sky-500 hover:bg-sky-600 text-white"
                aria-label="ส่ง"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Toolbar */}
            {/* <div className="absolute left-4 bottom-3 flex items-center gap-4 text-neutral-300">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-white/10"
                  aria-label="แนบไฟล์"
                >
                  <LinkIcon className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-white/10"
                  aria-label="คำสั่งช่วยเหลือ"
                >
                  <Sparkles className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-white/10"
                  aria-label="ช่วยเหลือ"
                >
                  <CircleHelp className="h-5 w-5" />
                </Button>
              </div> */}
          </div>
        </div>

        {/* Helper text / example prompts */}
        <div className="mt-5 text-center text-sm text-neutral-400">
          ตัวอย่าง: “ช่วยสร้างประโยคการเปิดการขายให้หน่อย?”,
          “สินค้าที่เหลือในสต๊อกตอนนี้?”,
        </div>
      </div>
    </div>
  );
}
