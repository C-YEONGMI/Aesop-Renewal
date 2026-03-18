import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import './test8.scss';

function Test8() {
    return (
        <div className="test8-wrapper">
            <nav>
                <a href="#">Artifact</a>
            </nav>
            <Section1 />
            <Section2 />
            <Section3 />
        </div>
    );
}

export default Test8;
