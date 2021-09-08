import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const Navigation = lazy(() => import("./components/navigationBar"));
const ItemsList = lazy(() => import("./components/itemsList"));
const ShoppingList = lazy(() => import("./components/shoppingList"));
const UserHistory = lazy(() => import("./components/history"));
const ItemDetails = lazy(() => import("./components/itemDetails"));
const HistoryList = lazy(() => import("./components/historyList"));
const Statistics = lazy(() => import("./components/statistics"));
const AddItem = lazy(() => import("./components/addNewItem"));

const Layout = styled.div`
  display: flex;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #34333a;
  font-size: 30px;
  font-weight: 700;
  background: #fafafe;
`;

function App() {
  const width = window.innerWidth;
  const currentSection = useSelector((state) => state.section.currentSection);
  const currentMainSection = useSelector(
    (state) => state.section.currentMainSection
  );

  return (
    <div className="App">
      <Suspense fallback={<Loading>Loading ...</Loading>}>
        <Layout>
          <Navigation></Navigation>
          {currentMainSection === "itemsList" ? (
            <ItemsList></ItemsList>
          ) : currentMainSection === "historyList" ? (
            <HistoryList></HistoryList>
          ) : currentMainSection === "statistics" ? (
            <Statistics></Statistics>
          ) : currentMainSection === "shoppingList" ? (
            <ShoppingList></ShoppingList>
          ) : currentMainSection === "details" ? (
            <ItemDetails></ItemDetails>
          ) : currentMainSection === "addItemSection" ? (
            <AddItem></AddItem>
          ) : (
            <UserHistory></UserHistory>
          )}
          {width > 768 ? (
            currentSection === "shoppingList" ? (
              <ShoppingList></ShoppingList>
            ) : currentSection === "details" ? (
              <ItemDetails></ItemDetails>
            ) : (
              <AddItem></AddItem>
            )
          ) : null}
        </Layout>
      </Suspense>
    </div>
  );
}

export default App;
