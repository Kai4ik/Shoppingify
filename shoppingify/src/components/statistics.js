import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { MainSection, NoPreviousLists } from "./reusableElements";
import {
  countTotalItems,
  findRequiredProductIndex,
  populateAllHistoryLists,
} from "../helperFunctions/helperFunctions";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TopStatistics = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  @media (max-width: 768px) {
    margin-top: 1vh;
  }
`;

const TopRanges = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TopSection = styled.h3`
  font-size: 24px;
  width: 50%;
  display: flex;
  flex-direction: column;
  padding-right: 50px;
  @media (max-width: 768px) {
    width: 100%;
    padding-right: 10px;
    margin-bottom: 5vh;
  }
`;

const TopTitle = styled.p`
  margin-bottom: 3vh;
  @media (max-width: 768px) {
    margin-bottom: 1vh;
  }
`;

const ItemLabel = styled.label`
  margin: 2vh 0 0 0;
  font-size: 15px;
`;

const Range = styled.input.attrs((props) => ({
  type: "range",
  min: "0",
  max: "100",
}))`
  width: 100%;
  background-color: #e0e0e0;
  -webkit-appearance: none;
  border-radius: 4px;
  overflow: hidden;
  outline: none;
  margin-bottom: 2vh;
  &::-webkit-slider-thumb {
    width: 1px;
    -webkit-appearance: none;
    height: 6px;
    border-radius: 4px;
    background: ${(props) => props.rangeColor};
    box-shadow: -370px 0px 0 370px ${(props) => props.rangeColor};
  }
`;

const ItemSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Percentage = styled.p`
  font-size: 18px;
`;

const MonthlyChart = styled.div`
  margin: 8vh 0;
  @media (max-width: 768px) {
    margin: 2vh 0;
  }
`;

const MonthlySummary = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 6vh;
  @media (max-width: 768px) {
    margin-bottom: 4vh;
  }
`;

export default function Statistics() {
  const dispatch = useDispatch();
  const allLists = useSelector((state) => state.user.allUserLists);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const topCategories = [],
    topItems = [],
    totalCategoryRatioInPercentages = [],
    totalItemRatioInPercentages = [],
    lastSixMonthStatistics = [],
    data = [],
    width = window.innerWidth;
  const foundCategory = (product) =>
    topCategories.findIndex((element) => element.category === product.category);
  const foundMonth = (list) =>
    lastSixMonthStatistics.findIndex(
      (element) => element.month === monthNames[new Date(list.date).getMonth()]
    );

  useEffect(() => {
    populateAllHistoryLists(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  allLists.map((list) => {
    return list.listProducts.map((product) => {
      return foundCategory(product) === -1
        ? topCategories.push({
            category: product.category,
            numberOfItems: 1,
          })
        : topCategories[foundCategory(product)].numberOfItems++;
    });
  });

  allLists.map((list) => {
    return list.listProducts.map((product) => {
      return findRequiredProductIndex(topItems, product) === -1
        ? topItems.push({
            itemName: product.itemName,
            numberOfSales: 1,
          })
        : topItems[findRequiredProductIndex(topItems, product)].numberOfSales++;
    });
  });

  allLists.map((list) => {
    let totalItems = 0;
    list.listProducts.map((product) => {
      return (totalItems += product.itemAmount);
    });
    if (new Date(list.date).getFullYear() === new Date().getFullYear()) {
      return foundMonth(list) === -1
        ? lastSixMonthStatistics.push({
            month: monthNames[new Date(list.date).getMonth()],
            totalNumberOfItems: totalItems,
          })
        : (lastSixMonthStatistics[foundMonth(list)].totalNumberOfItems +=
            totalItems);
    }
  });

  monthNames
    .slice(
      new Date().getMonth() - (width > 768 ? 5 : 2),
      new Date().getMonth() + 1
    )
    .map((month) => {
      const checkMonth = () =>
        lastSixMonthStatistics.findIndex((element) => element.month === month);
      if (checkMonth() !== -1) {
        return data.push({
          name: lastSixMonthStatistics[checkMonth()].month,
          numberOfItems:
            lastSixMonthStatistics[checkMonth()].totalNumberOfItems,
          pv: 2400,
          amt: 2400,
        });
      } else {
        return data.push({
          name: month,
          numberOfItems: 0,
          pv: 2400,
          amt: 2400,
        });
      }
    });

  topCategories.map((element) => {
    return totalCategoryRatioInPercentages.push({
      category: element.category,
      percentage: (
        (element.numberOfItems * 100) /
        countTotalItems(topCategories)
      ).toFixed(2),
    });
  });

  topItems.map((element) => {
    return totalItemRatioInPercentages.push({
      itemName: element.itemName,
      percentage: (
        (element.numberOfSales * 100) /
        topItems.reduce(
          (accumulator, element) => accumulator + element.numberOfSales,
          0
        )
      ).toFixed(2),
    });
  });

  const sortDescendant = (a, b) => {
    return a.percentage < b.percentage
      ? 1
      : a.percentage > b.percentage
      ? -1
      : 0;
  };

  return (
    <MainSection>
      {allLists.length > 0 ? (
        <TopStatistics>
          <TopRanges>
            <TopSection>
              <TopTitle>Top Items</TopTitle>
              {totalItemRatioInPercentages
                .slice(0, 3)
                .sort(sortDescendant)
                .map((item) => (
                  <div key={`${item.itemName}ID`}>
                    <ItemSection>
                      <ItemLabel htmlFor={item.itemName}>
                        {item.itemName}
                      </ItemLabel>
                      <Percentage> {item.percentage} %</Percentage>
                    </ItemSection>
                    <Range
                      rangeColor="#f9a109"
                      name={item.itemName}
                      value={item.percentage}
                      readOnly
                    ></Range>
                  </div>
                ))}
            </TopSection>
            <TopSection>
              <TopTitle> Top Categories</TopTitle>
              {totalCategoryRatioInPercentages
                .slice(0, 3)
                .sort(sortDescendant)
                .map((item) => (
                  <div key={`${item.category}ID`}>
                    <ItemSection>
                      <ItemLabel htmlFor={item.category}>
                        {item.category}
                      </ItemLabel>
                      <Percentage> {item.percentage} %</Percentage>
                    </ItemSection>
                    <Range
                      rangeColor="#56CCF2"
                      name={item.category}
                      value={item.percentage}
                      readOnly
                    ></Range>
                  </div>
                ))}
            </TopSection>
          </TopRanges>
          <MonthlyChart>
            <MonthlySummary> Monthly Summary </MonthlySummary>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{ top: 5, right: 50, bottom: 0, left: -30 }}
              >
                <Line
                  type="monotone"
                  dataKey="numberOfItems"
                  stroke="#F9A109"
                />
                <CartesianGrid stroke="#E0E0E0" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </MonthlyChart>
        </TopStatistics>
      ) : (
        <NoPreviousLists>
          You do not have any previously saved lists!
        </NoPreviousLists>
      )}
    </MainSection>
  );
}
