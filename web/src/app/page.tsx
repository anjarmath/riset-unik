import { ModeToggle } from "@/components/mode-toggle";
import { CardTitle } from "@/components/ui/card";
import AnalyzeForm from "@/features/analyze/components/AnalyzeForm";
import { AppIcon } from "@/lib/asset";
import { GitBranch } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" w-full">
      <div className="flex gap-2 items-center bg-primary-foreground justify-center py-4">
        <Image src={AppIcon} width={150} height={80} alt="logo" />
        <ModeToggle />
      </div>

      <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 items-center">
        <div className=" text-center space-y-2 mt-4">
          <CardTitle className=" text-lg">
            Biar ide penelitianmu nggak pasaran.
          </CardTitle>

          <p className=" text-muted-foreground text-sm">
            Coba jelasin ide penelitianmu, dan kami bantu cek kemiripannya
            dengan judul-judul jurnal dari berbagai sumber terpercaya. Praktis,
            cepat, dan bikin kamu lebih pede buat majuin proposal!
          </p>
        </div>

        <AnalyzeForm />

        {/* Copyright section */}
        <p className=" text-muted-foreground text-sm flex gap-2">
          Created with ❤ by Anjar |{" "}
          <a
            href="https://github.com/anjarmath/riset-unik"
            className=" flex items-center gap-2 "
          >
            <GitBranch size="16" /> Go to repository
          </a>
        </p>
      </div>
    </div>
  );
}
