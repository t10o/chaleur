import { ContentLayout } from "@/components/layouts";
import { Home } from "@/features/home";

export default function HomePage() {
  return (
    <ContentLayout pageTitle="MyPage">
      <Home />
    </ContentLayout>
  );
}
