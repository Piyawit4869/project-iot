import { FormProvider, type UseFormReturn } from "react-hook-form";
import { Card } from "~/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { ConnectAiValues } from "~/schemas/settings";

type ConnectLineStep5Props = {
  form: UseFormReturn<ConnectAiValues>;
};

export const ConnectOpenAiStep5: React.FC<ConnectLineStep5Props> = (props) => {
  const { form } = props;

  return (
    <FormProvider {...form}>
      <div className="flex w-full flex-col space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">AI Chat</h1>
          </div>
          <div className="">
            <h2 className="text-base font-semibold">(OpenAI Assistant)</h2>
          </div>
          <div className="mt-5 space-y-3">
            <div className="rounded-lg bg-gray-100 p-4">
              <ul className="space-y-3 text-sm">
                <div className="flex items-start gap-2 mb-3">
                  1. กรอกข้อมูล Secret Key จากหน้า API keys ใส่ในกล่องด้านล่าง
                </div>
                <div className="space-y-2 mt-6 ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Assistants ID"
                            className="bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2 mt-6 ">
                  <FormField
                    control={form.control}
                    name="aiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Key</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="sk-proj-s8HCHzANAscl9PbRwozAYuL"
                            className="bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </FormProvider>
  );
};
