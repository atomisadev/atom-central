"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

interface QRCode {
  id: string;
  url: string;
  createdAt: string;
}

export function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrCodes, setQRCodes] = useState<QRCode[]>([]);

  useEffect(() => {
    const storedQRCodes = localStorage.getItem("qrCodes");
    if (storedQRCodes) {
      setQRCodes(JSON.parse(storedQRCodes));
    }
  });

  const generateQRCode = () => {
    if (url) {
      const newQRCode: QRCode = {
        id: Date.now().toString(),
        url,
        createdAt: new Date().toISOString(),
      };
      const updatedQRCodes = [...qrCodes, newQRCode];
      setQRCodes(updatedQRCodes);
      localStorage.setItem("qrCodes", JSON.stringify(updatedQRCodes));
      setUrl("");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          className="w-full max-w-md"
        />
        <Button onClick={generateQRCode}>Generate QR Code</Button>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qrCodes.map((qrCode) => (
              <TableRow key={qrCode.id}>
                <TableCell>{qrCode.url}</TableCell>
                <TableCell>
                  {new Date(qrCode.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View QR Code</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>QR Code for {qrCode.url}</DialogTitle>
                      </DialogHeader>
                      <div className="flex justify-center">
                        <QRCodeSVG value={qrCode.url} size={256} />
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
