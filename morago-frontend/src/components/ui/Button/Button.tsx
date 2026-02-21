import styles from './button.module.css';
interface ButtonsProps {

    variant: 'green' | 'white' | 'orange' | 'grey' | 'yellow';
    text: string;
    onClick?: () => void;
    type?: 'button' | 'submit';
    disabled?: boolean;
}

export const Button = ({ variant, text, onClick, type = 'button', disabled }: ButtonsProps) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles[variant]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};