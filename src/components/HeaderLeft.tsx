import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import ArrowSVG from '../assets/svg/Arrow';

const HeaderLeft = ({onPress}: {onPress: () => void}) => (
  <TouchableOpacity style={styles.headerLeft} onPress={onPress}>
    <ArrowSVG />
    <Text style={styles.headerTitle}>Home</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    lineHeight: 26,
  },
});

export default HeaderLeft;
