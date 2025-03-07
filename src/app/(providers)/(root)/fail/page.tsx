"use client";

import ButtonGroup from "@/components/Button/ButtonGroup";
import Container from "@/components/Container/Container";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FailPageProps {
  searchParams: {
    message: string;
    code: string;
  };
}

const ERROR_IMG =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/FailPayment.png";

export default function FailPage({
  searchParams: { message, code },
}: FailPageProps) {
  const router = useRouter();
  return (
    <Container isMain width="md" className="pt-10 flex flex-col items-center">
      <div className="flex flex-col items-center bg-white py-9 px-20 rounded-md gap-y-10 w-[800px] sm:w-[320px] sm:px-10">
        <div className="flex items-center gap-x-3 w-full justify-center">
          <Image
            width={200}
            height={200}
            className="w-10 sm:w-7"
            src={ERROR_IMG}
            alt="에러 이미지"
          />
          <h2 className="font-extrabold text-2xl text-center sm:text-xl">
            결제 실패
          </h2>
        </div>
        <div className="w-full flex flex-col gap-y-5 text-black sm:text-base">
          <div>
            <p className="font-bold">결제 실패 코드</p>
            <p className="sm:text-xs">{code}</p>
          </div>

          <div className="flex gap-x-10">
            <div>
              <p className="font-bold">결제 실패 메시지</p>
              <span className="sm:text-xs">{message}</span>
            </div>
          </div>

          <div>
            <p className="font-bold">결제 실패 일시</p>
            <p className="sm:text-xs">
              {dayjs().format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
          <ButtonGroup
            intent="none"
            value="이전화면으로 돌아가기"
            onClick={() => router.back()}
            className="ml-auto bg-[#ff4d4d42] text-[#E91313] font-bold"
          />
        </div>
      </div>
    </Container>
  );
}
