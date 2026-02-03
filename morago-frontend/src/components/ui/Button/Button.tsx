import styles from './button.module.css';
interface ButtonsProps {

    variant: 'green' | 'white';
    text: string;
    onClick: () => void; //takes no input and return notthing
    type?: 'button' | 'submit';
}

export const Button = ({ variant, text, onClick, type = 'button' }: ButtonsProps) => {
    return (
        <button type={type} className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
            {text}
        </button>
    );
};