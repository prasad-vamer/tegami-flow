"use client";

import type React from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import {
  ArrowRight,
  Mail,
  Users,
  FileText,
  CheckCircle,
  BarChart2,
  Globe,
  Cloud,
  Layers,
  Zap,
} from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === "en" ? "ja" : "en";
    i18n.changeLanguage(newLang);
  };

  const currentLangName = i18n.language === "en" ? "English" : "日本語";

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
            <Mail className="h-5 w-5 text-gray-900" />
          </div>
          <span className="text-xl font-bold">HireFlow</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-100 flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            {currentLangName}
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 h-9">
            {t("landing.header.login")}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t("landing.hero.title")}
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            {t("landing.hero.subtitle")}
          </p>
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-6 h-auto shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50 group"
            onClick={() => navigate("/candidates")}
          >
            {t("landing.hero.cta")}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("landing.features.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <FeatureCard
            icon={<Users className="h-8 w-8 text-emerald-500" />}
            title={t("landing.features.candidateManagement.title")}
            description={t("landing.features.candidateManagement.description")}
          />

          {/* Feature 2 */}
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-emerald-500" />}
            title={t("landing.features.templateSystem.title")}
            description={t("landing.features.templateSystem.description")}
          />

          {/* Feature 3 */}
          <FeatureCard
            icon={<Mail className="h-8 w-8 text-emerald-500" />}
            title={t("landing.features.smartSending.title")}
            description={t("landing.features.smartSending.description")}
          />

          {/* Feature 4 */}
          <FeatureCard
            icon={<CheckCircle className="h-8 w-8 text-emerald-500" />}
            title={t("landing.features.strictMode.title")}
            description={t("landing.features.strictMode.description")}
          />

          {/* Feature 5 */}
          <FeatureCard
            icon={<BarChart2 className="h-8 w-8 text-emerald-500" />}
            title={t("landing.features.deliveryLogs.title")}
            description={t("landing.features.deliveryLogs.description")}
          />

          {/* Feature 6 */}
          <FeatureCard
            icon={<Globe className="h-8 w-8 text-emerald-500" />}
            title={t("landing.features.multilingual.title")}
            description={t("landing.features.multilingual.description")}
          />

          {/* Feature 7 */}
          <FeatureCard
            icon={<Cloud className="h-8 w-8 text-emerald-500" />}
            title={t("landing.features.awsIntegration.title")}
            description={t("landing.features.awsIntegration.description")}
          />

          {/* Feature 8 */}
          <FeatureCard
            icon={<Layers className="h-8 w-8 text-emerald-500" />}
            title={t("landing.features.atomicDesign.title")}
            description={t("landing.features.atomicDesign.description")}
          />

          {/* Feature 9 */}
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-emerald-500" />}
            title={t("landing.features.oneClickEmail.title")}
            description={t("landing.features.oneClickEmail.description")}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="bg-gray-800 rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-gray-700 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">{t("landing.cta.title")}</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {t("landing.cta.description")}
          </p>
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-6 h-auto shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50"
            onClick={() => navigate("/candidates")}
          >
            {t("landing.cta.button")}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto py-8 px-4 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <Mail className="h-4 w-4 text-gray-900" />
            </div>
            <span className="text-lg font-bold">HireFlow</span>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} HireFlow. {t("landing.footer.rights")}
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-emerald-500/50 transition-all hover:shadow-emerald-500/10 hover:shadow-lg">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl text-emerald-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-300 text-base">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
