"use client";
import React, {
  ComponentProps,
  FormEvent,
  PropsWithChildren,
  useState,
} from "react";
import Modal from "./Modal";
import { useProfileEditModalStore } from "@/zustand/profileEditModal.stroe";
import InputGroup from "../Inputs/InputGroup";
import Button from "../Button/Button";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import clientApi from "@/api/clientSide/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditProfileData } from "@/types/profiles.types";
import ProfileEditForm from "@/app/(provider)/(root)/(loggedInOnly)/profiles/_components/ProfileEditForm";

interface InitialErrMsgs {
  nickname: string | null;
}
const initialErrMsgs = {
  nickname: null,
};

function ProfileEditModal({ children }: PropsWithChildren) {
  const { isShowProfileEditModal, setIsShowProfileEditModal } =
    useProfileEditModalStore();

  const userId = useAuthStore((state) => state.currentUserId);

  // 모달 백드랍 클릭 시 모달 닫기
  const handleClickOutOfRange: ComponentProps<"div">["onClick"] = (e) => {
    if (e.target === e.currentTarget) {
      setIsShowProfileEditModal(false);
    }
  };

  return (
    <>
      {isShowProfileEditModal && (
        <Modal
          onClickFn={handleClickOutOfRange}
          className="flex items-center justify-center"
        >
          <div className="w-[550px] h-[650px] bg-white flex flex-col gap-y-8 justify-start items-center rounded-lg p-12">
            <h1 className="text-2xl font-bold">프로필 수정</h1>

            <ProfileEditForm />
          </div>
        </Modal>
      )}
      {children}
    </>
  );
}

export default ProfileEditModal;
