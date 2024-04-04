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
import Translations from "../components/translations/translation";

const Superadmindashboard = () => {

  return (
    <section className="timings-and-pricing py-[30%] md:py-[7%]">
      <div className="container ">
        <Tabs size="md" variant="enclosed">
          <TabList>
            <Tab className="font-medium text-lg">Translations</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="container">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold mb-4">
                    <Translations TransKey="add-translations" />
                  </h2>
                </div>
              </div>
              <TransForm />
              <TranslationEditor />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </section>
  );
};

export default Superadmindashboard;
