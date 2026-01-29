import React, { forwardRef } from "react";
import "./button.styles.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "error" | "warning";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => {
    const classes = `button button--${variant} button--${size} ${className}`.trim();

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
