import { BorderlessButton } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";

import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  padding: 16px;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const LogoContainer = styled.View`
  margin-bottom: 50px;
`;

export const Form = styled.View`

  align-content: center;

  width: 100%;

  margin-bottom: 64px;
`;

export const RegisterButtonContainer = styled(BorderlessButton)`
  align-items: center;

  margin: 16px 0;
`;

export const Title = styled.Text`
  
  
  color: ${({ theme }) => theme.colors.primary};
`;

export const SocialLoginButtonContainer = styled.View``;