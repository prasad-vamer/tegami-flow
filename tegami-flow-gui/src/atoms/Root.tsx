import { Outlet, useNavigate } from "react-router-dom";
import { LanguageSwitcher } from "src/molecules/language-switcher";
import { useTranslation } from "react-i18next";
import { MainNavigation } from "src/molecules/main-navigation";

export default function Root() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-b from-[#282829] to-[#54555c] text-white shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src="/icon-only.png" alt="Logo" className="w-12 mr-2" />
            <h1 className="text-xl font-bold">{t("serviceName")}</h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <MainNavigation />

      <main className="pt-4 px-4">
        <Outlet />
      </main>
    </div>
  );
}
