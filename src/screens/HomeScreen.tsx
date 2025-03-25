import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {showErrorToast} from '../components/Toast';
import BookingSkeleton from '../components/BookingSkeleton';
import colors from '../constants/colors';
import {Booking, SPORT_ICONS, generateBookings} from '../mocks/bookingMocks';

interface Section {
  title: string;
  data: Booking[];
}

const BookingItem = ({
  booking,
  isLastItem,
}: {
  booking: Booking;
  isLastItem: boolean;
}) => {
  const SportIcon = SPORT_ICONS[booking.sport];
  return (
    <View style={[styles.bookingItem, isLastItem && styles.lastBookingItem]}>
      <View style={styles.sportInfo}>
        <SportIcon width={24} height={24} color={colors.primary} />
        <Text style={styles.sportText}>{booking.sport}</Text>
      </View>
      <Text style={styles.timeText}>
        {format(booking.startDateTime, 'H:mm')} -{' '}
        {format(booking.endDateTime, 'H:mm')}
      </Text>
    </View>
  );
};

const HomeScreen = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const loadMoreBookings = () => {
    if (loading || error) return;

    setLoading(true);
    setError(false);

    // Simulate API call
    setTimeout(() => {
      try {
        const newBookings = generateBookings(page);
        const newSections: {[key: string]: Booking[]} = {};

        // Group bookings by date
        newBookings.forEach(booking => {
          const dateKey = format(booking.startDateTime, 'dd/MM/yyyy');
          if (!newSections[dateKey]) {
            newSections[dateKey] = [];
          }
          newSections[dateKey].push(booking);
        });

        // Convert to sections array
        const formattedSections = Object.entries(newSections).map(
          ([title, data]) => ({
            title,
            data,
          }),
        );

        setSections(prev => [...prev, ...formattedSections]);
        setPage(p => p + 1);
      } catch (err) {
        setError(true);
        showErrorToast('Failed to load bookings. Please try again.');
      } finally {
        setLoading(false);
        setIsInitialLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    loadMoreBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSectionHeader = ({section}: {section: Section}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  const renderItem = ({
    item,
    index,
    section,
  }: {
    item: Booking;
    index: number;
    section: Section;
  }) => (
    <BookingItem
      booking={item}
      isLastItem={index === section.data.length - 1}
    />
  );

  const renderSkeletonSection = () => (
    <View>
      <View style={styles.sectionHeader}>
        <View style={styles.skeletonHeader} />
      </View>
      {[1, 2, 3].map((_, index) => (
        <BookingSkeleton key={index} />
      ))}
    </View>
  );

  if (isInitialLoading) {
    return (
      <View style={styles.container}>
        {[1, 2, 3].map((_, index) => (
          <View key={index}>{renderSkeletonSection()}</View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        onEndReached={loadMoreBookings}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <View>
              {renderSkeletonSection()}
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  sectionHeader: {
    backgroundColor: colors.tertiary,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '600',
  },
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
  lastBookingItem: {
    marginBottom: 20,
  },
  sportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  timeText: {
    fontSize: 16,
    color: colors.gray666,
  },
  skeletonHeader: {
    width: 120,
    height: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
  },
});

export default HomeScreen;
