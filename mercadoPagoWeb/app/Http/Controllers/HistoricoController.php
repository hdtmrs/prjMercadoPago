<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Historico;
use App\Models\Usuario;

class HistoricoController
{
    public function store(Request $request) {
        $request->validate([
            'valorEntregue' => 'required|numeric',
            'tipo' => 'required|string',
            'motivo' => 'nullable|string'
        ]);

        $usuario = $request->user();

        $historico = Historico::create([
            'idUsuario' => $usuario->id,
            'valor' => $request->valorEntregue,
            'tipo' => $request->tipo,
            'motivo' => $request->motivo,
            'data' => now(),
        ]);
    }

        public function index(Request $request)
    {
        $usuario = $request->user();
        $historico = Historico::where('idUsuario', $usuario->id)
            ->orderBy('data', 'desc')
            ->get();

        return response()->json($historico);
    }
}
