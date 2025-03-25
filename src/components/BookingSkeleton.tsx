import React, {useEffect} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import colors from '../constants/colors';

const BookingSkeleton = () => {
  const opacity = new Animated.Value(0.3);

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    pulse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.bookingItem}>
      <View style={styles.sportInfo}>
        <Animated.View style={[styles.skeletonIcon, {opacity}]} />
        <Animated.View style={[styles.skeletonText, {opacity}]} />
      </View>
      <Animated.View style={[styles.skeletonTime, {opacity}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  bookingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  sportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skeletonIcon: {
    width: 24,
    height: 24,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
  },
  skeletonText: {
    width: 80,
    height: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    marginLeft: 12,
  },
  skeletonTime: {
    width: 100,
    height: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
  },
});

export default BookingSkeleton;
