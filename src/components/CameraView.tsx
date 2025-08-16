import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import {DetectedObject} from '../types';

interface CameraViewProps {
  onObjectsDetected: (objects: DetectedObject[]) => void;
}

const CameraView: React.FC<CameraViewProps> = ({onObjectsDetected}) => {
  const cameraRef = useRef<Camera>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    // Start object detection when component mounts
    startObjectDetection();
  }, []);

  const startObjectDetection = () => {
    // For now, we'll use mock detection
    // In a real implementation, you'd process camera frames
    const mockDetection = () => {
      if (!isProcessing) {
        setIsProcessing(true);
        
        // Mock detected objects
        const mockObjects: DetectedObject[] = [
          {
            id: `obj_${Date.now()}_1`,
            label: 'bottle',
            confidence: 0.95,
            boundingBox: {x: 100, y: 150, width: 50, height: 100},
            timestamp: Date.now(),
          },
          {
            id: `obj_${Date.now()}_2`,
            label: 'laptop',
            confidence: 0.87,
            boundingBox: {x: 200, y: 100, width: 120, height: 80},
            timestamp: Date.now(),
          },
        ];

        onObjectsDetected(mockObjects);
        
        setTimeout(() => {
          setIsProcessing(false);
        }, 1000);
      }
    };

    // Run detection every 2 seconds
    const interval = setInterval(mockDetection, 2000);
    
    return () => clearInterval(interval);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        
        // Here you would process the photo with YOLO
        // For now, we'll use mock detection
        console.log('Photo taken, processing...');
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={CameraType.back}
        ratio="16:9"
      >
        <View style={styles.overlay}>
          <Text style={styles.statusText}>
            {isProcessing ? 'Processing...' : 'Detecting objects...'}
          </Text>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderRadius: 4,
  },
});

export default CameraView; 