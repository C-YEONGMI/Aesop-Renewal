import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Test1 from './pages/test1/Test1';
import Test2 from './pages/test2/Test2';
import Test3 from './pages/test3/Test3';
import Test4 from './pages/test4/Test4';
import Test5 from './pages/test5/Test5';
import Test6 from './pages/test6/Test6';
import Test7 from './pages/test7/Test7';
import Test8 from './pages/test8/Test8';
import Test9 from './pages/test9/Test9';
import Test10 from './pages/test10/Test10';
import Test11 from './pages/test11/Test11';
import Test12 from './pages/test12/Test12';
import Test13 from './pages/test13/Test13';
import Test14 from './pages/test14/Test14';
import Test15 from './pages/test15/Test15';
import Test16 from './pages/test16/Test16';
import Test17 from './pages/test17/Test17';
import Test18 from './pages/test18/Test18';
import Test19 from './pages/test19/Test19';
import Test20 from './pages/test20/Test20';
import Test21 from './pages/test21/Test21';
import Test22 from './pages/test22/Test22';
import Test23 from './pages/test23/Test23';
import Test24 from './pages/test24/Test24';
import Test25 from './pages/test25/Test25';
import Test26 from './pages/test26/Test26';
import Test27 from './pages/test27/Test27';
import Test28 from './pages/test28/Test28';

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/test1' element={<Test1 />} />
                    <Route path='/test2' element={<Test2 />} />
                    <Route path='/test3' element={<Test3 />} />
                    <Route path='/test4' element={<Test4 />} />
                    <Route path='/test5' element={<Test5 />} />
                    <Route path='/test6' element={<Test6 />} />
                    <Route path='/test7' element={<Test7 />} />
                    <Route path='/test8' element={<Test8 />} />
                    <Route path='/test9' element={<Test9 />} />
                    <Route path='/test10' element={<Test10 />} />
                    <Route path='/test11' element={<Test11 />} />
                    <Route path='/test12' element={<Test12 />} />
                    <Route path='/test13' element={<Test13 />} />
                    <Route path='/test14' element={<Test14 />} />
                    <Route path='/test15' element={<Test15 />} />
                    <Route path='/test16' element={<Test16 />} />
                    <Route path='/test17' element={<Test17 />} />
                    <Route path='/test18' element={<Test18 />} />
                    <Route path='/test19' element={<Test19 />} />
                    <Route path='/test20' element={<Test20 />} />
                    <Route path='/test21' element={<Test21 />} />
                    <Route path='/test22' element={<Test22 />} />
                    <Route path='/test23' element={<Test23 />} />
                    <Route path='/test24' element={<Test24 />} />
                    <Route path='/test25' element={<Test25 />} />
                    <Route path='/test26' element={<Test26 />} />
                    <Route path='/test27' element={<Test27 />} />
                    <Route path='/test28' element={<Test28 />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
