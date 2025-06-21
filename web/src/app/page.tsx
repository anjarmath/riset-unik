import { CardTitle } from "@/components/ui/card";
import AnalyzeForm from "@/features/analyze/components/AnalyzeForm";
import { AppIcon } from "@/lib/asset";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" w-full">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 items-center">
        <Image src={AppIcon} width={120} height={64} alt="logo" />

        <div className=" text-center space-y-2 mt-4">
          <CardTitle>Biar ide penelitianmu nggak pasaran.</CardTitle>

          <p className=" text-muted-foreground text-sm">
            Masukkan topik penelitianmu, dan kami bantu cek kemiripannya dengan
            judul-judul jurnal dari berbagai sumber terpercaya. Praktis, cepat,
            dan bikin kamu lebih pede buat majuin proposal!
          </p>
        </div>

        <AnalyzeForm />

        {/* Copyright section */}
        <p className=" text-muted-foreground text-sm">
          © 2025 Anjar from Algieba
        </p>
      </div>
    </div>
  );
}
