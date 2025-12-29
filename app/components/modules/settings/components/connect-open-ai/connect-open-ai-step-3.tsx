import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { ConnectAiValues } from "~/schemas/settings";
import { FormProvider } from "react-hook-form";
import { Card } from "~/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";

type ConnectOpenAiStep3Props = {
  form: UseFormReturn<ConnectAiValues>;
};

export const ConnectOpenAiStep3: React.FC<ConnectOpenAiStep3Props> = (
  props
) => {
  const { form } = props;

  return (
    <FormProvider {...form}>
      <div className="flex w-full flex-col space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">AI Chat</h1>
          </div>
          <div>
            <h2 className="text-base font-semibold">(OpenAI Assistant)</h2>
          </div>

          <Card className="rounded-lg bg-gray-100 p-4 mt-5 space-y-5">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Assistants
            </h1>

            <FormField
              control={form.control}
              name="openAssistantId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assistants ID</FormLabel>
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

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a user friendly name"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>System instructions</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter instructions"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="gpt-4o"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-5 flex flex-col space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="defaultIsAiReply"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-4">
                        <FormLabel className="mb-0">File Search</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {/* <div className="flex space-x-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-black">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-md bg-black cursor-pointer">
                    <Plus className="w-5 h-5 text-white" />
                    <span className="text-white text-sm font-medium">File</span>
                  </div>
                </div> */}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-4">
                        <FormLabel className="mb-0">Code interpreter</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {/* <div className="flex space-x-2">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-md bg-black cursor-pointer">
                    <Plus className="w-5 h-5 text-white" />
                    <span className="text-white text-sm font-medium">File</span>
                  </div>
                </div> */}
              </div>

              {/* <div className="flex items-center justify-between">
                <h2 className="text-base">Functions</h2>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-md bg-black cursor-pointer">
                  <Plus className="w-5 h-5 text-white" />
                  <span className="text-white text-sm font-medium">
                    Functions
                  </span>
                </div>
              </div> */}
            </div>

            <div className="mt-5">
              <h2 className="text-base font-semibold">Model configuration</h2>

              <FormField
                control={form.control}
                name="remark"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormLabel>Response format</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Text"
                        className="bg-white"
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        </Card>
      </div>
    </FormProvider>
  );
};
