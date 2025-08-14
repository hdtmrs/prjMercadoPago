<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\Usuario;

class AuthController
{
    public function index(Request $request) {
        
        $dados = $request->validate([
            'email' => 'required|max:100|email',
            'senha' => 'required|min:8|max:100',
        ]);

        $usuario = Usuario::where('email', $dados['email'])->first();

        if(!$usuario || !Hash::check($dados['senha'], $usuario->senha)){
            return response()->json(['mensagem' => 'Credenciais invalidas']);
        }

        $token = $usuario->createToken('tokenUsuario')->accessToken;

        return response()->json([
            'mensagem' => 'Acesso liberado',
            'token' => $token,
            'usuario' => $usuario,
        ]);
    }
}
