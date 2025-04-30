import { useEffect, useState } from 'react';
import styles from './MainPage.module.scss';
import FileInput from '../../components/FileInput/FileInput';
import ParamsSlider from '../../components/ParamsSlider/ParamsSlider';
import ButtonInput from '../../components/ButtonInput/ButtonInput';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ImageWithPredictions from '../../components/ImageWithPredictions/ImageWithPredictions';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { CircularProgress, LinearProgress } from '@mui/material';

interface Model {
    model_id: number,
    name: string,
    description: string,
    url: string,
    amount_likes: number,
    amount_dislikes: number
};

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            } else {
                reject(new Error('Failed to convert file to Base64'));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};

const MainPage = () => {
    const { isAuthenticated, authenticatedUser } = useIsAuthenticated();
    const [activeButton, setActiveButton] = useState('file');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');
    const [url, setUrl] = useState('');
    const [selectedModel, setSelectedModel] = useState(1);
    const [sliderConfidenceValue, setSliderConfidenceValue] = useState(70);
    const [sliderOverlapValue, setSliderOverlapValue] = useState(30);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [predictions, setPredictions] = useState(undefined);
    const [isPredicting, setIsPredicting] = useState(false);

    const {data} = useQuery<Model[]>({
        queryKey: ['models'],
        queryFn: () => fetch(`${import.meta.env.VITE_BACKEND_API}/models`).then(res => res.json()),
        initialData: []
    });

    console.log(data);


    // const {mutate, data, error, isPending} = useMutation<DetectImageResponse, Error, MutationInput>({
    //     mutationFn: detectImageRoboflowByUrl,
    // });

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
        setPredictions(undefined);
        setActiveButton(buttonName);
    };

    const handleFileChange = (file: File | null) => {
        setPredictions(undefined);
        setSelectedFile(file);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPredictions(undefined);
        setUrl(e.target.value);
    }

    const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPredictions(undefined);
        setSelectedModel(Number(e.target.value));
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

    const handleUploadButton = () => {
        setPredictions(undefined);
        if (!imageSrc) {
            console.log('нет картинки');
            return;
        } else {
            if (data) {
                const model = data.find(model => model.model_id === selectedModel);
                if (model) {
                    if (activeButton == 'url') {
                        async function detectImageRoboflowByUrl() {
                            setIsPredicting(true);
                            const apiUrl = model?.url;
                            if (apiUrl) {
                                try {
                                    const {data} = await axios(apiUrl, {
                                        method: "POST",
                                        params: {
                                            api_key: import.meta.env.VITE_ROBOFLOW_API_KEY,
                                            image: url,
                                            confidence: sliderConfidenceValue,
                                            overlap: sliderOverlapValue
                                        }
                                    });
                                    setPredictions(data.predictions);
                                    console.log(data.predictions);
                                } catch(error) {
                                    console.log(error)
                                }
                            }   
                            setIsPredicting(false);
                        } 

                        detectImageRoboflowByUrl();
                    } else if (activeButton === 'file' && selectedFile) {
                        async function detectImageRoboflowByFile() {
                            setIsPredicting(true);
                            const apiUrl = model?.url;
                            if (apiUrl) {
                                try {
                                    const base64String = await fileToBase64(selectedFile as File);
                                    const { data } = await axios(apiUrl, {
                                        method: 'POST',
                                        params: {
                                            api_key: import.meta.env.VITE_ROBOFLOW_API_KEY,
                                            confidence: sliderConfidenceValue,
                                            overlap: sliderOverlapValue
                                        },
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded',
                                        },
                                        data: base64String,
                                    });
                                    setPredictions(data.predictions);
                                    console.log(data.predictions);
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                            setIsPredicting(false);
                        }
    
                        detectImageRoboflowByFile();
                    }
                } else {
                    console.log('нет model select');
                }
            } else {
                console.log('нет data с сервера')
            }
        }
    };

    const handleClearButton = () => {
        setImageSrc(null);
        setPredictions(undefined);
        setSliderConfidenceValue(70);
        setSliderOverlapValue(30);
        setSelectedModel(1);
        setUrl('');
        setFileName('');
        setSelectedFile(null);
        setActiveButton('file');
    }
    console.log(predictions);
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
                                <input className={styles.url} type="text" placeholder="https://path.to/your.jpg" value={url} onChange={handleUrlChange}/>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.uploading__model}>
                    <p className={styles.model__title}>Модель</p>
                    <select className={styles.model__select} value={selectedModel} onChange={handleModelChange}>
                        {data && data.map(model => 
                            <option key={model.model_id} value={model.model_id}>{model.name}</option>
                        )}
                        <option key={3} value={3}>...</option>
                    </select>
                </div>
                {(selectedModel == 1 || selectedModel == 2) && (
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
                {predictions ? <></> : (
                    <div className={styles.uploading__image}>
                    {imageSrc ? (
                        <img src={imageSrc} alt="Uploaded" className={styles.uploadedImage} />
                    ) : (
                        <p>Изображение не выбрано</p>
                    )}
                </div>
                )}
                
                <div className={styles.uploading__button}>
                    <ButtonInput onClick={handleUploadButton} text='Загрузить' />
                    <ButtonInput onClick={handleClearButton} text='Очистить' />
                </div>
                {isPredicting && (
                    <div className={styles.predicting}>
                        {/* <p>Подождите, идет обработка... <CircularProgress size='16px'/></p> */}
                        <LinearProgress />
                    </div>
                )}
                {(predictions && imageSrc) && (
                    <div className={styles.uploading__predicted}>
                        <ImageWithPredictions imageSrc={imageSrc} predictions={predictions} modelId={selectedModel} isAuthenticated={isAuthenticated} authenticatedUser={authenticatedUser} confidence={sliderConfidenceValue} overlap={sliderOverlapValue}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MainPage;