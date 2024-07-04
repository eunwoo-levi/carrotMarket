"use server"
// 타입스크립트는 작성된 코드의 컴파일 시점에만 타입 검사를 하며, 이것은 오직 개발자를 위한 것입니다. 컴파일을 한 후 자바스크립트 런타임 환경에서는 타입스크립트가 아무런 힘을 쓰지 못합니다. 따라서 zod 와 같은 라이브러리의 도움을 받아서 예측 불가능한 런타임 환경에서도 타입 검사(유효성 검증)
// 조건 하나하나 if-else 할 필요없이 zod를 사용하여 간편하게 validation 데이터의 조건을 줌
import { z } from "zod"
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "../../lib/constants"


const checkUsername =(username:string)=>(
    !username.includes("potato")
)

const checkPasswords =({password, confirm_password} :
    {password:string, confirm_password:string})=>(
    password===confirm_password
)


const formSchema = z.object({
    username: z.string({
        // 에러가 여러개인 경우 아래와 같이 object(객체)로 전달 가능
        invalid_type_error: "Username must be a string.",
        required_error: "You need to enter a Username." // 아무것도 보내지 않을때
    }).toLowerCase().trim().transform((username)=>`🔥${username}🔥`).
    refine(checkUsername,"no Potato allowed!")
    ,
    email: z.string({
        invalid_type_error: "email must be a string",
        required_error: "You need to enter an email."
    }).email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH, "Password is too short").regex(PASSWORD_REGEX, 
        PASSWORD_REGEX_ERROR
    ),
    confirm_password: z.string().min(4, "Confirm_password is too short.")
}).refine(checkPasswords, {
    message: "Both passwords should be same.",
    path:["confirm_password"]
})

// createAccount함수는 user가 form에 입력한 데이터인 formData와 함께 호출됌
// 그 다음에 form 에서 받아온 데이터를 data object(객체) 안에 넣고 있다.
// formData 안에 데이터를 가져오기 위해서는 formData.get를 사용해야 함!
// 반드시 기억! username,email,password,confirm_password의 string은 input의 name을 참조
// -> FormInput에 name을 지정하고 , get으로 불러올때는 name 값과 동일해야 함!
export async function createAccount(prevState:any, formData:FormData){
    const data={
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password")
    }
    // data의 타입이 유효한지 검사하기 위해 .parse 메소드를 사용
    // .safeParse는 parse와 달리 에러를 발생시키지 않음 (parse,validate,transform) 해줌 - schema의 형태에 따라
    // safeParse는 valication에 관한 정보를 담긴 object를 줌
    // success는 validation의 성공 여부 , result.error의 정보는 너무 크기때문에 flatten() 사용
    const result = formSchema.safeParse(data)
    if(!result.success){
        return result.error.flatten()
    }
    else{
        console.log(result.data)
    }
    // result 가 success 이면 result.data 접근하고 이 result.data를 database에서 사용
    // flatten()는 error를 간결하게 만들어줌
}
