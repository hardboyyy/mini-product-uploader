import React from 'react';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
}


const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
    const baseStyles =
        'px-4 py-2 rounded text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variantStyles = {
        primary: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500',
        secondary: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-500',
        danger: 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
    };

    const disabledStyles = 'bg-gray-300 text-gray-700 cursor-not-allowed';

    const styles = props.disabled
        ? `${baseStyles} ${disabledStyles}`
        : `${baseStyles} ${variantStyles[variant]}`;


    return (
        <button className={styles} {...props}>
            {children}
        </button>
    );
};


export default Button;