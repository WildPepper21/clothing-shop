import {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import {useDispatch} from "react-redux";

import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Authentication from "./pages/Authentication";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/userAction";

import "./styles.scss";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) createUserDocumentFromAuth(user);

            dispatch(setCurrentUser(user));
        });
        return unsubscribe;
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path="shop/*" element={<Shop/>}/>
                <Route path="auth" element={<Authentication/>}/>
                <Route path="checkout" element={<Checkout/>}/>
            </Route>
        </Routes>
    );
};

export default App;
