"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";
import { useRegister } from "@/hooks/useAuth";
import { RegisterFormData, registerSchema } from "@/schemas/authSchema";
import { toast } from "sonner";
import { ResponseRegister } from "@/types";
import { LoadingSpinner } from "./ui/LoadingSpinner";

const SignUp = ({
  onChange,
  onclose,
}: {
  onChange: () => void;
  onclose: () => void;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const registerMutation = useRegister();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data, {
      onSuccess: (response: ResponseRegister) => {
        toast(
          `${response.message}, Bienvenido: ${response?.user?.profile?.fullName}`
        );
        onclose();
      },
      onError: (error: any) => {
        console.log(
          "Login failed:",
          error.response?.data?.message || error.message
        );
        toast.error(error.response?.data?.message || error.message);
      },
    });
  };

  return (
    <div className="w-full">
      <Card className="shadow-none border-0 p-0 m-0 bg-white/80">
        <CardHeader className="px-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-normal text-slate-900">
              Sign Up
            </CardTitle>
            <Button
              className="text-slate-600 hover:text-slate-900 bg-transparent shadow-none hover:bg-transparent p-0 h-auto font-normal"
              onClick={onChange}
            >
              Sign In
            </Button>
          </div>
          <CardDescription className="text-slate-600 font-normal">
            Create your account by filling in the fields below
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-normal">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-normal">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1234567890"
                        type="tel"
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
                    <FormLabel className="text-slate-700 font-normal">
                      Password
                    </FormLabel>
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

              {error && (
                <p className="text-sm text-red-600 font-normal">{error}</p>
              )}
              {success && (
                <p className="text-sm text-green-600 font-normal">{success}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-[#9C6644] hover:bg-[#824f3b] text-white font-normal py-2.5"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <LoadingSpinner /> "Registering..."
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="p-0">
          <p className="text-center text-sm text-slate-600 w-full font-normal">
            Already have an account?{" "}
            <Button
              variant="link"
              onClick={onChange}
              className="p-0 h-auto font-normal"
            >
              Sign in here
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
