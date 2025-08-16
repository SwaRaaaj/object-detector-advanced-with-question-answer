#!/usr/bin/env python3
"""
Script to download YOLOv8 TFLite model from Ultralytics
"""

import os
import sys
from pathlib import Path

def download_yolo_model():
    try:
        # Install ultralytics if not already installed
        try:
            import ultralytics
        except ImportError:
            print("Installing ultralytics...")
            os.system("pip install ultralytics")
            import ultralytics
        
        from ultralytics import YOLO
        
        print("Downloading YOLOv8n TFLite model...")
        
        # Load YOLOv8n model
        model = YOLO('yolov8n.pt')
        
        # Export to TFLite
        model.export(format='tflite', imgsz=640, int8=True)
        
        # Find the exported file
        tflite_file = None
        for file in os.listdir('.'):
            if file.endswith('.tflite'):
                tflite_file = file
                break
        
        if tflite_file:
            print(f"✅ Model downloaded successfully: {tflite_file}")
            
            # Create assets directories
            android_assets = Path("android/app/src/main/assets")
            ios_assets = Path("ios")
            
            android_assets.mkdir(parents=True, exist_ok=True)
            
            # Copy to Android assets
            import shutil
            shutil.copy2(tflite_file, android_assets / "yolov8n.tflite")
            print(f"✅ Copied to Android assets: {android_assets / 'yolov8n.tflite'}")
            
            # Copy to iOS directory
            shutil.copy2(tflite_file, ios_assets / "yolov8n.tflite")
            print(f"✅ Copied to iOS directory: {ios_assets / 'yolov8n.tflite'}")
            
            # Clean up original file
            os.remove(tflite_file)
            print("✅ Cleanup complete")
            
        else:
            print("❌ TFLite model file not found")
            
    except Exception as e:
        print(f"❌ Error downloading model: {e}")
        return False
    
    return True

if __name__ == "__main__":
    print("🚀 YOLOv8 TFLite Model Downloader")
    print("==================================")
    
    success = download_yolo_model()
    
    if success:
        print("\n🎉 Model download complete!")
        print("\nNext steps:")
        print("1. The model has been placed in the correct directories")
        print("2. You can now build and run your React Native app")
        print("3. The YOLO processor will automatically use this model")
    else:
        print("\n❌ Model download failed. Please check the error messages above.")
        sys.exit(1) 