import { useEffect, useState } from "react";
import type React from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { CheckCircle2, LogIn, Send } from "lucide-react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import * as z from "zod";
import { WEDDING_DETAILS } from "../constants";
import { auth, db, handleFirestoreError, loginWithGoogle, OperationType } from "../lib/firebase";
import { cn } from "../lib/utils";

const rsvpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  attendance: z.enum(["yes", "no"]),
  guests: z.string().optional(),
  dietary: z.string().optional(),
  message: z.string().optional(),
});

type RSVPFormValues = z.infer<typeof rsvpSchema>;

export function RSVPForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { attendance: "yes", guests: "1" },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser?.displayName) setValue("name", currentUser.displayName);
      if (currentUser?.email) setValue("email", currentUser.email);
    });
    return () => unsubscribe();
  }, [setValue]);

  const attendance = watch("attendance");

  const onSubmit = async (data: RSVPFormValues) => {
    if (!user) {
      setFormError('Please sign in with Google before submitting your RSVP.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);
    const rsvpPath = `rsvps/${user.uid}`;
    try {
      console.info('Submitting RSVP for user:', user.uid, 'path:', rsvpPath);
      await setDoc(doc(db, "rsvps", user.uid), {
        ...data,
        uid: user.uid,
        weddingDate: WEDDING_DETAILS.date.full,
        createdAt: serverTimestamp(),
      });
      setIsSubmitted(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setFormError(`RSVP save failed: ${message}`);
      console.error('RSVP save failed:', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    try {
      setFormError(null);
      await loginWithGoogle();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setFormError(`Login failed: ${message}`);
      console.error("Login failed:", message);
    }
  };

  if (isSubmitted) {
    return (
      <section id="rsvp" className="bg-ivory px-5 py-20 text-center md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-xl border border-redwood/15 bg-white/85 p-8 shadow-[0_20px_80px_rgba(117,30,31,0.08)]"
        >
          <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-gold" />
          <h2 className="font-serif text-5xl font-semibold text-redwood">Thank You</h2>
          <p className="mt-2 text-xl text-gold">谢谢您</p>
          <p className="mt-6 leading-7 text-ink/70">
            We have received your RSVP for {WEDDING_DETAILS.date.full}.
          </p>
          <p className="mt-2 leading-7 text-ink/70">
            我们已收到您对{WEDDING_DETAILS.date.fullChinese}婚礼的回执。
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-8 rounded-full border border-redwood/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-redwood transition hover:bg-gold"
          >
            Update Response 更新回执
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="bg-ivory px-5 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-redwood/60">
            RSVP for {WEDDING_DETAILS.date.full}
          </p>
          <p className="mt-2 text-sm text-ink/55">请回复 {WEDDING_DETAILS.date.fullChinese} 的出席情况</p>
          <h2 className="mt-5 font-serif text-5xl font-semibold text-redwood md:text-7xl">
            Will You Join Us?
          </h2>
          <p className="mt-3 text-2xl text-gold">您会出席吗？</p>
          <p className="mt-5 text-sm leading-7 text-ink/60">
            Please respond by 15 August 2026.
            <br />
            请于2026年8月15日前回复。
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-redwood/15 bg-white/85 p-6 shadow-[0_20px_80px_rgba(117,30,31,0.08)] md:p-10"
        >
          {formError ? (
            <div className="mb-6 rounded-lg border border-redwood/20 bg-redwood/5 px-4 py-4 text-sm text-redwood">
              {formError}
            </div>
          ) : null}
          {authLoading ? (
            <div className="py-12 text-center text-ink/45">Loading... 加载中...</div>
          ) : !user ? (
            <div className="py-12 text-center">
              <p className="mx-auto mb-3 max-w-md leading-7 text-ink/70">
                Please sign in with Google to submit your RSVP securely.
              </p>
              <p className="mx-auto mb-8 max-w-md leading-7 text-ink/70">
                请使用 Google 登录，以安全提交您的婚礼回执。
              </p>
              <button
                onClick={handleLogin}
                className="mx-auto inline-flex items-center justify-center gap-3 rounded-full bg-redwood px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition hover:bg-gold hover:text-redwood"
              >
                <LogIn className="h-4 w-4" />
                Sign in with Google
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Full Name 姓名" error={errors.name?.message}>
                  <input
                    {...register("name")}
                    className={inputClass(errors.name)}
                    placeholder="Enter your name 输入您的姓名"
                  />
                </Field>

                <Field label="Email Address 电子邮箱" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    readOnly
                    className={cn(inputClass(errors.email), "opacity-55")}
                    placeholder="email@example.com"
                  />
                </Field>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-redwood/70">
                  Attendance 出席情况
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <RadioOption
                    value="yes"
                    label="Joyfully Accepts"
                    labelChinese="欣然出席"
                    register={register("attendance")}
                  />
                  <RadioOption
                    value="no"
                    label="Regretfully Declines"
                    labelChinese="遗憾缺席"
                    register={register("attendance")}
                  />
                </div>
              </div>

              {attendance === "yes" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="grid gap-6 overflow-hidden md:grid-cols-2"
                >
                  <Field label="Number of Guests 出席人数">
                    <select {...register("guests")} className={inputClass()}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest 人" : "Guests 人"}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Dietary Requirements 饮食需求">
                    <input
                      {...register("dietary")}
                      className={inputClass()}
                      placeholder="Vegetarian, no seafood, etc."
                    />
                  </Field>
                </motion.div>
              )}

              <Field label="Special Message 祝福留言">
                <textarea
                  {...register("message")}
                  rows={4}
                  className={inputClass()}
                  placeholder="Leave a message for the couple... 给新人留下一句祝福..."
                />
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-redwood py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition hover:bg-gold hover:text-redwood disabled:opacity-50"
              >
                {isSubmitting ? "Sending... 发送中..." : "Send My Response 发送回执"}
                <Send className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => auth.signOut()}
                className="block w-full text-center text-[10px] uppercase tracking-[0.22em] text-ink/40 transition hover:text-redwood"
              >
                Sign out 退出登录 ({user.email})
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-redwood/70">
        {label}
      </span>
      {children}
      {error && <span className="mt-2 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

function RadioOption({
  value,
  label,
  labelChinese,
  register,
}: {
  value: "yes" | "no";
  label: string;
  labelChinese: string;
  register: UseFormRegisterReturn;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 border border-redwood/10 bg-ivory/60 p-4 transition hover:border-gold">
      <input type="radio" value={value} {...register} className="h-4 w-4 accent-redwood" />
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        <span className="block text-sm text-ink/55">{labelChinese}</span>
      </span>
    </label>
  );
}

function inputClass(error?: unknown) {
  return cn(
    "w-full border-b bg-transparent py-3 text-sm outline-none transition placeholder:text-ink/35 focus:border-gold",
    error ? "border-red-500" : "border-redwood/15"
  );
}
