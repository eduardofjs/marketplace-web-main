import styled from "styled-components";

export const NotificationInfo = styled.div`
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 12px 20px 24px rgba(69, 79, 89, 0.08);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
`;

export const NotificationInfoTitle = styled.span`
  font-weight: 600;
`;

export const InfoWrapper = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 15px;
`;

export const InfoDesc = styled.span`
  color: #777777;
  margin-right: 4px;
`;

export const InfoValue = styled.span`
  margin-right: 4px;
`;

export const NotificationIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background-color: ${({ isFinished, notifOwner }) => {
    if (notifOwner == 0) {
      return isFinished ? "#256D48" : "#E5E5E5";
    } else {
      return isFinished ? "#277BC0 " : "#E5E5E5";
    }
  }};
  border-radius: 50%;
`;

export const NotificationSvg = styled.img`
  width: 30px;
  height: 30px;
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RightContainer = styled.div``;
