import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Animated,
  Platform,
  StatusBar as RNStatusBar,
  useWindowDimensions,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '../theme';

// Fake friends data
const fakeFriends = [
  {
    id: '1',
    name: 'Emma Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    phone: '(555) 123-4567',
    email: 'emma.j@example.com',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    phone: '(555) 234-5678',
    email: 'james.w@example.com',
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Sophia Martinez',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    phone: '(555) 345-6789',
    email: 'sophia.m@example.com',
    isFavorite: true,
  },
  {
    id: '4',
    name: 'Michael Brown',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    phone: '(555) 456-7890',
    email: 'michael.b@example.com',
    isFavorite: false,
  },
  {
    id: '5',
    name: 'Olivia Davis',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    phone: '(555) 567-8901',
    email: 'olivia.d@example.com',
    isFavorite: true,
  },
  {
    id: '6',
    name: 'William Taylor',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    phone: '(555) 678-9012',
    email: 'william.t@example.com',
    isFavorite: false,
  },
  {
    id: '7',
    name: 'Ava Anderson',
    avatar: 'https://randomuser.me/api/portraits/women/37.jpg',
    phone: '(555) 789-0123',
    email: 'ava.a@example.com',
    isFavorite: false,
  },
  {
    id: '8',
    name: 'Ethan Thomas',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    phone: '(555) 890-1234',
    email: 'ethan.t@example.com',
    isFavorite: true,
  },
  {
    id: '9',
    name: 'Isabella White',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    phone: '(555) 901-2345',
    email: 'isabella.w@example.com',
    isFavorite: false,
  },
  {
    id: '10',
    name: 'Alexander Clark',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    phone: '(555) 012-3456',
    email: 'alexander.c@example.com',
    isFavorite: true,
  },
];

// New friend data
const newFriend = {
  id: '11',
  name: 'Riley Morgan',
  avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  phone: '(555) 123-7890',
  email: 'riley.m@example.com',
  isFavorite: false,
};

export default function ContactsScreen() {
  const theme = getTheme();
  const [friends, setFriends] = useState(fakeFriends);
  const { width } = useWindowDimensions();
  
  // Function to toggle favorite status
  const handleToggleFavorite = (id) => {
    setFriends(friends.map(friend => 
      friend.id === id 
        ? {...friend, isFavorite: !friend.isFavorite} 
        : friend
    ));
  };

  // Function to add a new friend
  const handleAddFriend = () => {
    // Check if friend already exists in the list
    if (friends.some(friend => friend.id === newFriend.id)) {
      Alert.alert(
        "Friend Already Added",
        `${newFriend.name} is already in your contacts.`,
        [{ text: "OK" }]
      );
      return;
    }
    
    // Add the new friend with animation
    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    
    // Show success message
    Alert.alert(
      "Friend Added",
      `${newFriend.name} has been added to your contacts!`,
      [{ text: "Great!" }]
    );
  };

  // Filter options
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // Filtered friends based on filter option
  const filteredFriends = showFavoritesOnly 
    ? friends.filter(friend => friend.isFavorite)
    : friends;

  // Contact Item Component
  const ContactItem = ({ item, onToggleFavorite }) => {
    const scaleAnim = React.useRef(new Animated.Value(0.95)).current;
    
    React.useEffect(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View style={[
        styles.contactItem,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <TouchableOpacity style={[
          styles.contactCard,
          { backgroundColor: theme.cardBackground, shadowColor: theme.shadow }
        ]}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.avatar }} style={[
              styles.avatar,
              { borderColor: theme.divider }
            ]} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={[styles.contactName, { color: theme.textPrimary }]}>
              {item.name}
            </Text>
            <Text style={[styles.contactDetail, { color: theme.textSecondary }]}>
              {item.phone}
            </Text>
            <Text style={[styles.contactEmail, { color: theme.textTertiary }]}>
              {item.email}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => onToggleFavorite(item.id)}
          >
            <Ionicons 
              name={item.isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={item.isFavorite ? theme.favorite : theme.favoriteInactive} 
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={theme.statusBarStyle} />
      
      <View style={[styles.header, { borderBottomColor: theme.divider }]}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          My Contacts
        </Text>
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: theme.filterBackground }]}
          onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          <Ionicons 
            name={showFavoritesOnly ? "filter" : "filter-outline"} 
            size={24} 
            color={theme.primary} 
          />
          <Text style={[styles.filterText, { color: theme.primary }]}>
            {showFavoritesOnly ? "All" : "Favorites"}
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ContactItem 
            item={item} 
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <TouchableOpacity 
            style={[styles.addFriendButton, { backgroundColor: theme.primary }]}
            onPress={handleAddFriend}
          >
            <Ionicons name="person-add" size={24} color="white" />
            <Text style={styles.addFriendText}>Add Riley Morgan</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterText: {
    marginLeft: 6,
    fontWeight: '500',
  },
  list: {
    padding: 16,
    paddingBottom: 80, // Add extra padding at the bottom
  },
  contactItem: {
    marginBottom: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    marginRight: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 14,
  },
  favoriteButton: {
    padding: 8,
  },
  addFriendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addFriendText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  }
});