import Header from "./Header";
import Footer from "./Footer";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages-components";
import { TemplateProps } from "@yext/pages";
import {
  Environment,
  HeadlessConfig,
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { initi18n } from "../i18n";

export interface PageLayoutProps {
  children?: React.ReactNode;
  data?: any;
  templateData: TemplateProps;
}

const PageLayout = ({ children, data, templateData }: PageLayoutProps) => {
  const locale = templateData.document.meta.locale;

  initi18n(locale);

  const searchConfig: HeadlessConfig = {
    apiKey: "e3377abbf6e20d714caa16c4c4eb7007",
    experienceKey: "calvins-coffee-search",
    locale,
    experienceVersion: "STAGING",
    environment: Environment.SANDBOX,
  };
  const searcher = provideHeadless(searchConfig);

  return (
    <>
      <SearchHeadlessProvider searcher={searcher}>
        <AnalyticsProvider templateData={templateData}>
          <div className="min-h-screen flex flex-col">
            <AnalyticsScopeProvider name="header">
              <Header data={data} />
            </AnalyticsScopeProvider>
            {children}
            <AnalyticsScopeProvider name="footer">
              <Footer />
            </AnalyticsScopeProvider>
          </div>
        </AnalyticsProvider>
      </SearchHeadlessProvider>
    </>
  );
};

export default PageLayout;
