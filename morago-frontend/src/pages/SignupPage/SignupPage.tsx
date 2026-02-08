import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button/Button";
import styles from "./SignupPage.module.css";
import useSignup from "../../hooks/useSignup";
import { useState } from "react";

export const SignupPage = () => {
    const { register, onSubmit, errors, isSubmitting, serverError: error } = useSignup();
    const [role, setRole] = useState<'ROLE_USER' | 'ROLE_TRANSLATOR'>("ROLE_TRANSLATOR");
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>User <br /> Registration</h1>
                <p>Register to access all the benefits of the app</p>
                {error && <p className={styles.errorText}>{error}</p>}
            </header>

            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.roleSelection} role="group">
                    <Button
                        type="button"
                        variant={role === 'ROLE_USER' ? 'orange' : 'white'}
                        text="I am a user"
                        onClick={() => setRole('ROLE_USER')}
                    />
                    <Button
                        type="button"
                        variant={role === 'ROLE_TRANSLATOR' ? 'orange' : 'white'}
                        text="I am a translator"
                        onClick={() => setRole('ROLE_TRANSLATOR')}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="phone">Phone number</label>
                    <div className={styles.inputWrapper}>
                        <span className={styles.icon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </span>
                        <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="Enter your phone number without '-'"
                            {...register("phone")}
                            className={errors.phone ? styles.error : ""}
                        />

                    </div>
                    {errors.phone && <p className={styles.errorText}>{errors.phone.message}</p>}
                </div>

                <div className={styles.inputGroup}>
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
                    {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className={styles.inputWrapper}>
                        <span className={styles.icon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </span>
                        <input
                            {...register("confirmPassword")}
                            id="confirmPassword"
                            type="password"
                            placeholder="repeat again"
                            className={errors.confirmPassword ? styles.error : ""}
                        />
                    </div>
                    {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword.message}</p>}
                </div>

                <div className={styles.actions}>
                    <Button
                        type="submit"
                        variant="orange"
                        text={isSubmitting ? "Signing up..." : "Register"}
                    />
                </div>
                <footer>
                    <p>Already have an account? <Link to="/login" style={{ color: '#ff9900', fontWeight: 'bold', textDecoration: 'none' }}>Log in</Link></p>
                    <p>By clicking the button, you consent to the <br />processing of your personal data</p>
                </footer>

                <div className={styles.bottomLine}></div>
            </form>
        </div>
    );
};