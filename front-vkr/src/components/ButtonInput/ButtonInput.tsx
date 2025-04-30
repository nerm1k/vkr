import styles from './ButtonInput.module.scss'

interface Props {
    onClick: () => void,
    text: string
}

const ButtonInput = ({onClick, text}: Props) => {
    return (
        <button className={styles.button} onClick={onClick}>{text}</button>
    )
}

export default ButtonInput;