import {GoogleGenerativeAI} from '@google/generative-ai';
import {DetectedObject} from '../types';

export interface GeminiConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private config: GeminiConfig;

  constructor(config: GeminiConfig) {
    this.config = config;
    this.genAI = new GoogleGenerativeAI(config.apiKey);
  }

  async askQuestion(
    question: string,
    detectedObjects: DetectedObject[],
  ): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: this.config.model,
      });

      const prompt = this.buildPrompt(question, detectedObjects);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return response.text();
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to get answer from AI');
    }
  }

  private buildPrompt(question: string, detectedObjects: DetectedObject[]): string {
    const objectsContext = this.formatDetectedObjects(detectedObjects);
    
    return `You are an AI assistant that answers questions about objects detected in a camera frame.

Context: The following objects have been detected in the current camera frame:
${objectsContext}

User Question: ${question}

Instructions:
1. Answer the question based ONLY on the detected objects listed above
2. If the question cannot be answered with the available information, clearly state that
3. Be concise and accurate
4. If counting objects, provide the exact number
5. If asking about specific objects, mention their confidence levels if relevant

Please provide a clear and helpful answer:`;
  }

  private formatDetectedObjects(objects: DetectedObject[]): string {
    if (objects.length === 0) {
      return 'No objects detected in the current frame.';
    }

    const objectList = objects
      .map(obj => `- ${obj.label} (confidence: ${(obj.confidence * 100).toFixed(1)}%)`)
      .join('\n');

    return `Detected Objects (${objects.length} total):
${objectList}`;
  }
}

// Default configuration
export const defaultGeminiConfig: GeminiConfig = {
  apiKey: 'YOUR_GEMINI_API_KEY', // Replace with your actual API key
  model: 'gemini-pro',
  maxTokens: 1000,
  temperature: 0.7,
}; 