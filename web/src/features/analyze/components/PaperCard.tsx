import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { PaperResult } from "../dto";

const PaperCard = ({ paper }: { paper: PaperResult }) => {
  return (
    <Card className=" bg-white w-full">
      <CardContent className=" flex justify-between items-center gap-2">
        <div className=" w-full overflow-hidden">
          <h2 className=" line-clamp-2">{paper.title}</h2>
          <Link
            href={paper.link}
            className=" text-blue-500 underline text-sm line-clamp-1 truncate"
            target="_blank"
            rel="noopener noreferrer"
          >
            {paper.link}
          </Link>
        </div>
        <div className=" bg-green-100 aspect-square flex items-center p-2 rounded-lg ">
          <p>{(paper.similarity * 100).toPrecision(2)}%</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaperCard;
