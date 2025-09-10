<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class UsuarioController
{
    public function store(Request $request) {
        $dados = $request->validate([
            'nome' => 'required|string|max:100',
            'email' => 'required|email|max:225|unique:tbUsuario,email',
            'senha' => 'required|string|min:8',
            'cpf' => 'required|string|min:11',
        ]);

        $usuario = Usuario::create([
            'nome' => $dados['nome'],
            'email' => $dados['email'],
            'senha' => Hash::make($dados['senha']),
            'cpf' => $dados['cpf'],
            'dinheiro' => '0',
        ]);

        return response()->json($usuario, 201);
    }

    public function index(Request $request) {
        $usuario = $request->user();

        return response()->json($usuario);
    }

    public function put(Request $request) {
        $usuario = $request->user();

        $usuario->dinheiro = $request->valor;
        $usuario->save();

        return response()->json(['mensagem' => 'Grana atualizada', $usuario->dinheiro], 200);
    }
}
