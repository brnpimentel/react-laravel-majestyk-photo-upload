<?php

use Illuminate\Support\Facades\Route;

//All paths go to index - manipulated by react router
Route::get('/{path?}', function () {
    return view('index');
});
