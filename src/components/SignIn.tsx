"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schemas/authSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "sonner";
import { ResponseLogin } from "@/types";
import { useAuthStore } from "@/context/useAuthStore";
import { useLogin } from "@/hooks/useAuth";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { useRouter } from "next/navigation";

const SignIn = ({
  onChange,
  onclose,
}: {
  onChange: () => void;
  onclose: () => void;
}) => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useAuthStore();
  const { push } = useRouter();

  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: (response: ResponseLogin) => {
        if (response.user.role === "ADMIN") {
          push("/admin/users");
          console.log('aki')
        }
        console.log("user: ",response.user.role);
        toast(response.message);
        onclose();
        login(response.user, response.token);
      },
      onError: (error: any) => {
        console.error(
          "Login failed:",
          error.response?.data?.message || error.message
        );
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="w-full">
      <Card className="shadow-none border-0 p-0 m-0 bg-white/80">
        <CardHeader className="px-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-normal text-slate-900">
              Sign in
            </CardTitle>
            <Button
              className="text-slate-600 hover:text-slate-900 bg-transparent shadow-none hover:bg-transparent p-0 h-auto font-normal"
              onClick={onChange}
            >
              Sign Up
            </Button>
          </div>
          <CardDescription className="text-slate-600 font-normal">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-normal">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        type="email"
                        className="bg-white border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-slate-700 font-normal">
                        Password
                      </FormLabel>
                      <Button
                        variant="link"
                        className="px-0 font-normal text-sm text-slate-600 hover:text-slate-900"
                        asChild
                      >
                        <a href="/forgot-password">Forgot password?</a>
                      </Button>
                    </div>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter your password"
                        className="bg-white border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#9C6644] hover:bg-[#824f3b] text-white font-normal py-2.5"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <LoadingSpinner /> "Signing in..."
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="p-0">
          <p className="text-center text-sm text-slate-600 w-full font-normal">
            Don't have an account?{" "}
            <Button
              variant="link"
              onClick={onChange}
              className="p-0 h-auto font-normal"
            >
              Create one here
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
