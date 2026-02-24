import { type ReactNode } from 'react';
import styles from './button.module.css';
interface ButtonsProps {
    variant: 'green' | 'white' | 'orange' | 'grey' | 'yellow' | 'dark';
    text?: string;
    children?: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    disabled?: boolean;
    className?: string;
}

export const Button = ({ variant, text, children, onClick, type = 'button', disabled, className }: ButtonsProps) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles[variant]} ${className || ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children || text}
        </button>
    );
};