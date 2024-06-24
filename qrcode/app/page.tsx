import Image from "next/image";
import { QRCodeGenerator } from "@/components/qrcode";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">QR Code Generator</h1>
      <QRCodeGenerator />
    </main>
  );
}
