import styled from "styled-components";

export const Items = styled.div`
  display: flex;
  row-gap: 1.6rem;
  flex-wrap: wrap;
`;

export const ItemsGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem 0;
`;

export const Item = styled.div`
  background: white;
  padding: 1rem;
  margin-right: 1.4rem;
  color: #c1c1c4;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 0.6rem;
    margin-right: 1rem;
  }
`;

export const ItemTitle = styled.p`
  font-size: 1.2rem;
  color: black;
  margin-right: 3rem;
  @media (max-width: 768px) {
    margin-right: 2rem;
  }
`;

export const ListDate = styled.p`
  font-size: 14px;
  margin-left: 10px;
`;

export const BackBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3vh 0 5vh 0;
  color: #f9a109;
  font-size: 18px;
  cursor: pointer;
  width: ${(props) => props.btnWidth};
  @media (max-width: 768px) {
    width: 30%;
    margin: 1vh 0 3vh 0;
  }
`;

export const Category = styled.p`
  font-size: ${(props) => props.size};
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

export const MainSection = styled.section`
  padding: 2rem 6rem;
  width: 68vw;
  min-height: 100vh;
  margin-left: 5vw;
  background: #fafafe;
  @media (max-width: 768px) {
    margin-left: 16vw;
    padding: 2rem 1.5rem;
    width: 84vw;
  }
`;

export const Button = styled.button`
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  font-size: 16px;
  border-radius: 12px;
  border: none;
  width: ${(props) => props.btnWidth};
  height: 60px;
  margin-right: 20px;
  cursor: pointer;
`;

// login & sign up related elements

export const NotificationBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
  display: ${(props) => props.displayNotification};
`;

export const PopUpWindow = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.popUpWidth};
  padding: 45px;
  background: white;
  border-radius: 24px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  z-index: 3;
  display: ${(props) => props.showPopUp};
  @media (max-width: 768px) {
    width: 86vw;
    padding: 30px 10px;
  }
`;

export const ClosePopUp = styled.div`
  position: absolute;
  right: 25px;
  top: 20px;
  color: #828282;
  font-size: 20px;
  cursor: pointer;
`;

export const PopUpTitle = styled.h3`
  font-size: 24px;
  color: #34333a;
  text-align: center;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    font-size: 20px;
    margin: 0 30px 25px 30px;
  }
`;

export const FormField = styled.div`
  width: 84%;
  margin: 5% 8%;
`;

export let FieldInput = styled.input.attrs((props) => ({
  type: props.type,
  placeholder: props.placeholder,
}))`
  height: 60px;
  width: 100%;
  border: 2px solid #bdbdbd;
  outline: none;
  padding: 1rem;
  font-size: 18px;
  background: #fafafe;
  transition: border-color 0.3s linear;
  &:focus {
    border: 2px solid #f9a109;
  }
`;

export const SignUpText = styled.p`
  font-size: 18px;
  color: #34333a;
  text-align: center;
  margin: 0 20px;
`;

export const SignUpLink = styled.b`
  margin-left: 8px;
  color: #56ccf2;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  height: 50px;
  width: 84%;
  margin: 6% 8% 4% 8%;
  border: none;
  background: #f9a109;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-align: center;
  text-transform: uppercase;
  cursor: ${(props) => (props.makeClickable ? "pointer" : "default")};
  opacity: ${(props) => (props.makeClickable ? "1" : "0.6")};
  transition: background 0.2s linear;
  &:hover {
    background: ${(props) => (props.makeClickable ? "#56ccf2;" : "#f9a109;")};
  }
`;

export const ErrorMessage = styled.p`
  color: #f44336;
  padding: 0 4px;
  margin: 10px 0;
  display: ${(props) => (props.showError ? "none;" : "block;")};
`;

export const NoPreviousLists = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 700;
`;
