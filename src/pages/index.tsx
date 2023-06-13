import { ContentLayout } from "@/components/layouts";
import { Home } from "@/feature/home";

export default function HomePage() {
  return (
    <ContentLayout pageTitle="MyPage">
      <Home />
    </ContentLayout>
  );
}
