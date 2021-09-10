import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { setCurrentMainSection } from "../actions/sectionActions";
import { changeListToShow } from "../actions/userActions";
import { ListDate } from "./reusableElements";
import { MainSection, NoPreviousLists } from "./reusableElements";
import { populateAllHistoryLists } from "../helperFunctions/helperFunctions";

const ListTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 5vh;
`;

const ListSection = styled.div`
  display: flex;
  align-items: center;
  padding: 1.6rem 3rem;
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  color: #c1c1c4;
  margin-bottom: 3vh;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 1.5rem;
    row-gap: 1rem;
  }
`;

const ListName = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: black;
  width: 60%;
`;

const DateSection = styled.div`
  display: flex;
  width: 20%;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const ListStatusAndDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20%;
  @media (max-width: 768px) {
    width: 60%;
  }
`;

const ListStatus = styled.div`
  width: 74%;
  text-align: center;
  font-size: 14px;
  border: 1.5px solid ${(props) => (props.status ? "#56ccf2" : "#EB5757")};
  border-radius: 8px;
  color: ${(props) => (props.status ? "#56ccf2" : "#EB5757")};
  padding: 2px 6px;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const ListDetails = styled.div`
  color: #f9a109;
  font-size: 20px;
  cursor: pointer;
`;

export default function UserHistory() {
  const dispatch = useDispatch();
  const allLists = useSelector((state) => state.user.allUserLists);

  useEffect(() => {
    populateAllHistoryLists(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showSpecificList = (listItem) => {
    dispatch(setCurrentMainSection("historyList"));
    const specificList = {
      listName: listItem.listName,
      date: listItem.date,
      status: listItem.status,
      listProducts: listItem.listProducts,
    };
    dispatch(changeListToShow(specificList));
  };

  return (
    <MainSection>
      {allLists.length > 0 ? (
        <>
          <ListTitle> Shopping History </ListTitle>
          {allLists.map((listItem, index) => (
            <ListSection key={`${listItem.listName}${index}ID`}>
              <ListName> {listItem.listName} </ListName>
              <DateSection>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <ListDate>
                  {format(new Date(listItem.date), "EE, yyyy-MM-dd")}
                </ListDate>
              </DateSection>
              <ListStatusAndDetails>
                <ListStatus status={listItem.status}>
                  {listItem.status ? "completed" : "cancelled"}
                </ListStatus>
                <ListDetails>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => showSpecificList(listItem)}
                  />
                </ListDetails>
              </ListStatusAndDetails>
            </ListSection>
          ))}
        </>
      ) : (
        <NoPreviousLists>
          You do not have any previously saved lists!
        </NoPreviousLists>
      )}
    </MainSection>
  );
}
