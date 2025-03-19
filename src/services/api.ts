import * as FileSystem from 'expo-file-system';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

interface UploadResponse {
  success: boolean;
  fileUrl?: string;
  error?: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1秒

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const validateFile = (fileSize: number, fileType: string): string | null => {
  if (fileSize > MAX_FILE_SIZE) {
    return `文件大小不能超过 ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
  }
  
  if (!ALLOWED_FILE_TYPES.includes(fileType)) {
    return '不支持的文件类型';
  }
  
  return null;
};

export const uploadDocument = async (
  uri: string,
  fileName: string,
  fileType: string
): Promise<UploadResponse> => {
  let lastError: Error | null = null;

  try {
    // 获取文件信息
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      throw new Error('文件不存在');
    }

    // 验证文件
    const validationError = validateFile(fileInfo.size || 0, fileType);
    if (validationError) {
      return {
        success: false,
        error: validationError,
      };
    }

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        // 生成唯一的文件名
        const uniqueFileName = `${uuidv4()}-${fileName}`;
        
        // 创建存储引用
        const storageRef = ref(storage, `documents/${uniqueFileName}`);

        // 获取文件内容
        const response = await fetch(uri);
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.status}`);
        }
        const blob = await response.blob();

        // 上传文件
        await uploadBytes(storageRef, blob);

        // 获取下载URL
        const downloadUrl = await getDownloadURL(storageRef);

        return {
          success: true,
          fileUrl: downloadUrl,
        };
      } catch (error) {
        lastError = error as Error;
        console.error(`Upload attempt ${attempt} failed:`, error);
        
        if (attempt < MAX_RETRIES) {
          await delay(RETRY_DELAY * attempt); // 递增延迟
          continue;
        }
      }
    }
  } catch (error) {
    lastError = error as Error;
    console.error('File validation error:', error);
  }

  return {
    success: false,
    error: lastError?.message || '上传失败，请重试',
  };
};

export const deleteDocument = async (fileUrl: string): Promise<boolean> => {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // 从URL中提取文件路径
      const filePath = fileUrl.split('/').pop();
      if (!filePath) {
        throw new Error('Invalid file URL');
      }

      // 创建存储引用
      const storageRef = ref(storage, `documents/${filePath}`);

      // 删除文件
      await deleteObject(storageRef);

      return true;
    } catch (error) {
      lastError = error as Error;
      console.error(`Delete attempt ${attempt} failed:`, error);
      
      if (attempt < MAX_RETRIES) {
        await delay(RETRY_DELAY * attempt);
        continue;
      }
    }
  }

  console.error('Failed to delete document after all retries:', lastError);
  return false;
};

// 测试函数
export const testUploadAndDelete = async () => {
  try {
    // 测试上传
    console.log('开始测试上传...');
    const testFile = {
      uri: 'https://example.com/test.pdf', // 替换为实际的测试文件URL
      name: 'test.pdf',
      type: 'application/pdf'
    };

    const uploadResult = await uploadDocument(
      testFile.uri,
      testFile.name,
      testFile.type
    );

    if (uploadResult.success && uploadResult.fileUrl) {
      console.log('上传成功:', uploadResult.fileUrl);
      
      // 测试删除
      console.log('开始测试删除...');
      const deleteResult = await deleteDocument(uploadResult.fileUrl);
      
      if (deleteResult) {
        console.log('删除成功');
      } else {
        console.error('删除失败');
      }
    } else {
      console.error('上传失败:', uploadResult.error);
    }
  } catch (error) {
    console.error('测试失败:', error);
  }
}; 