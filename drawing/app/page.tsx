"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useEffect, useRef, useState } from "react";

interface DrawAction {
  type: "draw" | "clear";
  data?: ImageData;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [brushSize, setBrushSize] = useState(2);
  const [undoStack, setUndoStack] = useState<DrawAction[]>([]);
  const [redoStack, setRedoStack] = useState<DrawAction[]>([]);
  let isDrawing = false;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const startDrawing = (e: MouseEvent) => {
      isDrawing = true;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setUndoStack((prev) => [...prev, { type: "draw", data: imageData }]);
      setRedoStack([]);
      draw(e);
    };

    const stopDrawing = () => {
      isDrawing = false;
      ctx.beginPath();
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [brushSize]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setUndoStack((prev) => [...prev, { type: "clear", data: imageData }]);
      setRedoStack([]);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const lastAction = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, lastAction]);

    if (lastAction.type === "clear") {
      ctx.putImageData(lastAction.data!, 0, 0);
    } else {
      const prevAction = undoStack[undoStack.length - 2];
      if (prevAction && prevAction.data) {
        ctx.putImageData(prevAction.data, 0, 0);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const nextAction = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, nextAction]);

    if (nextAction.type === "clear") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else if (nextAction.data) {
      ctx.putImageData(nextAction.data, 0, 0);
    }
  };

  return (
    <main className="relative w-screen h-screen">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full bg-gray-100"
      />
      <div className="absolute top-4 left-4 space-x-2">
        <Button onClick={clearCanvas}>Clear Canvas</Button>
        <Button onClick={undo} disabled={undoStack.length === 0}>
          Undo
        </Button>
        <Button onClick={redo} disabled={redoStack.length === 0}>
          Redo
        </Button>
      </div>
      <div className="absolute bottom-4 left-4 w-64">
        <Slider
          defaultValue={[brushSize]}
          max={20}
          step={1}
          onValueChange={(value) => setBrushSize(value[0])}
        />
        <p className="mt-2 text-sm">Brush Size: {brushSize}</p>
      </div>
    </main>
  );
}
