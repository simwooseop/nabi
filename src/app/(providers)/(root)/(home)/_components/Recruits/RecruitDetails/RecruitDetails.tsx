"use client";

/* eslint-disable @next/next/no-img-element */
import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Image from "next/image";
import Link from "next/link";
import ApplyButtons from "../ApplyButtons/ApplyButtons";
import OthersButton from "../OtherButton/OthersButton";
import RecruitCount from "../RecruitCount/RecruitCount";
import useRecruitDetails from "./RecruitDetails.hooks";

const DEFAULT_PROFILE_IMG =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BigDefaultProfile.png?t=2024-10-17T21%3A23%3A00.314Z";
const LOCATION_ICON =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BlackIconList/Location.png?t=2024-10-28T07%3A42%3A51.571Z";
const VOLUNTEERING_DATE_ICON =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BlackIconList/VolunteeringDate.png";

interface RecruitDetailsProps {
  recruit: WithProfiles<Tables<"recruits">>;
}

function RecruitDetails({ recruit }: RecruitDetailsProps) {
  const {
    isAuthInitialized,
    createdAt,
    currentUser,
    approvedSponsors,
    approvedRecipients,
    isPassedDeadLineDate,
    remainDeadLineDate,
  } = useRecruitDetails(recruit);

  return (
    <section className="p-8 px-6">
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/profiles?userId=${recruit.authorId}`}
          className="flex items-center gap-x-2"
        >
          <Image
            width={300}
            height={300}
            src={recruit.userProfiles.profileImageUrl || DEFAULT_PROFILE_IMG}
            alt="profile image"
            className="w-12 rounded-full aspect-square object-cover border border-gray-100 sm:w-7"
          />
          <div className="flex flex-col">
            <span className="font-bold sm:text-[13px]">
              {recruit.userProfiles.nickname}
            </span>
            <span className="text-xs text-gray-700 sm:text-[10px]">
              {recruit.userProfiles.email}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-x-2">
          <span className="font-normal text-xs sm:text-[10px]">
            {createdAt}
          </span>
          <OthersButton
            authorId={recruit.authorId}
            recruitId={recruit.recruitId}
          />
        </div>
      </div>
      {isAuthInitialized &&
        currentUser &&
        recruit.authorId !== currentUser.userId && (
          <ApplyButtons recruit={recruit} user={currentUser!} />
        )}

      <article className="flex flex-col gap-y-3 mt-3">
        {/* 제목 */}
        <h2 className="font-bold text-lg sm:text-base">{recruit.title}</h2>

        {/* 내용 */}
        <p className="font-normal text-sm leading-6 sm:text-[13px]">
          {recruit.content}
        </p>

        {/* 장소, 일시 등 */}
        <section className="flex justify-between mt-3 ">
          <div className="flex gap-x-4 sm:gap-x-2 sm:grid sm:grid-cols-2">
            <div className="flex gap-x-2 items-center group relative sm:gap-x-1">
              <Image
                width={150}
                height={150}
                className="w-4 aspect-square sm:w-2"
                src={LOCATION_ICON}
                alt="location icon"
              />
              <span className="font-light text-xs sm:text-[9px]">
                {recruit.region}
              </span>
              <span className="whitespace-nowrap absolute top-6 left-3 font-normal text-xs invisible group-hover:visible">
                집합 장소
              </span>
            </div>
            <div className="flex gap-x-2 items-center group relative sm:gap-x-1">
              <Image
                width={200}
                height={200}
                className="w-4 aspect-square object-cover sm:w-2"
                src={VOLUNTEERING_DATE_ICON}
                alt="date icon"
              />
              <span className="font-light text-xs sm:text-[9px]">
                {dayjs(recruit.volunteeringDate)
                  .locale("ko")
                  .format("YYYY-MM-DD (ddd) HH:mm")}
              </span>
              <span className="whitespace-nowrap absolute top-6 left-1/3 font-normal text-xs invisible group-hover:visible">
                봉사활동 일시
              </span>
            </div>
            <RecruitCount recruit={recruit} />
            {!isPassedDeadLineDate &&
              ((currentUser?.role === "recipient" &&
                approvedRecipients &&
                recruit.maxRecipientRecruits > approvedRecipients?.length) ||
                (currentUser?.role === "sponsor" &&
                  approvedSponsors &&
                  recruit.maxSponsorRecruits > approvedSponsors?.length)) && (
                <span className="text-red-400 text-xs font-semibold sm:text-[9px]">
                  {remainDeadLineDate} 마감됩니다
                </span>
              )}
          </div>
        </section>
      </article>
    </section>
  );
}

export default RecruitDetails;
