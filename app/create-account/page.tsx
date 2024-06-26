import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import SocialLogin from "@/components/social-login";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Welcome to carrot market!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        {/*FormInput FormButton은 componenets 파일에서 새로 정의한 컴포넌트임*/}
        <FormInput type="text" placeholder="Username" required errors={[]} />
        <FormInput type="email" placeholder="Email" required errors={[]} />
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="Confirm Password"
          required
          errors={[]}
        />
        <FormButton loading={false} text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  );
}
