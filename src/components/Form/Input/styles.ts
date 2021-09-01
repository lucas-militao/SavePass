import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from '@expo/vector-icons/Feather';
import theme from '../../../global/styles/theme';

interface LabelProps {
  color?: string;
}

export const Container = styled.View`
  margin-bottom: ${RFValue(17)}px;
`;

export const Label = styled.Text<LabelProps>`
  font-family: 'Rubik_400Regular';
  font-size: ${RFValue(15)}px;
  color: ${({ theme, color }) => !!color ? color : theme.colors.text};
  margin-bottom: 7px;
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 4px;
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: ${RFValue(13)}px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;

  background: ${({ theme }) => theme.colors.primary_light};
  border: 1px ${({ theme }) => theme.colors.shape};;
  padding: 0 20px;
  border-radius: 4px;
  height: ${RFValue(56)}px;
  width: 100%;
`;

export const FormInput = styled(TextInput)`
  color: ${({ theme }) => theme.colors.title};;
  font-size: ${(RFValue(15))}px;
  flex: 1;
  height: 100%;
`;

export const ToggleShowPassButton = styled.Pressable`
  margin-left: 20px;
`;

export const Icon = styled(Feather).attrs({
  size: 24,
  color: theme.colors.text,
})`
  opacity: 0.6;
`;