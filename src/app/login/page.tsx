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
import { Separator } from "@/components/ui/separator";
import { Chrome } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

const SignInPage = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data);
    try {
      // Simular una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login successful:", data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Aquí puedes agregar la lógica para login con Google
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-normal text-slate-900">
                Sign in
              </CardTitle>
              <Button
                variant="ghost"
                className="text-slate-600 hover:text-slate-900 p-0 h-auto font-normal"
                asChild
              >
                <a href="/signup">Sign Up</a>
              </Button>
            </div>
            <CardDescription className="text-slate-600 font-normal">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                  className="w-full bg-[#9C6644] hover:bg-slate-800 text-white font-normal py-2.5"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="pt-6">
            <p className="text-center text-sm text-slate-600 w-full font-normal">
              Don't have an account?{" "}
              <Button variant="link" className="p-0 h-auto font-normal" asChild>
                <a href="/signup">Create one here</a>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default SignInPage;
