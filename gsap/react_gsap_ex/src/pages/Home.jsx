import { Link } from 'react-router-dom';
import '../css/Home.scss';

function Home() {
    const tests = Array.from({ length: 28 }, (_, i) => i + 1);

    return (
        <div className="container" style={{ minHeight: '100vh', padding: '50px 20px' }}>
            <h2>GSAP Animation Tests</h2>
            <ul>
                {tests.map(num => (
                    <li key={num}>
                        <span>{String(num).padStart(2, '0')}</span>
                        <div className="content">
                            <Link to={`/test${num}`}>Test {num} - GSAP 예제 </Link>
                        </div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
