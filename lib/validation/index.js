import * as z from "zod";
export const signUpFormSchema = z.object({
    name: z.string().min(3, "Name is required").max(100),
    email: z.string().email("Invalid email").min(8, "Email is required"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters")
        .max(50, "Password must have less than 50 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

export const signInFormSchema = z.object({
    email: z.string().email("Invalid email").min(8, "Email is required"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters")
        .max(50, "Password must have less than 50 characters"),
});


export const contactFormSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    subject: z.string()
        .min(1, "Name is required")
        .min(3, "Name must have more than 3 characters")
        .max(25, "Name cannot have characters more than 25"),
    message: z.string().min(1, "Message is required").min(40, "Message must have more than 40 characters").max(500, "Message must have less than 500 characters"),
})


export const addressFormSchema = z.object({
    userAddress: z.string().min(1, "Address is required!").max(250, "Address cannot have characters more than 250"),
    userCity: z.string().min(1, "City is required!").min(3, "City must have more than 3 characters").max(50, "City cannot have characters more than 50"),
    userState: z.string().min(1, "State is required!").min(3, "State must have more than 3 characters").max(50, "State cannot have characters more than 50"),
    userZipcode: z.number("Invalid").min(1, "Zipcode is required!").min(100000, { message: 'Invalid Zipcode!' }).max(999999, { message: 'Invalid Zipcode' }),
    userPhoneNumber: z.number("Invalid").min(1000000000, { message: 'Invalid Number!' }).max(9999999999, { message: 'Invalid Number!' }),
    userCountry: z.string().min(1, "Required").max(50, "Country cannot have characters more than 50"),
})