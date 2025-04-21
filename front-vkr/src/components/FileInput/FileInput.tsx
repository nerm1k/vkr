import React, { useState, useRef } from 'react';
import styles from './FileInput.module.scss';

interface Props {
    onFileChange: (file: File | null) => void;
    fileName: string;
    setFileName: (name: string) => void;
};

const FileInput = ({onFileChange, fileName, setFileName}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file ? file.name : '');
    onFileChange(file);
  };

  return (
    <div className={styles.fileInputWrapper}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />
      <div className={styles.fileName}>
        {fileName || 'Файл не выбран'}
      </div>
      <button className={styles.browseButton} onClick={handleBrowseClick}>
        Выбрать
      </button>
    </div>
  );
};

export default FileInput;