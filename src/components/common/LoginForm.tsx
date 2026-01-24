import { useState } from "react";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = ({ onSubmit }: { onSubmit: (data: LoginFormData) => void }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-column gap-3 mb-16">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@example.com"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};

export default LoginForm;
