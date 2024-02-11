import * as Yup from 'yup'


const empEnum = ["Finance" , "Marketing" , "Information Technology"]

export const empValidation = new Yup.object({      
       empname:Yup.string().min(5).max(30).matches("^[a-z]+$", "name is only lowercase withoutspace valid").required("Required username"),
       empdept: Yup.mixed().oneOf(empEnum).required("Required field"),  
       empdesignation:Yup.string().min(5).max(30).matches("^[a-z]+$", "empdesignation is only lowercase withoutspace valid").required("Required username"),
       empmail:Yup.string().email().required("Required Email"),
       empphonenumber: Yup.string().matches("^[6-9]{1}[0-9]{9}", "Indian phone number is valid").max(10).required("Required Phonenumber"),
})