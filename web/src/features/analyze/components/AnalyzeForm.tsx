"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { topicSchema, TopicSchemaType } from "../schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import { AnalyzeResponse } from "../dto";
import AverageSimilarityCard from "./AverageSimilarityCard";
import PaperCard from "./PaperCard";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AnalyzeForm = () => {
  const [mode, setMode] = React.useState<"normal" | "yapping">("normal");
  const [analyzeResult, setAnalyzeResult] = React.useState<AnalyzeResponse>();

  const form = useForm<TopicSchemaType>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      topic: "",
    },
  });

  const onSubmit = async (data: TopicSchemaType) => {
    setAnalyzeResult(undefined);

    const endpoint = mode === "normal" ? "/analyze-topic" : "/analyze-yapping";
    const { error, data: response } = await handleRequest<AnalyzeResponse>(
      "POST",
      endpoint,
      data
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    setAnalyzeResult(response!);
  };

  return (
    <div className=" w-full space-y-3">
      <div className=" flex items-center gap-2">
        <span className=" text-sm">Pilih mode yang kamu suka</span>
        <Select
          onValueChange={(value) => {
            setMode(value as "normal" | "yapping");
            form.reset();
          }}
          defaultValue="normal"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">😇 Masukkin Topik</SelectItem>
            <SelectItem value="yapping">🗣️ Yapping</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          {mode === "normal" && (
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Masukkin ide topik penelitianmu"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {mode === "yapping" && (
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Jelasin ide penelitianmu dengan detail"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" disabled={form.formState.isSubmitting}>
            <Search />
            Cek Keunikan
          </Button>
        </form>
      </Form>

      {form.formState.isSubmitting && (
        <div className=" mt-4 flex flex-col gap-2 items-center">
          <p>Menjalankan analisa...</p>
          <Loader2 className=" animate-spin" />
        </div>
      )}

      {analyzeResult && !form.formState.isSubmitting && (
        <div className="mt-4">
          <AverageSimilarityCard
            avgSimilarity={analyzeResult.average_similarity}
          />

          <h3 className=" mt-4 py-3">
            Ditemukan{" "}
            <span className=" font-bold text-green-600 border border-green-600 p-1 rounded-full bg-green-50">
              {analyzeResult.results.length}
            </span>{" "}
            judul yang mirip punyamu:
          </h3>
          <div className=" space-y-2">
            {analyzeResult.results.map((paper, index) => (
              <PaperCard key={index} paper={paper} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeForm;
