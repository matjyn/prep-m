import React from "react";
import "./button.styles.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "error" | "warning";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const classes = `button button--${variant} button--${size} ${className}`.trim();

  return (
    <button
      className={classes}
      {...props}
    />
  );
};

export default Button;
