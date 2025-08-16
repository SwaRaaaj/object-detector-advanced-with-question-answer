import {defaultGeminiConfig, GeminiConfig} from '../utils/geminiService';
import {defaultYOLOConfig, YOLOConfig} from '../utils/yoloProcessor';

export interface AppConfig {
  gemini: GeminiConfig;
  yolo: YOLOConfig;
  camera: {
    frameProcessorFps: number;
    maxDetections: number;
  };
  ui: {
    theme: 'dark' | 'light';
    language: string;
  };
}

export const appConfig: AppConfig = {
  gemini: {
    ...defaultGeminiConfig,
    apiKey: process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY',
  },
  yolo: defaultYOLOConfig,
  camera: {
    frameProcessorFps: 5,
    maxDetections: 10,
  },
  ui: {
    theme: 'dark',
    language: 'en',
  },
}; 