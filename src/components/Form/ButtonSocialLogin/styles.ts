import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(RectButton)`
  width: 100%;
  
  height: ${RFValue(56)}px;
  align-items: center;
  border-radius: 4px;

  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const ImageContainer = styled.View`
  height: 100%;
  
  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.colors.shape};
  border-right-width: 1px;
`;

export const Title = styled.Text`
  flex: 1;
  text-align: center;

  font-family: ${({ theme }) => theme.fonts.regular};
`;
