"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Quote {
  content: string;
  author: string;
}

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote({ content: data.content, author: data.author });
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
    const saved = JSON.parse(localStorage.getItem("savedQuotes") || "[]");
  }, []);

  const saveQuote = () => {
    if (quote) {
      const newSavedQuotes = [...savedQuotes, quote];
      setSavedQuotes(newSavedQuotes);
      localStorage.setItem("savedQuotes", JSON.stringify(newSavedQuotes));
    }
  };

  const viewQuote = (selectedQuote: Quote) => {
    setQuote(selectedQuote);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center mb-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : quote ? (
          <>
            <p className="text-2xl font-semibold mb-4 max-w-[60rem]">
              {quote.content}
            </p>
            <p className="text-xl italic text-white/50 uppercase tracking-tighter">
              - {quote.author}
            </p>
          </>
        ) : (
          <p>No quote available</p>
        )}
      </div>
      <div className="flex space-x-4 mb-8">
        <Button onClick={fetchQuote} disabled={isLoading}>
          {isLoading ? "Loading..." : "Generate New Quote"}
        </Button>
        <Button
          variant="outline"
          onClick={saveQuote}
          disabled={isLoading || !quote}
        >
          Save Quote
        </Button>
      </div>
      <div className="w-full max-w-4xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quote</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savedQuotes.map((savedQuote, index) => (
              <TableRow key={index}>
                <TableCell>{savedQuote.content}</TableCell>
                <TableCell>{savedQuote.author}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => viewQuote(savedQuote)}
                  >
                    View Quote
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
