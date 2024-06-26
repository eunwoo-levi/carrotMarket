"use server"

export async function handleForm(prevState: any, formdata:FormData) {
  console.log(prevState)
    await new Promise((resolve) => setTimeout(resolve,3000));
    return {
      errors: ["wrong password", "password is too short"],
    };
  }