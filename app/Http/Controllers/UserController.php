<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required',
            'email'    => 'required|email',
            'password' => 'required|confirmed|min:6',
        ]);

        $user      = User::create(array_merge($data, [
            'password' => Hash::make($data['password']),
        ]));

        $api_token = $user->createToken('default');

        return [
            'api_token' => $api_token->plainTextToken,
        ];
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|min:6',
        ]);

        if (Auth::attempt($credentials)) {
            $api_token = Auth::user()->createToken('default');
            
            return [
                'api_token' => $api_token->plainTextToken,
            ];
        }

        throw ValidationException::withMessages([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
