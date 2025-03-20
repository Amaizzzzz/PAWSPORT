import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

interface FileUploaderProps {
  onFileSelected: (uri: string) => void;
  label?: string;
  accept?: 'image' | 'document';
  style?: object;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelected,
  label = '上传文件',
  accept = 'image',
  style,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickFile = async () => {
    try {
      setLoading(true);
      let result;

      if (accept === 'image') {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });
      } else {
        // TODO: Implement document picker
        // This will require additional setup for document picking
        return;
      }

      if (!result.canceled) {
        setPreview(result.assets[0].uri);
        onFileSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={pickFile}
        disabled={loading}
      >
        {preview ? (
          <Image source={{ uri: preview }} style={styles.preview} />
        ) : (
          <View style={styles.placeholder}>
            <MaterialIcons name="cloud-upload" size={32} color="#666" />
            <Text style={styles.placeholderText}>{label}</Text>
          </View>
        )}
      </TouchableOpacity>
      {loading && <Text style={styles.loadingText}>上传中...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  uploadButton: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  placeholder: {
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});

export default FileUploader; 