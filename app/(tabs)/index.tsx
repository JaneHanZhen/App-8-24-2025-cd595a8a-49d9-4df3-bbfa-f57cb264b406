import React from 'react';
import { StyleSheet, Text, View, Animated, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HelloWorldScreen() {
  // Animation setup
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  
  // Get window dimensions for responsive design
  const { width, height } = useWindowDimensions();
  
  React.useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.contentContainer}>
        <Animated.View 
          style={[
            styles.card, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }] 
            }
          ]}
        >
          <Text style={styles.hello}>Hello,</Text>
          <Text style={styles.world}>World!</Text>
          <Text style={styles.subtitle}>Welcome to my first React Native app</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 30,
    minWidth: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  hello: {
    fontSize: 32,
    fontWeight: '300',
    color: '#333',
    marginBottom: 4,
  },
  world: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4a6ee0',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
});