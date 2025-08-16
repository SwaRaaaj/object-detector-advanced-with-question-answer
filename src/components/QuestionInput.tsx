import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {GeminiService} from '../utils/geminiService';
import {DetectedObject} from '../types';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isProcessing: boolean;
  hasObjects: boolean;
  detectedObjects: DetectedObject[];
}

const QuestionInput: React.FC<QuestionInputProps> = ({
  onSubmit,
  isProcessing,
  hasObjects,
  detectedObjects,
}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) {
      Alert.alert('Error', 'Please enter a question.');
      return;
    }

    if (!hasObjects) {
      Alert.alert('No Objects', 'Please wait for objects to be detected.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await askGemini(question);
      setAnswer(response);
      onSubmit(question);
    } catch (error) {
      console.error('Error asking Gemini:', error);
      Alert.alert('Error', 'Failed to get answer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const askGemini = async (userQuestion: string): Promise<string> => {
    const geminiService = new GeminiService({
      apiKey: 'YOUR_GEMINI_API_KEY', // Replace with actual API key
      model: 'gemini-pro',
      maxTokens: 1000,
      temperature: 0.7,
    });

    return await geminiService.askQuestion(userQuestion, detectedObjects);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask about detected objects..."
          placeholderTextColor="#666"
          value={question}
          onChangeText={setQuestion}
          multiline
          maxLength={200}
        />
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!hasObjects || isLoading) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!hasObjects || isLoading}>
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Processing...' : 'Ask'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {answer && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerLabel}>Answer:</Text>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginRight: 8,
    minHeight: 40,
    maxHeight: 80,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 60,
  },
  submitButtonDisabled: {
    backgroundColor: '#666',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  answerContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  answerLabel: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  answerText: {
    color: '#fff',
    lineHeight: 20,
  },
});

export default QuestionInput; 