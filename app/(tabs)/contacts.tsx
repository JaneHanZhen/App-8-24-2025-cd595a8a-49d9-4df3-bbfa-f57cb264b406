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
  useWindowDimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

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
      <TouchableOpacity style={styles.contactCard}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactDetail}>{item.phone}</Text>
          <Text style={styles.contactEmail}>{item.email}</Text>
        </View>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => onToggleFavorite(item.id)}
        >
          <Ionicons 
            name={item.isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={item.isFavorite ? "#ff4a6e" : "#ccc"} 
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function ContactsScreen() {
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

  // Filter options
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // Filtered friends based on filter option
  const filteredFriends = showFavoritesOnly 
    ? friends.filter(friend => friend.isFavorite)
    : friends;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>My Contacts</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          <Ionicons 
            name={showFavoritesOnly ? "filter" : "filter-outline"} 
            size={24} 
            color="#4a6ee0" 
          />
          <Text style={styles.filterText}>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6edff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterText: {
    marginLeft: 6,
    color: '#4a6ee0',
    fontWeight: '500',
  },
  list: {
    padding: 16,
  },
  contactItem: {
    marginBottom: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
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
    borderColor: '#f0f0f0',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 14,
    color: '#888',
  },
  favoriteButton: {
    padding: 8,
  },
});