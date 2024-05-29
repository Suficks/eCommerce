import React from 'react';
import { Navigate, useRouteLoaderData } from 'react-router-dom';
import { Customer } from '@commercetools/platform-sdk';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import classNames from 'classnames';
import { Header } from '@/widgets/Header/Header';
import cls from './ProfilePage.module.scss';
import { Footer } from '@/widgets/Footer/Footer';
import { PersonalDataSection } from '@/pages/ProfilePage/ui/PersonalDataSection/PersonalDataSection';
import { isLogged } from '@/shared/util/isLogged';
import { PageIDs } from '@/app/providers/RouterConfig/RouteConfig';

export const ProfilePage = () => {
  const client = useRouteLoaderData(PageIDs.PROFILE) as Customer;
  const isDataLoaded = !!client;
  if (!isLogged()) {
    return <Navigate to="/main" replace />;
  }
  const PersonalData = {
    username: client.firstName ?? '',
    surname: client.lastName ?? '',
    email: client.email ?? '',
    password: client.password ?? '',
    birthdate: client.dateOfBirth ?? '',
  };
  return (
    isDataLoaded && (
      <div className={cls.wrapper}>
        <Header />
        <main className={cls.mainBlock}>
          <Tabs forceRenderTabPanel className={cls.reactTabs}>
            <TabList className={classNames(cls.tabList)}>
              <Tab
                className={cls.tab}
                disabledClassName={classNames(cls.tab__disabled)}
                selectedClassName={classNames(cls.tab__selected)}
              >
                Personal info
              </Tab>
              <Tab
                className={cls.tab}
                disabledClassName={classNames(cls.tab__disabled)}
                selectedClassName={classNames(cls.tab__selected)}
              >
                Shipping Info
              </Tab>
              <Tab
                className={cls.tab}
                disabledClassName={classNames(cls.tab__disabled)}
                selectedClassName={classNames(cls.tab__selected)}
              >
                Billing Info
              </Tab>
            </TabList>

            <TabPanel>
              <PersonalDataSection user={PersonalData} />
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel
              className={cls.tabPanel}
              selectedClassName={cls.tabPanel__selected}
            >
              <h2>Any content 3</h2>
            </TabPanel>
          </Tabs>
        </main>
        <Footer />
      </div>
    )
  );
};
