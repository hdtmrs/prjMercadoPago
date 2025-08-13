<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function store(Request $request) {
        $dados = $request->validate([
            'nome' => 'required|string|max:100',
            'email' => 'required|email|max:225',
            'senha' => 'required|string|min:8',
            'cpf' => 'required|string|min:11',
        ]);

        $usuario = Usuario::create($dados);

        return response()->json($usuario, 201);
    }

}
