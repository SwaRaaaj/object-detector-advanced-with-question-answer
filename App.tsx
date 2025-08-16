import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import {DetectedObject} from './src/types';

import CameraView from './src/components/CameraView';
import QuestionInput from './src/components/QuestionInput';
import DetectedObjectsList from './src/components/DetectedObjectsList';

const App: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'This app needs camera access to detect objects.',
          [{text: 'OK'}],
        );
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  const handleObjectsDetected = (objects: DetectedObject[]) => {
    setDetectedObjects(objects);
  };

  const handleQuestionSubmit = async (question: string) => {
    if (detectedObjects.length === 0) {
      Alert.alert('No Objects Detected', 'Please wait for objects to be detected before asking questions.');
      return;
    }

    setIsProcessing(true);
    try {
      // This will be implemented in the QuestionInput component
      // The question and detectedObjects will be sent to Gemini API
    } catch (error) {
      console.error('Error processing question:', error);
      Alert.alert('Error', 'Failed to process your question. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Requesting camera permission...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Camera permission is required to use this app.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.header}>
        <Text style={styles.title}>Object Detection QA</Text>
      </View>
      
      <View style={styles.cameraContainer}>
        <CameraView
          onObjectsDetected={handleObjectsDetected}
        />
      </View>

      <View style={styles.bottomContainer}>
        <DetectedObjectsList objects={detectedObjects} />
        <QuestionInput
          onSubmit={handleQuestionSubmit}
          isProcessing={isProcessing}
          hasObjects={detectedObjects.length > 0}
          detectedObjects={detectedObjects}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  bottomContainer: {
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default App; 