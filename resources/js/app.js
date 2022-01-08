import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Nav from "./Nav";

//Pages
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UploadPage from "./pages/UploadPage";



ReactDom.render(
    <BrowserRouter>
        <div className="container p-4 my-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                <h1>Majestyk Photo Upload</h1>
                <small><a href="https://github.com/brnpimentel" target="_blank">@brnpimentel</a></small>
                </div>

                <Nav/>
            </div>
            <div className="mt-6">
                <Routes>
                    <Route path="/login" element={<SignInPage />} />
                    <Route path="/register" element={<SignUpPage />} />

                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <UploadPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    </BrowserRouter>,
    document.getElementById("root")
);
