import { useEffect, useState } from 'react';
import styles from './MainPage.module.scss';
import FileInput from '../../components/FileInput/FileInput';
import ParamsSlider from '../../components/ParamsSlider/ParamsSlider';
import ButtonInput from '../../components/ButtonInput/ButtonInput';

const MainPage = () => {
    const [activeButton, setActiveButton] = useState('file');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');
    const [url, setUrl] = useState('');
    const [selectedModel, setSelectedModel] = useState('model1');
    const [sliderConfidenceValue, setSliderConfidenceValue] = useState(70);
    const [sliderOverlapValue, setSliderOverlapValue] = useState(30);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        if (activeButton === 'file' && selectedFile) {
          const objectUrl = URL.createObjectURL(selectedFile);
          setImageSrc(objectUrl);
    
          return () => URL.revokeObjectURL(objectUrl);
        } else if (activeButton === 'url' && url) {
          setImageSrc(url);
        } else {
          setImageSrc(null);
        }
      }, [activeButton, selectedFile, url]);

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    const handleFileChange = (file: File | null) => {
        setSelectedFile(file);
    };

    const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModel(e.target.value);
    };

    const handleSliderConfidenceChange = (event: Event, newValue: number) => {
        setSliderConfidenceValue(newValue);
    };
    
      const handleInputConfidenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSliderConfidenceValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    const handleSliderOverlapChange = (event: Event, newValue: number) => {
        setSliderOverlapValue(newValue);
    };
    
      const handleInputOverlapChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSliderOverlapValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    console.log(imageSrc);
    return (
        <div className={styles.container}>
            <div className={styles.uploading}>
                <div className={styles.uploading__item}>
                    <div className={styles.item__method}>
                        <p className={styles.method__title}>Метод загрузки</p>
                        <div className={styles.method__buttons}>
                            <button className={`${styles.buttons__button} ${styles.file} ${activeButton == 'file' && styles.button_active}`} onClick={() => handleButtonClick('file')}>Файл</button>
                            <button className={`${styles.buttons__button} ${styles.url} ${activeButton == 'url' && styles.button_active}`} onClick={() => handleButtonClick('url')}>Ссылка</button>
                        </div>
                    </div>
                    <div className={styles.item__file}>
                        {activeButton == 'file' && (
                            <>
                                <p className={styles.file__title}>Выберите файл</p>
                                <FileInput onFileChange={handleFileChange} fileName={fileName} setFileName={setFileName}/>
                            </>
                        )}
                        {activeButton == 'url' && (
                            <>
                                <p className={styles.file__title}>Вставьте ссылку</p>
                                <input className={styles.url} type="text" placeholder="https://path.to/your.jpg" value={url} onChange={(e) => setUrl(e.target.value)}/>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.uploading__model}>
                    <p className={styles.model__title}>Модель</p>
                    <select className={styles.model__select} value={selectedModel} onChange={handleModelChange}>
                        <option value="model1">Model 1</option>
                        <option value="model2">Model 2</option>
                        <option value="model3">Model 3</option>
                    </select>
                </div>
                {selectedModel == 'model2' && (
                    <div className={styles.uploading__params}>
                        <div className={styles.params__item}>
                            <p className={styles.item__title}>Минимальная уверенность</p>
                            <ParamsSlider defaultValue={70} onChangeInput={handleInputConfidenceChange} value={sliderConfidenceValue} onChangeSlider={handleSliderConfidenceChange}/>
                        </div>
                        <div className={styles.params__item}>
                            <p className={styles.item__title}>Максимальное перекрытие</p>
                            <ParamsSlider defaultValue={30} onChangeInput={handleInputOverlapChange} value={sliderOverlapValue} onChangeSlider={handleSliderOverlapChange}/>
                        </div>
                    </div>
                )}
                <div className={styles.uploading__image}>
                    {imageSrc ? (
                        <img src={imageSrc} alt="Uploaded" className={styles.uploadedImage} />
                    ) : (
                        <p>Изображение не выбрано</p>
                    )}
                </div>
                <div className={styles.uploading__button}>
                    <ButtonInput />
                </div>
            </div>
        </div>
    )
}

export default MainPage;