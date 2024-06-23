import { PasswordValidator } from "@/components/password-validator";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-[20rem]">
          <h1 className="text-3xl font-semibold tracking-tighter mb-5">
            Password Validator
          </h1>
          <PasswordValidator />
        </div>
      </div>
    </>
  );
}
