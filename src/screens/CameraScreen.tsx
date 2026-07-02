import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export default function CameraScreen() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Camera Permission Required</Text>

        <Pressable
          style={styles.button}
          onPress={async () => {
            const granted = await requestPermission();

            if (!granted) {
              Linking.openSettings();
            }
          }}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.title}>Initializing Camera...</Text>
      </View>
    );
  }

  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },

  button: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#222',
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
