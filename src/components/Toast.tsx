import React from 'react';
import {StyleSheet} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import colors from '../constants/colors';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.toastSuccessStyle}
      contentContainerStyle={styles.toastSuccessContainer}
      text1Style={styles.toastSuccessText}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={styles.toastErrorStyle}
      contentContainerStyle={styles.toastErrorContainer}
      text1Style={styles.toastErrorText}
    />
  ),
};

export const showErrorToast = (message: string) => {
  Toast.show({
    type: 'error',
    text1: message,
    position: 'top',
    visibilityTime: 3000,
  });
};

const styles = StyleSheet.create({
  toastSuccessContainer: {
    paddingHorizontal: 15,
  },
  toastSuccessStyle: {
    borderLeftColor: colors.primary,
  },
  toastSuccessText: {
    fontSize: 15,
    fontWeight: '400',
  },
  toastErrorContainer: {
    paddingHorizontal: 15,
  },
  toastErrorStyle: {
    borderLeftColor: colors.error,
    backgroundColor: colors.secondary,
  },
  toastErrorText: {
    fontSize: 15,
    fontWeight: '400',
  },
});
