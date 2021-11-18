import type { Component } from 'solid-js';
import { Link } from 'solid-app-router';

const LandingPage: Component = () => {
    return (
        <div class="landingPage">
            <h1>Cryptionary</h1>
            <p>Sightful insights into the cryptomarket.</p>

            <div class="actions">
                <Link class="btn primary" href="/app">Launch app</Link>
                <Link class="btn secondary" href="github.com/anton7r/cryptionary">View source code</Link>
            </div>
        </div>
    )
}

export default LandingPage;