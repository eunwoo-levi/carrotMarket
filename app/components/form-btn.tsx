"use client";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  // form의 action={handleForm} 이 훅은 action이 pending 상태인지를 자동으로 알아냄
  // pending : 함수가 끝난 여부를 알려줌 (action을 실행하는 form과 같은 곳에는 사용불가능)
  // form의 자식 요소만 사용 가능-> form의 상태에 따라 변경하고자 하는 component 내부에서 사용
  // 즉, pending은 form 의 내부에서 호출되고 사용되어야 한다.
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 
      disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "loading..." : text}
    </button>
  );
}
