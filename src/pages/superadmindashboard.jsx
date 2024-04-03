import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import TransForm from "../components/translations/translationsForm";
import TranslationEditor from "../components/translations/editTranslations";
import { t } from "i18next";

const Superadmindashboard = () => {

  return (
    <section className="timings-and-pricing py-[30%] md:py-[7%]">
      <div className="container ">
        <Tabs size="md" variant="enclosed">
          <TabList>
            <Tab className="font-medium text-lg"> {t("tab.Translations")} </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            <div className="text-3xl font-semibold mb-4 text-center">{t("superadmin.title")}</div>
              <TransForm/>
              <TranslationEditor/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </section>
  );
};

export default Superadmindashboard;
