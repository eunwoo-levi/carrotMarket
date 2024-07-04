import { InputHTMLAttributes } from "react";

// Typescript를 사용하므로 매개변수를 사용할때 타입을 지정해줘야 함 - interface명은 대문자로 짓는다
interface FormInputProps {
  /*  InputHTMLAttributes<HTMLInputElement> 에 의해 필요없어짐
  type: string;
  placeholder: string;
  required: boolean;
  */
  errors?: string[];
  name: string;
}

export default function FormInput({
  /*  ...rest로 모두 대체
  type,
  placeholder,
  required,
  */
  name,
  errors = [],
  ...rest
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="bg-transparent rounded-md w-full
            h-10 focus:outline-none ring-2 focus:ring-4 ring-neutral-100 transition
             focus:ring-orange-500 border-none placeholder:text-neutral-400 pl-2"
        name={name}
        /*
        type={type}
        placeholder={placeholder}
        required={required}
        */
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
