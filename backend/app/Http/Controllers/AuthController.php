<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $r){
        $validator = Validator::make($r->all(),[
            'name' => 'required|string|between:4,20',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*?&#]/'
            ],
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),40);
        }

        try{

            $user = User::create(array_merge(
                $validator->validated(),
                [
                    'password' => bcrypt($r->password),
                    'rol' => 'admin',
                ]
            ));
            return response()->json(['message' => 'Usuario creado con éxito', 'user' => $user], 200);
        } catch (\Exception $e){
            return response()->json(['message' => 'Error al crear el usuario', 'error' => $e->getMessage()],500);
        }
    }

    public function login(Request $r){
        $validator = Validator::make($r->all(),[
            'email' => 'required|email',
            'password' => [
                'required',
                'min:8',
                'string',
                'regex:/[A-Z]/',
                'regex: /[a-z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*?&#]/',
            ]
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        if (!$token = JWTAuth::attempt($validator->validated())){
            return response()->json(['error' => 'Usuario no autorizado'],401);
        }

        return $this->createNewToken($token);
    }

    public function logout(){
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message'=> 'Usuario desconectado con éxito']);
    }

    public function refresh(){
        return $this->createNewToken(JWTAuth::refresh());
    }

    public function userProfile(){
        $user = auth()->user();
        if (!$user){
            return response()->json(['message' => 'Usuario no autorizado']);
        }
        return response()->json($user);
    }

    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
