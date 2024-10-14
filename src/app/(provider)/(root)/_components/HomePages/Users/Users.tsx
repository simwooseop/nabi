"use client";

import clientApi from "@/api/clientSide/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import Recipients from "./Recipients/Recipients";
import Sponsors from "./Sponsors/Sponsors";

interface UsersProps {
  page: string;
}

function Users({ page = "1" }: UsersProps) {
  const userId = useAuthStore((state) => state.currentUserId);

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["userProfiles", { userId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(userId!),
  });

  if (isLoading || !userProfile) return <span>데이터를 불러오는 중</span>;
  return (
    <article className="bg-white h-80 px-4 pt-5 gap-y-3 flex flex-col justify-between rounded-lg">
      {userProfile!.role === "recipient" ? (
        <Sponsors />
      ) : (
        <Recipients page={+page} />
      )}
    </article>
  );
}

export default Users;
