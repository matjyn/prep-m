import React from "react";
import "./input.styles.css";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  variant?: "primary" | "secondary" | "success" | "error" | "warning";
  size?: "sm" | "md" | "lg";
};

const Input: React.FC<InputProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const classes = `input input--${variant} input--${size} ${className}`.trim();

  return (
    <input
      className={classes}
      {...props}
    />
  );
};

export { Input };
