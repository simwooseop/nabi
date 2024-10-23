import DonationChart from "@/components/Chart/DonationChart";
import ExpenseChart from "@/components/Chart/ExpenseChart";
import IncomeChart from "@/components/Chart/IncomeChart";
import Container from "@/components/Container/Container";

function FundPage() {
  return (
    <Container className="grid grid-cols-2 gap-x-56">
      <IncomeChart />
      <ExpenseChart />
      <DonationChart />
    </Container>
  );
}

export default FundPage;
