/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const imageSize = 3000;

function App(): React.JSX.Element {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showImage, setShowImage] = useState(false);

  const handlePlaceholderImage = async () => {
    const { edges } = await CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
    });

    setImageUri(edges[0].node.image.uri);
    setShowImage(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePlaceholderImage}>
          <Text style={styles.buttonText}>Load image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowImage(true)}>
          <Text style={styles.buttonText}>Show Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowImage(false)}>
          <Text style={styles.buttonText}>Hide Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {global.gc();}}>
          <Text style={styles.buttonText}>Trigger GC</Text>
        </TouchableOpacity>
      </View>

      {showImage && imageUri && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: imageSize,
    height: imageSize,
    zIndex: -1,
  },
});

export default App;
