import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {DetectedObject} from '../types';

interface DetectedObjectsListProps {
  objects: DetectedObject[];
}

const DetectedObjectsList: React.FC<DetectedObjectsListProps> = ({objects}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detected Objects ({objects.length})</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {objects.map((obj) => (
          <View key={obj.id} style={styles.objectItem}>
            <Text style={styles.objectLabel}>{obj.label}</Text>
            <Text style={styles.confidence}>
              {(obj.confidence * 100).toFixed(1)}%
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  objectItem: {
    backgroundColor: '#333',
    padding: 8,
    marginRight: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  objectLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  confidence: {
    color: '#0f0',
    fontSize: 10,
    marginTop: 2,
  },
});

export default DetectedObjectsList; 