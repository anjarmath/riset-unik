import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type SimilarityType = {
  title: "🔍 Terlalu Unik" | "🌟 Unik" | "✅ Aman" | "⚠️ Terlalu Mirip";
  message: string;
};

type SimilarityStats = {
  avgSimilarity: number;
  color: string;
  type: SimilarityType;
};

function identifySimilarity(avgSimilarity: number): SimilarityStats {
  if (avgSimilarity < 0.4) {
    return {
      avgSimilarity: avgSimilarity,
      color: "#3B82F6",
      type: {
        title: "🔍 Terlalu Unik",
        message:
          "Ini bisa jadi kekuatan… atau tantangan besar. Pastikan kamu punya cukup literatur pendukung sebelum lanjut, ya!",
      },
    };
  } else if (avgSimilarity < 0.6) {
    return {
      avgSimilarity: avgSimilarity,
      color: "#FBBF24",
      type: {
        title: "🌟 Unik",
        message:
          "Ini pertanda bagus — masih bisa dikembangkan, tapi tetap pastikan ada dasar teori dan referensi yang kuat biar gak terlalu liar.",
      },
    };
  } else if (avgSimilarity < 0.8) {
    return {
      avgSimilarity: avgSimilarity,
      color: "#10B981",
      type: {
        title: "✅ Aman",
        message:
          "Cukup unik untuk dianggap orisinal, dan masih punya banyak referensi pendukung. Cocok buat proposal yang solid.",
      },
    };
  } else {
    return {
      avgSimilarity: avgSimilarity,
      color: "#EF4444",
      type: {
        title: "⚠️ Terlalu Mirip",
        message:
          "Mungkin perlu kamu modifikasi sedikit — tambahkan sudut pandang baru, lokasi berbeda, atau metode lain supaya tetap dianggap fresh.",
      },
    };
  }
}

const AverageSimilarityCard = ({
  avgSimilarity,
}: {
  avgSimilarity: number;
}) => {
  const sim = identifySimilarity(avgSimilarity);
  return (
    <Card className="w-full">
      <CardContent className=" flex gap-3 items-center">
        <div>
          <p className=" text-sm text-muted-foreground">Kemiripan:</p>
          <p className="text-4xl font-bold" style={{ color: sim.color }}>
            {(avgSimilarity * 100).toFixed(1)}%
          </p>
        </div>

        {/* Vertical separator */}
        <div className=" w-0.5 bg-slate-200" />

        <div>
          <p className="text-lg font-bold">{sim.type.title}</p>
          <p className=" text-sm text-muted-foreground mt-2">
            {sim.type.message}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AverageSimilarityCard;
