"use server"

import { z } from "zod"
import validator from "validator"
import { redirect } from "next/navigation";

const phoneSchema = z.string().trim().refine((phone)=>validator.
isMobilePhone(phone,"ko-KR"), "Wrong phone format");

// input에 입력하면 string 타입으로 됌 -> coerce(강제)를 사용하면 값의 타입 변환 가능
const tokenSchema = z.coerce.number().min(100000).max(999999)

interface ActionState{
    token:boolean;
}

export async function smsLogin(prevState:ActionState,formData:FormData){
    const phone = formData.get("phone")
    const token = formData.get("token")
    // prevState.token 이 false 인 경우에는 전화번호를 받고 있는 경우
    if(!prevState.token){
        const result = phoneSchema.safeParse(phone);
        if(!result.success){
            return{
                token:false,
                error:result.error.flatten()
            }
        }
        else{
            return{
                token:true
            };
        }
    }
    // else일때는 token를 받고 있는 경우
    else{
        const result = tokenSchema.safeParse(token)
        if(!result.success){
            return{
            token:true,
            error:result.error.flatten()
            }
        }
        // token 성공한 경우
        else{
            redirect("/")
        }
    }
}