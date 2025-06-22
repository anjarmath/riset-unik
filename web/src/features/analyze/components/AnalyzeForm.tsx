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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import { AnalyzeResponse } from "../dto";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import AverageSimilarityCard from "./AverageSimilarityCard";

const AnalyzeForm = () => {
  // Data
  const [analyzeResult, setAnalyzeResult] = React.useState<AnalyzeResponse>();

  const form = useForm<TopicSchemaType>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      topic: "",
    },
  });

  async function onSubmit(values: TopicSchemaType) {
    setAnalyzeResult(undefined);
    const { error, data } = await handleRequest<AnalyzeResponse>(
      "POST",
      "/analyze",
      values
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    setAnalyzeResult(data!);
  }

  return (
    <div className=" w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 w-full"
        >
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
            Judul-judul yang mungkin mirip punyamu (
            {analyzeResult.results.length} ditemukan):
          </h3>
          <div className=" space-y-2">
            {analyzeResult.results.map((paper, index) => (
              <Card key={index} className=" bg-white w-full">
                <CardContent className=" flex justify-between items-center gap-2">
                  <div>
                    <h2 className=" line-clamp-1">{paper.title}</h2>
                    <Link
                      href={paper.link}
                      className=" text-blue-500 underline text-sm line-clamp-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {paper.link}
                    </Link>
                  </div>
                  <div>
                    <p>{paper.similarity.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeForm;
