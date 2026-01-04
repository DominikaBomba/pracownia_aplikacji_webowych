
export default function Login() {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <div>
                    <label htmlFor="email">Email:</label><br />
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="/aboutus">Learn more</a>
            </p>
        </div>
    );
}
