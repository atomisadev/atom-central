"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export const PasswordValidator = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState<"weak" | "medium" | "strong">(
    "weak"
  );
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const validatePassword = (password: string) => {
    const suggestions: string[] = [];

    if (password.length < 8) {
      suggestions.push("Password should be at least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      suggestions.push("Password should contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      suggestions.push("Password should contain at least one lowercase letter");
    }

    if (!/\d/.test(password)) {
      suggestions.push("Password should contain at least one digit");
    }

    if (!/[!@#$%^&*]/.test(password)) {
      suggestions.push(
        "Password should contain at least one special character (!@#$%^&*)"
      );
    }

    let strength: "weak" | "medium" | "strong" = "weak";
    if (password.length >= 8) {
      strength = "medium";
    }
    if (
      password.length >= 12 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password)
    ) {
      strength = "strong";
    }

    setStrength(strength);
    setSuggestions(suggestions);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
        />
        <div>
          <p className="text-sm font-medium">
            Password Strength:{" "}
            <span
              className={cn("font-bold", {
                "text-red-500": strength === "weak",
                "text-yellow-500": strength === "medium",
                "text-green-500": strength === "strong",
              })}
            >
              {strength}
            </span>
          </p>
          {suggestions.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm text-gray-500">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
