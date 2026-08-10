import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import SEO from "@/components/SEO";
import { Loader2, Eye, EyeOff } from "lucide-react";

const API_BASE = "https://live-backend.dentasmart.ai";
import { app } from "@shared/facts";
const APP_STORE_URL = app.iosUrl;

// ─── helpers ────────────────────────────────────────────────────────────────

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function formatDob(isoDate: string): string {
  // Convert YYYY-MM-DD → DD-MM-YYYY
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-");
  return `${d}-${m}-${y}`;
}

function todayIso(): string {
  return new Date().toISOString().split("T")[0];
}

// ─── types ───────────────────────────────────────────────────────────────────

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  password?: string;
  referrerId?: string;
}

// ─── component ───────────────────────────────────────────────────────────────

export default function Invite() {
  const [, navigate] = useLocation();

  // Read ?ref= from URL
  const searchParams = new URLSearchParams(window.location.search);
  const refParam = searchParams.get("ref") ?? "";
  const refPrefilled = refParam !== "";

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [referrerId, setReferrerId] = useState(refParam);

  // Touched state (show errors only after field is touched)
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Errors
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // ── validation ──────────────────────────────────────────────────────────

  const validate = useCallback((): FormErrors => {
    const e: FormErrors = {};
    if (!fullName.trim()) e.fullName = "Full name is required.";
    if (!email.trim()) {
      e.email = "Email address is required.";
    } else if (!validateEmail(email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!phone) {
      e.phone = "Phone number is required.";
    } else if (!isValidPhoneNumber(phone)) {
      e.phone = "Please enter a valid phone number.";
    }
    if (!gender) e.gender = "Please select a gender.";
    if (!dob) {
      e.dob = "Date of birth is required.";
    } else if (dob > todayIso()) {
      e.dob = "Date of birth cannot be in the future.";
    }
    if (!password) {
      e.password = "Password is required.";
    } else if (password.length < 8) {
      e.password = "Password must be at least 8 characters.";
    }
    if (referrerId.trim() && isNaN(Number(referrerId.trim()))) {
      e.referrerId = "Referral ID must be a number.";
    }
    return e;
  }, [fullName, email, phone, gender, dob, password, referrerId]);

  // Re-validate on every field change (only show errors for touched fields)
  useEffect(() => {
    setErrors(validate());
  }, [validate]);

  const touch = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const touchAll = () => {
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      gender: true,
      dob: true,
      password: true,
      referrerId: true,
    });
  };

  const isFormValid = Object.keys(validate()).length === 0;

  // ── submit ──────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    touchAll();

    const currentErrors = validate();
    if (Object.keys(currentErrors).length > 0) return;

    setServerError("");
    setLoading(true);

    const payload: Record<string, unknown> = {
      register_as: "patient",
      email: email.trim(),
      full_name: fullName.trim(),
      phone: phone ?? "",
      password,
      gender: gender.toLowerCase(),
      dob: formatDob(dob),
      platform: "web",
    };

    if (referrerId.trim()) {
      payload.referrer_id = Number(referrerId.trim());
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30_000);

      const res = await fetch(`${API_BASE}/v1/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.status === 201) {
        // Navigate to success page with state flag
        navigate("/invite/success", { state: { registered: true } } as any);
        return;
      }

      let msg = "Something went wrong. Please try again.";
      try {
        const data = await res.json();
        if (data?.message) msg = data.message;
        else if (data?.error) msg = data.error;
      } catch {
        // ignore parse error
      }
      setServerError(msg);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        setServerError(
          "The request timed out. Please check your connection and try again."
        );
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── field class helper ──────────────────────────────────────────────────

  const inputClass = (field: keyof FormErrors) =>
    `w-full rounded-xl border px-4 py-3 text-stone-900 placeholder:text-stone-400 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm ${
      touched[field] && errors[field] ? "border-red-300" : "border-stone-200"
    }`;

  // ── render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-4 py-12 font-sans">
      <SEO
        title="Create Your DentaSmart Account"
        description="You've been invited to join DentaSmart. Create your account to get AI-powered oral health insights."
        canonical="https://dentasmart.ai/invite"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[460px]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="/" aria-label="DentaSmart home">
            <img
              src="/images/logo.png"
              alt="DentaSmart"
              className="h-10 w-auto"
            />
          </a>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8">
          <h1 className="text-2xl font-semibold text-stone-900 mb-1 tracking-tight">
            Create your account
          </h1>
          <p className="text-stone-500 text-sm mb-8">
            You've been invited to join DentaSmart
          </p>

          {/* Server error alert */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                key="server-error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3"
                role="alert"
              >
                <p className="text-sm text-red-700 leading-relaxed">
                  {serverError}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* 1. Full Name */}
            <div>
              <label
                htmlFor="inv-full-name"
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="inv-full-name"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => touch("fullName")}
                placeholder="Jane Smith"
                className={inputClass("fullName")}
                aria-describedby={
                  touched.fullName && errors.fullName
                    ? "err-full-name"
                    : undefined
                }
              />
              {touched.fullName && errors.fullName && (
                <p id="err-full-name" className="mt-1.5 text-sm text-red-500">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* 2. Email */}
            <div>
              <label
                htmlFor="inv-email"
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="inv-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => touch("email")}
                placeholder="you@example.com"
                className={inputClass("email")}
                aria-describedby={
                  touched.email && errors.email ? "err-email" : undefined
                }
              />
              {touched.email && errors.email && (
                <p id="err-email" className="mt-1.5 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* 3. Phone */}
            <div>
              <label
                htmlFor="inv-phone"
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Phone <span className="text-red-400">*</span>
              </label>
              <div
                className={`rounded-xl border bg-stone-50 transition-colors focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary ${
                  touched.phone && errors.phone
                    ? "border-red-300"
                    : "border-stone-200"
                }`}
              >
                <PhoneInput
                  id="inv-phone"
                  international
                  defaultCountry="US"
                  autoComplete="tel"
                  value={phone}
                  onChange={setPhone}
                  onBlur={() => touch("phone")}
                  className="phone-input-custom px-4 py-3"
                  aria-describedby={
                    touched.phone && errors.phone ? "err-phone" : undefined
                  }
                />
              </div>
              {touched.phone && errors.phone && (
                <p id="err-phone" className="mt-1.5 text-sm text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* 4. Gender */}
            <div>
              <label
                htmlFor="inv-gender"
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Gender <span className="text-red-400">*</span>
              </label>
              <select
                id="inv-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                onBlur={() => touch("gender")}
                className={`${inputClass("gender")} appearance-none cursor-pointer`}
                aria-describedby={
                  touched.gender && errors.gender ? "err-gender" : undefined
                }
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {touched.gender && errors.gender && (
                <p id="err-gender" className="mt-1.5 text-sm text-red-500">
                  {errors.gender}
                </p>
              )}
            </div>

            {/* 5. Date of Birth */}
            <div>
              <label
                htmlFor="inv-dob"
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Date of Birth <span className="text-red-400">*</span>
              </label>
              <input
                id="inv-dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                onBlur={() => touch("dob")}
                min="1920-01-01"
                max={todayIso()}
                className={`${inputClass("dob")} cursor-pointer`}
                aria-describedby={
                  touched.dob && errors.dob ? "err-dob" : undefined
                }
              />
              {touched.dob && errors.dob && (
                <p id="err-dob" className="mt-1.5 text-sm text-red-500">
                  {errors.dob}
                </p>
              )}
            </div>

            {/* 6. Password */}
            <div>
              <label
                htmlFor="inv-password"
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="inv-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => touch("password")}
                  placeholder="At least 8 characters"
                  className={`${inputClass("password")} pr-12`}
                  aria-describedby={
                    touched.password && errors.password
                      ? "err-password"
                      : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p id="err-password" className="mt-1.5 text-sm text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* 7. Referral ID */}
            <div>
              <label
                htmlFor="inv-referrer"
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Referral ID{" "}
                {refPrefilled && (
                  <span className="text-xs text-stone-400 font-normal ml-1">
                    (pre-filled)
                  </span>
                )}
              </label>
              <input
                id="inv-referrer"
                type="number"
                value={referrerId}
                onChange={(e) => setReferrerId(e.target.value)}
                onBlur={() => touch("referrerId")}
                readOnly={refPrefilled}
                placeholder="Optional"
                className={`${inputClass("referrerId")} ${
                  refPrefilled
                    ? "bg-stone-100 text-stone-500 cursor-not-allowed"
                    : ""
                }`}
                aria-describedby={
                  touched.referrerId && errors.referrerId
                    ? "err-referrer"
                    : undefined
                }
              />
              {touched.referrerId && errors.referrerId && (
                <p id="err-referrer" className="mt-1.5 text-sm text-red-500">
                  {errors.referrerId}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || (!isFormValid && Object.keys(touched).length > 0)}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-6 py-3.5 rounded-full transition-colors text-sm flex items-center justify-center gap-2 min-h-[48px] mt-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-stone-400">
            Already have an account?{" "}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Download the app
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
