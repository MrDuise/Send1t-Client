import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


const SearchResults = ({ results, navigation }) => {
  return (
    <View style={styles.container}>
      {results.map((result, index) => (
        result === "0 results" ? (
          <Text key={index}>{result}</Text>
        ) : (
          <Pressable
            key={index}
            onPress={() => navigation.navigate('Details', { result })}
          >
            <Text>{result.userName}</Text>
          </Pressable>
        )
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 60, // adjust this value to position the search results below the header
    left: 0,
    right: 0,
    zIndex: 2, // set a higher z-index value than the main content to display the search results above it
    elevation: 2, // needed for Android devices to show the shadow
    padding: 10,
  },
});

export default SearchResults;