export const setCurrentSection = (currentSection) => {
  return {
    type: "SET_CURRENT_SECTION",
    payload: currentSection,
  };
};

export const setCurrentMainSection = (currentSection) => {
  return {
    type: "SET_CURRENT_MAIN_SECTION",
    payload: currentSection,
  };
};
