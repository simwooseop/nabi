import HeaderNavigationLink from "./HeaderNavigationLink";

function Navigation() {
  return (
    <nav className="flex items-center gap-x-5 md:text-sm">
      <HeaderNavigationLink href="/funds" label="후원기금 모금하기" />
      <HeaderNavigationLink href="/funds/report" label="후원 리포트" />
      <HeaderNavigationLink href="/free-meals/map" label="아동급식카드 지도" />
    </nav>
  );
}

export default Navigation;
