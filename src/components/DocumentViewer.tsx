import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Document } from '../types/document';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';

interface DocumentViewerProps {
  document: Document;
  visible: boolean;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  visible,
  onClose,
}) => {
  const getFileTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'picture-as-pdf';
      case 'doc':
      case 'docx':
        return 'description';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'image';
      default:
        return 'insert-drive-file';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={1}>
            {document.name}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <MaterialIcons name={getFileTypeIcon(document.type)} size={20} color="#666" />
            <Text style={styles.infoText}>{document.type.toUpperCase()}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="access-time" size={20} color="#666" />
            <Text style={styles.infoText}>{formatDate(document.uploadDate)}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="storage" size={20} color="#666" />
            <Text style={styles.infoText}>{formatFileSize(document.size)}</Text>
          </View>
        </View>

        <View style={styles.content}>
          {document.type.toLowerCase() === 'pdf' ? (
            <WebView
              source={{ uri: document.uri }}
              style={styles.webview}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={styles.loadingContainer}>
                  <Text style={styles.loadingText}>加载中...</Text>
                </View>
              )}
            />
          ) : (
            <View style={styles.unsupportedContainer}>
              <MaterialIcons name="error-outline" size={48} color="#666" />
              <Text style={styles.unsupportedText}>
                暂不支持预览此类型的文件
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  infoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  unsupportedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unsupportedText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default DocumentViewer; 