import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { registerUser } from "@/api";
import { AxiosError } from "axios";
import { TextInput, PasswordInput } from "@mantine/core";
import { Stack, Button } from "@mantine/core";

const RegisterUser = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      fname: "",
      lname: "",
      occupation: "",
      location: "",
      email: "",
      password: "",
      confirmPassword: "",
      picturePath: "null.png",
    },
  });
  const mutator = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>["0"]
  >(registerUser, {
    onSuccess: () => {
      router.push("/");
    },
  });
  return (
    <>
      <form onSubmit={form.onSubmit((values) => mutator.mutate(values))}>
        <Stack>
          <TextInput
            label="First Name"
            placeholder="John"
            required
            {...form.getInputProps("fname")}
          ></TextInput>
          <TextInput
            label="Last Name"
            placeholder="Doe"
            required
            {...form.getInputProps("lname")}
          ></TextInput>
          <TextInput
            label="Occupation"
            placeholder="Software Engineer"
            required
            {...form.getInputProps("occupation")}
          ></TextInput>
          <TextInput
            label="Location"
            placeholder="Hyderabad"
            required
            {...form.getInputProps("location")}
          ></TextInput>
          <TextInput
            label="Email"
            placeholder="Joe@example.com"
            required
            {...form.getInputProps("email")}
          ></TextInput>
          <PasswordInput
            label="Password"
            placeholder="Password"
            required
            {...form.getInputProps("password")}
          ></PasswordInput>
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            required
            {...form.getInputProps("confirmPassword")}
          ></PasswordInput>
          <Button type="submit">Register</Button>
        </Stack>
      </form>
    </>
  );
};

export default RegisterUser;
