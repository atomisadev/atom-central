"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [cardNumber, setCardNumber] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const validateCreditCard = (number: string) => {
    // this algo took me forever to understand and even more forever to implement :skull:
    let sum = 0;
    let isEven = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsValid(validateCreditCard(cardNumber.replace(/\s/g, "")));
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Credit Card Validator
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={cardNumber}
              onChange={handleChange}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              className="w-full font-mono text-center"
            />
            <Button type="submit" className="w-full">
              Validate
            </Button>
          </form>
          {isValid !== null && (
            <p
              className={`mt-4 text-center ${
                isValid ? "text-green-600" : "text-red-600"
              }`}
            >
              {isValid
                ? "Valid credit card number"
                : "Invalid credit card number"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
