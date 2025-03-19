import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DocumentList from '../components/DocumentList';
import DocumentViewer from '../components/DocumentViewer';
import Button from '../components/Button';
import { Document } from '../types/document';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';
import { uploadDocument, deleteDocument, testUploadAndDelete } from '../services/api';

const DocumentsScreen = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileSelected = async (result: DocumentPicker.DocumentResult) => {
    if (result.type === 'success') {
      try {
        setLoading(true);
        const fileInfo = await FileSystem.getInfoAsync(result.uri);
        
        if (!fileInfo.exists) {
          throw new Error('文件不存在');
        }

        // 创建临时文档对象
        const tempDocument: Document = {
          id: uuidv4(),
          name: result.name,
          type: result.mimeType?.split('/')[1] || 'unknown',
          uri: result.uri,
          size: fileInfo.size || 0,
          uploadDate: new Date(),
          status: 'processing',
        };

        // 添加到文档列表
        setDocuments(prev => [...prev, tempDocument]);

        // 上传到服务器
        const uploadResult = await uploadDocument(
          result.uri,
          result.name,
          result.mimeType || 'application/octet-stream'
        );

        if (uploadResult.success && uploadResult.fileUrl) {
          // 更新文档状态和URL
          setDocuments(prev =>
            prev.map(doc =>
              doc.id === tempDocument.id
                ? {
                    ...doc,
                    uri: uploadResult.fileUrl!,
                    status: 'uploaded',
                  }
                : doc
            )
          );
        } else {
          // 上传失败，更新状态为错误
          setDocuments(prev =>
            prev.map(doc =>
              doc.id === tempDocument.id
                ? {
                    ...doc,
                    status: 'error',
                  }
                : doc
            )
          );
          throw new Error(uploadResult.error || '上传失败');
        }
      } catch (error) {
        console.error('Error handling file:', error);
        Alert.alert('错误', '文件处理失败，请重试');
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      });
      await handleFileSelected(result);
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('错误', '选择文件失败，请重试');
    }
  };

  const handleDelete = async (id: string) => {
    const document = documents.find(doc => doc.id === id);
    if (!document) return;

    Alert.alert(
      '删除文档',
      '确定要删除这个文档吗？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '删除',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await deleteDocument(document.uri);
              if (success) {
                setDocuments(prev => prev.filter(doc => doc.id !== id));
              } else {
                Alert.alert('错误', '删除文档失败，请重试');
              }
            } catch (error) {
              console.error('Error deleting document:', error);
              Alert.alert('错误', '删除文档失败，请重试');
            }
          },
        },
      ]
    );
  };

  const handleView = (document: Document) => {
    setSelectedDocument(document);
    setShowViewer(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title="上传文档"
          onPress={handlePickDocument}
          loading={loading}
        />
        <Button
          title="测试上传/删除"
          onPress={testUploadAndDelete}
          variant="outline"
          style={styles.testButton}
        />
      </View>

      <ScrollView style={styles.content}>
        <DocumentList
          documents={documents}
          onDelete={handleDelete}
          onView={handleView}
        />
      </ScrollView>

      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          visible={showViewer}
          onClose={() => {
            setShowViewer(false);
            setSelectedDocument(null);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  content: {
    flex: 1,
  },
  testButton: {
    marginLeft: 8,
  },
});

export default DocumentsScreen; 