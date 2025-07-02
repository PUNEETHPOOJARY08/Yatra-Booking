import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  className,
  type = 'button',
  fullWidth = false,
  icon,
  ...props
}) => {
  const baseClasses = "rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-indigo-900 text-white hover:bg-indigo-800 focus:ring-indigo-500",
    secondary: "bg-teal-700 text-white hover:bg-teal-600 focus:ring-teal-500",
    outline: "border border-indigo-900 text-indigo-900 hover:bg-indigo-50 focus:ring-indigo-500",
    ghost: "text-indigo-900 hover:bg-indigo-50 focus:ring-indigo-500",
    amber: "bg-amber-600 text-white hover:bg-amber-500 focus:ring-amber-400",
    danger: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-400"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  
  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    className
  );
  
  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      {...props}
    >
      <div className="flex items-center justify-center space-x-2">
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </div>
    </motion.button>
  );
};

export default Button;