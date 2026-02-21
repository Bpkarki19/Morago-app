import { useState } from "react";
import { Button } from "../../components/ui/Button/Button";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export const LoginPage = () => {
    const { register, onSubmit, errors, isSubmitting, serverError: error } = useLogin();
    const navigate = useNavigate();

    const [role, setRole] = useState<'user' | 'translator'>('user');

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Log in</h1>
                <p>Log in to take advantage of all <br /> the app's features</p>
                {error && <span className={styles.errorText}>{error}</span>}
            </header>

            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.roleSelection} role="group">
                    <Button
                        type="button"
                        variant={role === 'user' ? 'orange' : 'white'}
                        text="I am a user"
                        onClick={() => setRole('user')}
                    />
                    <Button
                        type="button"
                        variant={role === 'translator' ? 'orange' : 'white'}
                        text="I am a translator"
                        onClick={() => setRole('translator')}
                    />
                </div>

                <div className={styles.inputGroup}>
                    {/* phone number */}
                    <label htmlFor="phone">Phone number</label>
                    <div className={styles.inputWrapper}>
                        <span className={styles.icon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </span>
                        <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="Enter your phone number"
                            {...register("phone")}
                            className={errors.phone ? styles.error : ""}
                        />

                    </div>
                    {errors.phone && <span className={styles.errorText}>{errors.phone.message}</span>}
                </div>

                <div className={styles.inputGroup}>
                    {/* password */}
                    <label htmlFor="password">Password</label>
                    <div className={styles.inputWrapper}>
                        <span className={styles.icon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </span>
                        <input
                            {...register("password")}
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className={errors.password ? styles.error : ""}
                        />

                    </div>
                    {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
                </div>


                {/* <input type="hidden" value={role} {...register("role")} /> */}
                {/* Login and register buttons */}
                <div className={styles.actions}>
                    <Button
                        type="submit"
                        variant="green"
                        text={isSubmitting ? "Logging in..." : "Log in"}

                    />
                    {/* register button */}
                    <Button type="button" variant="white" text="Register" onClick={() => navigate("/signup")} />
                </div>
                {/* forgot password button */}
                <button
                    type="button"
                    className={styles.forgotPassword}
                    onClick={() => navigate("/forgot-password")}>
                    Forgot password
                </button>
                <div className={styles.bottomLine}></div>
            </form>
        </div>
    );
};