"use client"
import { userAtom } from "@/recoil/auth.atom";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function Home() {
  const [user, setUser] = useRecoilState(userAtom);

  console.log(user);
  useEffect(() => {
    setUser({
      id: "123",
      email: "test@test.com",
    });
  }, [setUser]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
    </div>
  );
}
