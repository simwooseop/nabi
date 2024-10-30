import serverApi from "@/api/serverSide/api";
import Container from "@/components/Container/Container";
import ApplyUsers from "./_components/Main/ApplyUsers";
import AppliesSidebar from "./_components/Side/AppliesSidebar";
import OtherApplyInfos from "./_components/Side/OtherApplyInfos";

interface RecruitAppliesPageProps {
  params: {
    recruitId: string;
  };
}

async function RecruitAppliesPage({
  params: { recruitId },
}: RecruitAppliesPageProps) {
  const promiseRecruitData =
    serverApi.recruits.getRecruitByRecruitId(recruitId);
  const promisePendingSponsorApplies =
    serverApi.sponsorMeets.getPendingSponsorAppliesWithProfileByRecruitId(
      recruitId
    );
  const promiseApprovedSponsorApplies =
    serverApi.sponsorMeets.getApprovedSponsorAppliesWithProfileByRecruitId(
      recruitId
    );
  const promiseRejectedSponsorApplies =
    serverApi.sponsorMeets.getRejectedSponsorAppliesWithProfileByRecruitId(
      recruitId
    );
  const promisePendingRecipientApplies =
    serverApi.recipinetMeets.getPendingRecipientAppliesWithProfileByRecruitId(
      recruitId
    );
  const promiseApprovedRecipientApplies =
    serverApi.recipinetMeets.getApprovedRecipientAppliesWithProfileByRecruitId(
      recruitId
    );
  const promiseRejectedRecipientApplies =
    serverApi.recipinetMeets.getRejectedRecipientAppliesWithProfileByRecruitId(
      recruitId
    );

  const [
    recruitData,
    pendingSponsorApplies,
    approvedSponsorApplies,
    rejectedSponsorApplies,
    pendingRecipientApplies,
    approvedRecipientApplies,
    rejectedRecipientApplies,
  ] = await Promise.all([
    promiseRecruitData,
    promisePendingSponsorApplies,
    promiseApprovedSponsorApplies,
    promiseRejectedSponsorApplies,
    promisePendingRecipientApplies,
    promiseApprovedRecipientApplies,
    promiseRejectedRecipientApplies,
  ]);

  const otherApplyInfoList = [
    {
      title: "승인된 후원자 목록",
      applies: approvedSponsorApplies,
    },
    {
      title: "거절된 후원자 목록",
      applies: rejectedSponsorApplies,
    },
    {
      title: "승인된 후원아동 목록",
      applies: approvedRecipientApplies,
    },
    {
      title: "거절된 후원아동 목록",
      applies: rejectedRecipientApplies,
    },
  ];

  return (
    <Container
      width="lg"
      className="grid grid-cols-5 gap-x-5 py-5 sm:grid-cols-1 sm:gap-y-3 sm:gap-x-0"
    >
      <div className="col-span-1">
        <AppliesSidebar recruitData={recruitData!} />
      </div>
      <div className="w-full col-span-3">
        <ApplyUsers
          initialPendingRecipientApplies={pendingRecipientApplies!}
          initialPendingSponsorApplies={pendingSponsorApplies!}
          recruitData={recruitData!}
        />
      </div>
      <div className="col-span-1">
        <OtherApplyInfos
          recruitId={recruitData!.recruitId}
          otherApplyInfoList={otherApplyInfoList}
        />
      </div>
    </Container>
  );
}

export default RecruitAppliesPage;
