import React from "react"
import { useForm } from "react-hook-form"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import * as Yup from "yup"
import { useStyles } from "../../utils/consts"



// interface SignInFormProps {
//   onSubmitFunc: any
//   disabled: boolean
// }

// type SignInFormData = {
//   email: string
//   password: string
// }

const SignInFormSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(
     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
     // "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
})

const SignInForm  = ({ onSubmitFunc, disabled }) => {
  
  const classes = useStyles()
  const { register, handleSubmit, watch, errors, reset } = useForm ({
    validationSchema: SignInFormSchema
  })
  const onSubmit = (data, e) => {}
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmitFunc)}>
      <fieldset disabled={disabled}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          helperText={errors.email ? errors.email.message : ""}
          inputRef={register({
            required: true
          })}
          error={errors.email ? true : false}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          inputRef={register({
            required: true
          })}
          helperText={errors.password ? errors.password.message : ""}
          error={errors.password ? true : false}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </fieldset>
    </form>
  )
}
export default SignInForm
