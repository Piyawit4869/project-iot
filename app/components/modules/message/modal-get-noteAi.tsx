import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog";
import { Card } from "~/components/ui/card";
import { useGetSummaryAINote } from "~/api/client/customer/useCustomer";
import { StreamingText } from "./streaming-text";
import LoadingAnimation from "./loading-animation";
import GlobalButton from "~/components/shared/global-button";
import { SparkleIcon } from "lucide-react";

type FieldKey =
  | "customerStatus"
  | "businessType"
  | "customerName"
  | "citizenId"
  | "businessPhone"
  | "businessEmail"
  | "importantDate"
  | "incorporationDate"
  | "accountOwnerName";

export type AiFieldsState = Record<
  FieldKey,
  { checked: boolean; note: string; defaultValues: string }
>;

type Props = {
  chatRoomId?: any;
  customerId?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function GetNoteFormAI({
  chatRoomId,
  customerId,
  open,
  setOpen,
}: Props) {
  const { data, isFetched, isFetching, refetch } =
    useGetSummaryAINote(customerId);

  const [finalText, setFinalText] = React.useState("");
  const [shouldStream, setShouldStream] = React.useState(false);

  React.useEffect(() => {
    if (isFetched && data?.summary) {
      setFinalText(data.summary);
      setShouldStream(true);
    }
  }, [isFetched, data?.summary]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg w-full max-h-[95vh] min-w-[35%] overflow-auto rounded-lg">
        <DialogTitle>สรุปโน้ตจาก AI</DialogTitle>

        <Card className="w-full h-full min-h-[20vh] flex items-center justify-center">
          <div className="flex flex-row flex-wrap justify-center px-4">
            {isFetching ? (
              <LoadingAnimation />
            ) : shouldStream ? (
              <StreamingText
                text={finalText}
                speed={20}
                onDone={() => setShouldStream(false)}
              />
            ) : (
              <p className="leading-relaxed whitespace-pre-wrap text-md">
                {finalText}
              </p>
            )}
          </div>
        </Card>

        <GlobalButton
          label="สรุปโน้ตอีกครั้ง"
          icon={<SparkleIcon />}
          onClick={() => {
            setShouldStream(false); // reset ก่อน
            refetch();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
